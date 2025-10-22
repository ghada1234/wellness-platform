
'use client';

import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User, Calculator, Target, Activity, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/hooks/use-auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { trackProfileCompleted } from '@/components/analytics';

const profileFormSchema = z.object({
  age: z.coerce.number().min(1, { message: 'Age is required.' }),
  gender: z.string().min(1, { message: 'Gender is required.' }),
  height: z.coerce.number().min(1, { message: 'Height is required.' }),
  weight: z.coerce.number().min(1, { message: 'Weight is required.' }),
  activityLevel: z
    .string()
    .min(1, { message: 'Activity level is required.' }),
  goal: z.string().min(1, { message: 'Goal is required.' }),
  cuisine: z.string().optional(),
  allergies: z.string().optional(),
  dislikes: z.string().optional(),
  diet: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileFormSchema>;

const USER_PROFILE_STORAGE_KEY = 'user-nutrition-profile';

// BMI calculation and classification
const calculateBMI = (weight: number, height: number): { bmi: number; category: string; color: string } => {
  const bmi = weight / Math.pow(height / 100, 2);
  let category = '';
  let color = '';
  
  if (bmi < 18.5) {
    category = 'Underweight';
    color = 'bg-blue-500';
  } else if (bmi < 25) {
    category = 'Normal weight';
    color = 'bg-green-500';
  } else if (bmi < 30) {
    category = 'Overweight';
    color = 'bg-yellow-500';
  } else {
    category = 'Obese';
    color = 'bg-red-500';
  }
  
  return { bmi: Math.round(bmi * 10) / 10, category, color };
};

// Calculate ideal weight range
const calculateIdealWeightRange = (height: number): { min: number; max: number } => {
  const heightInMeters = height / 100;
  const minWeight = 18.5 * Math.pow(heightInMeters, 2);
  const maxWeight = 24.9 * Math.pow(heightInMeters, 2);
  return { min: Math.round(minWeight), max: Math.round(maxWeight) };
};

// Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor Equation
const calculateBMR = (weight: number, height: number, age: number, gender: string): number => {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

// Calculate TDEE (Total Daily Energy Expenditure)
const calculateTDEE = (bmr: number, activityLevel: string): number => {
  const activityMultipliers = {
    'sedentary': 1.2,
    'lightly_active': 1.375,
    'moderately_active': 1.55,
    'very_active': 1.725
  };
  return bmr * (activityMultipliers[activityLevel as keyof typeof activityMultipliers] || 1.2);
};

// Calculate macro nutrients based on goal
const calculateMacros = (tdee: number, goal: string, weight: number) => {
  let calorieTarget = tdee;
  let proteinPerKg = 1.6; // Default protein per kg body weight
  
  switch (goal) {
    case 'weight_loss':
      calorieTarget = tdee - 500; // 500 calorie deficit
      proteinPerKg = 2.0; // Higher protein for weight loss
      break;
    case 'muscle_gain':
      calorieTarget = tdee + 300; // 300 calorie surplus
      proteinPerKg = 2.2; // Higher protein for muscle gain
      break;
    case 'maintenance':
    default:
      calorieTarget = tdee;
      proteinPerKg = 1.6;
      break;
  }
  
  const protein = Math.round(weight * proteinPerKg);
  const proteinCalories = protein * 4;
  const fatCalories = calorieTarget * 0.25; // 25% of calories from fat
  const fat = Math.round(fatCalories / 9);
  const carbCalories = calorieTarget - proteinCalories - fatCalories;
  const carbs = Math.round(carbCalories / 4);
  
  return {
    calories: Math.round(calorieTarget),
    protein,
    carbs,
    fat,
    proteinPercentage: Math.round((proteinCalories / calorieTarget) * 100),
    carbPercentage: Math.round((carbCalories / calorieTarget) * 100),
    fatPercentage: Math.round((fatCalories / calorieTarget) * 100)
  };
};

// Calculate micro nutrients based on goal and gender
const calculateMicros = (goal: string, gender: string, age: number) => {
  const baseMicros = {
    fiber: gender === 'male' ? 38 : 25, // grams
    vitaminC: 90, // mg
    vitaminD: 20, // mcg
    calcium: 1000, // mg
    iron: gender === 'male' ? 8 : 18, // mg
    magnesium: gender === 'male' ? 420 : 320, // mg
    potassium: 3500, // mg
    zinc: gender === 'male' ? 11 : 8, // mg
    vitaminB12: 2.4, // mcg
    folate: 400, // mcg
  };
  
  // Adjust based on goal
  if (goal === 'muscle_gain') {
    baseMicros.magnesium += 50;
    baseMicros.zinc += 2;
    baseMicros.vitaminD += 5;
  } else if (goal === 'weight_loss') {
    baseMicros.fiber += 5;
    baseMicros.vitaminC += 20;
  }
  
  return baseMicros;
};

export default function ProfilePage() {
  const [isSaving, setIsSaving] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const { toast } = useToast();
  const { user } = useAuth();
  
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      age: '',
      gender: '',
      height: '',
      weight: '',
      activityLevel: '',
      goals: '',
      allergies: '',
      dislikes: '',
      diet: '',
    },
  });

  // Watch form values for real-time calculations
  const watchedValues = form.watch();
  const { age, gender, height, weight, activityLevel, goal } = watchedValues;

  // Calculate BMI and nutrition data when form values change
  const bmiData = React.useMemo(() => {
    if (height && weight && height > 0 && weight > 0) {
      return calculateBMI(weight, height);
    }
    return null;
  }, [height, weight]);

  const idealWeightRange = React.useMemo(() => {
    if (height && height > 0) {
      return calculateIdealWeightRange(height);
    }
    return null;
  }, [height]);

  const nutritionData = React.useMemo(() => {
    if (age && gender && height && weight && activityLevel && goal && 
        age > 0 && height > 0 && weight > 0) {
      const bmr = calculateBMR(weight, height, age, gender);
      const tdee = calculateTDEE(bmr, activityLevel);
      const macros = calculateMacros(tdee, goal, weight);
      const micros = calculateMicros(goal, gender, age);
      
      return {
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        macros,
        micros
      };
    }
    return null;
  }, [age, gender, height, weight, activityLevel, goal]);

  React.useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        
        // First try to load from Firebase
        const profileRef = doc(db, 'userProfiles', user.uid);
        const profileSnap = await getDoc(profileRef);
        
        if (profileSnap.exists()) {
          const profileData = profileSnap.data();
          form.reset(profileData);
          
          // Also save to localStorage for offline access
          localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(profileData));
          
          console.log('Profile loaded from Firebase');
        } else {
          // Fallback to localStorage if no Firebase data
          const savedProfile = localStorage.getItem(USER_PROFILE_STORAGE_KEY);
          if (savedProfile) {
            const profileData = JSON.parse(savedProfile);
            form.reset(profileData);
            
            // Save to Firebase for future cross-device access
            await setDoc(profileRef, profileData);
            console.log('Profile migrated from localStorage to Firebase');
          }
        }
      } catch (error) {
        console.error('Failed to load user profile', error);
        
        // Final fallback to localStorage
        try {
          const savedProfile = localStorage.getItem(USER_PROFILE_STORAGE_KEY);
          if (savedProfile) {
            const profileData = JSON.parse(savedProfile);
            form.reset(profileData);
          }
        } catch (localError) {
          console.error('Failed to load from localStorage fallback', localError);
          toast({
            variant: 'destructive',
            title: 'Error Loading Personal Information',
            description: 'Could not load your saved personal information.',
          });
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [form, toast, user]);

  const onSaveProfile = async (data: ProfileFormData) => {
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'Authentication Required',
        description: 'Please sign in to save your personal information.',
      });
      return;
    }

    setIsSaving(true);
    try {
      // Always save to localStorage first for immediate access
      localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(data));
      
      // Try to save to Firebase for cross-device persistence
      try {
        const profileRef = doc(db, 'userProfiles', user.uid);
        const profileData = {
          ...data,
          userId: user.uid,
          updatedAt: new Date().toISOString(),
        };
        await setDoc(profileRef, profileData, { merge: true });
        
        console.log('Profile saved to both localStorage and Firebase');
        
        // Track profile completion
        trackProfileCompleted(!!(data.cuisine || data.diet || data.allergies || data.dislikes));
        
        toast({
          title: 'Profile Saved! 💾',
          description: 'Your information has been saved and will sync across devices.',
        });
      } catch (firebaseError: any) {
        console.warn('Firebase save failed, but localStorage save succeeded:', firebaseError);
        
        // Still show success since localStorage worked
        toast({
          title: 'Profile Saved Locally! 💾',
          description: 'Your information is saved on this device. Cloud sync will retry later.',
        });
      }
    } catch (error: any) {
      console.error('Failed to save user profile', error);
      
      let errorMessage = 'Could not save your personal information. Please try again.';
      
      if (error.code === 'permission-denied') {
        errorMessage = 'Permission denied. Please check your authentication.';
      } else if (error.code === 'unavailable') {
        errorMessage = 'Service temporarily unavailable. Your data is saved locally.';
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast({
        variant: 'destructive',
        title: 'Error Saving Profile',
        description: errorMessage,
      });
    } finally {
      setIsSaving(false);
    }
  };


  if (isLoading) {
    return (
      <div className="flex-1 space-y-6 p-4 md:p-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Personal Information</h1>
          <p className="text-muted-foreground">
            Loading your personal information...
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6">
       <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Personal Information</h1>
        <p className="text-muted-foreground">
          Manage your personal information and preferences here.
        </p>
      </div>
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSaveProfile)}>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                This data helps us personalize your experience and recommendations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="30" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="height"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Height (cm)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="175" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (kg)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="70" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="activityLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activity Level</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="sedentary">Sedentary</SelectItem>
                          <SelectItem value="lightly_active">
                            Lightly Active
                          </SelectItem>
                          <SelectItem value="moderately_active">
                            Moderately Active
                          </SelectItem>
                          <SelectItem value="very_active">
                            Very Active
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="goal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Goal</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="weight_loss">
                            Weight Loss
                          </SelectItem>
                          <SelectItem value="maintenance">
                            Maintenance
                          </SelectItem>
                          <SelectItem value="muscle_gain">
                            Muscle Gain
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div>
                <h4 className="mb-4 font-medium">
                  Preferences for AI Meal Planner (Optional)
                </h4>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                 <FormField
                  control={form.control}
                  name="cuisine"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Preferred Cuisine</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Italian, Any" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                  <FormField
                    control={form.control}
                    name="allergies"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Allergies</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Peanuts, Shellfish"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dislikes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dislikes</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Mushrooms, Olives"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="diet"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dietary Preference</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Vegan, Keto, Gluten-Free"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isSaving}>
                {isSaving && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isSaving ? 'Saving...' : 'Save Personal Information'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {/* BMI Calculator Card */}
      {bmiData && idealWeightRange && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              BMI Calculator & Weight Range
            </CardTitle>
            <CardDescription>
              Your body mass index and healthy weight range based on your height.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">{bmiData.bmi}</div>
                <div className="text-sm text-muted-foreground">BMI</div>
              </div>
              <div className="text-center">
                <Badge variant="outline" className={`${bmiData.color} text-white`}>
                  {bmiData.category}
                </Badge>
                <div className="text-sm text-muted-foreground mt-1">Category</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold">
                  {idealWeightRange.min} - {idealWeightRange.max} kg
                </div>
                <div className="text-sm text-muted-foreground">Healthy Weight Range</div>
              </div>
            </div>
            
            {weight && idealWeightRange && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Weight: {weight} kg</span>
                  <span>Target Range: {idealWeightRange.min} - {idealWeightRange.max} kg</span>
                </div>
                <Progress 
                  value={Math.min(100, ((weight - idealWeightRange.min) / (idealWeightRange.max - idealWeightRange.min)) * 100)} 
                  className="h-2"
                />
                <div className="text-xs text-muted-foreground text-center">
                  {weight < idealWeightRange.min ? 'Below healthy range' : 
                   weight > idealWeightRange.max ? 'Above healthy range' : 
                   'Within healthy range'}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Nutrition Goals Card */}
      {nutritionData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Daily Nutrition Goals
            </CardTitle>
            <CardDescription>
              Personalized macro and micro nutrient targets based on your profile and goals.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Energy Expenditure */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{nutritionData.bmr}</div>
                <div className="text-sm text-muted-foreground">BMR (calories/day)</div>
                <div className="text-xs text-muted-foreground">Basal Metabolic Rate</div>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">{nutritionData.tdee}</div>
                <div className="text-sm text-muted-foreground">TDEE (calories/day)</div>
                <div className="text-xs text-muted-foreground">Total Daily Energy Expenditure</div>
              </div>
            </div>

            <Separator />

            {/* Macro Nutrients */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Macro Nutrients
              </h4>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-primary">{nutritionData.macros.calories}</div>
                  <div className="text-sm text-muted-foreground">Calories</div>
                  <div className="text-xs text-muted-foreground">Daily Target</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{nutritionData.macros.protein}g</div>
                  <div className="text-sm text-muted-foreground">Protein</div>
                  <div className="text-xs text-muted-foreground">{nutritionData.macros.proteinPercentage}% of calories</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{nutritionData.macros.carbs}g</div>
                  <div className="text-sm text-muted-foreground">Carbs</div>
                  <div className="text-xs text-muted-foreground">{nutritionData.macros.carbPercentage}% of calories</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{nutritionData.macros.fat}g</div>
                  <div className="text-sm text-muted-foreground">Fat</div>
                  <div className="text-xs text-muted-foreground">{nutritionData.macros.fatPercentage}% of calories</div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Micro Nutrients */}
            <div>
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Micro Nutrients (Daily Targets)
              </h4>
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-semibold">{nutritionData.micros.fiber}g</div>
                  <div className="text-xs text-muted-foreground">Fiber</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-semibold">{nutritionData.micros.vitaminC}mg</div>
                  <div className="text-xs text-muted-foreground">Vitamin C</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-semibold">{nutritionData.micros.vitaminD}μg</div>
                  <div className="text-xs text-muted-foreground">Vitamin D</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-semibold">{nutritionData.micros.calcium}mg</div>
                  <div className="text-xs text-muted-foreground">Calcium</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-semibold">{nutritionData.micros.iron}mg</div>
                  <div className="text-xs text-muted-foreground">Iron</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-semibold">{nutritionData.micros.magnesium}mg</div>
                  <div className="text-xs text-muted-foreground">Magnesium</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-semibold">{nutritionData.micros.potassium}mg</div>
                  <div className="text-xs text-muted-foreground">Potassium</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-semibold">{nutritionData.micros.zinc}mg</div>
                  <div className="text-xs text-muted-foreground">Zinc</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-semibold">{nutritionData.micros.vitaminB12}μg</div>
                  <div className="text-xs text-muted-foreground">Vitamin B12</div>
                </div>
                <div className="text-center p-3 border rounded-lg">
                  <div className="text-lg font-semibold">{nutritionData.micros.folate}μg</div>
                  <div className="text-xs text-muted-foreground">Folate</div>
                </div>
              </div>
            </div>

            {/* Goal-specific recommendations */}
            <div className="p-4 bg-muted rounded-lg">
              <h5 className="font-semibold mb-2">Goal-Specific Recommendations</h5>
              <div className="text-sm text-muted-foreground">
                {goal === 'weight_loss' && (
                  <p>• Focus on high-protein foods to maintain muscle mass during weight loss<br/>
                  • Include plenty of fiber-rich foods for satiety<br/>
                  • Consider intermittent fasting or time-restricted eating</p>
                )}
                {goal === 'muscle_gain' && (
                  <p>• Prioritize protein intake around workouts<br/>
                  • Include complex carbohydrates for energy<br/>
                  • Ensure adequate hydration and recovery</p>
                )}
                {goal === 'maintenance' && (
                  <p>• Maintain balanced macronutrient ratios<br/>
                  • Focus on nutrient-dense whole foods<br/>
                  • Regular physical activity to maintain current weight</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
