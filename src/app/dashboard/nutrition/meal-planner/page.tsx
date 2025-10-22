'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Loader2, ChefHat, Calendar, ShoppingCart, Download, Share2,
  Globe, Utensils, AlertCircle, CheckCircle, Clock, Users,
  Flame, Target, Heart, Brain, Sparkles
} from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface UserProfile {
  age: number;
  gender: string;
  height: number;
  weight: number;
  activityLevel: string;
  goal: string;
  cuisine?: string;
  allergies?: string;
  dislikes?: string;
  diet?: string;
}

interface AIMealPlan {
  planId: string;
  planName: string;
  planType: string;
  startDate: string;
  endDate: string;
  days: Array<{
    date: string;
    dayNumber: number;
    meals: Array<{
      name: string;
      description: string;
      category: string;
      cuisine: string;
      calories: number;
      protein: number;
      carbohydrates: number;
      fat: number;
      fiber: number;
      sugar: number;
      sodium: number;
      ingredients: Array<{
        name: string;
        amount: string;
        unit: string;
      }>;
      instructions: string[];
      prepTime: number;
      cookTime: number;
      totalTime: number;
      servings: number;
      difficulty: string;
      tags: string[];
    }>;
    dailyTotals: {
      calories: number;
      protein: number;
      carbohydrates: number;
      fat: number;
      fiber: number;
      sugar: number;
      sodium: number;
    };
  }>;
  planSummary: {
    totalDays: number;
    averageDailyCalories: number;
    averageDailyProtein: number;
    averageDailyCarbs: number;
    averageDailyFat: number;
    goalAlignment: string;
    keyFeatures: string[];
  };
  recommendations: string[];
  shoppingList: Array<{
    category: string;
    items: Array<{
      name: string;
      totalAmount: string;
      unit: string;
    }>;
  }>;
}

// Calculate BMR
const calculateBMR = (weight: number, height: number, age: number, gender: string): number => {
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

// Calculate TDEE
const calculateTDEE = (bmr: number, activityLevel: string): number => {
  const activityMultipliers: Record<string, number> = {
    'sedentary': 1.2,
    'lightly_active': 1.375,
    'moderately_active': 1.55,
    'very_active': 1.725
  };
  return bmr * (activityMultipliers[activityLevel] || 1.2);
};

// Calculate macros
const calculateMacros = (tdee: number, goal: string, weight: number) => {
  let calorieTarget = tdee;
  let proteinPerKg = 1.6;
  
  switch (goal) {
    case 'weight_loss':
      calorieTarget = tdee - 500;
      proteinPerKg = 2.0;
      break;
    case 'muscle_gain':
      calorieTarget = tdee + 300;
      proteinPerKg = 2.2;
      break;
    case 'maintenance':
    default:
      calorieTarget = tdee;
      proteinPerKg = 1.6;
      break;
  }
  
  const protein = Math.round(weight * proteinPerKg);
  const proteinCalories = protein * 4;
  const fatCalories = calorieTarget * 0.25;
  const fat = Math.round(fatCalories / 9);
  const carbCalories = calorieTarget - proteinCalories - fatCalories;
  const carbs = Math.round(carbCalories / 4);
  
  return {
    calories: Math.round(calorieTarget),
    protein,
    carbs,
    fat,
  };
};

export default function MealPlannerPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [mealPlan, setMealPlan] = useState<AIMealPlan | null>(null);
  
  // Form state
  const [planName, setPlanName] = useState('My Personalized Meal Plan');
  const [duration, setDuration] = useState('7');
  const [selectedDay, setSelectedDay] = useState(0);

  // Load user profile
  useEffect(() => {
    const loadProfile = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        
        // Try Firebase first
        const profileRef = doc(db, 'userProfiles', user.uid);
        const profileSnap = await getDoc(profileRef);
        
        if (profileSnap.exists()) {
          setUserProfile(profileSnap.data() as UserProfile);
        } else {
          // Fallback to localStorage
          const savedProfile = localStorage.getItem('user-nutrition-profile');
          if (savedProfile) {
            setUserProfile(JSON.parse(savedProfile));
          }
        }
      } catch (error) {
        console.error('Failed to load profile:', error);
        toast({
          variant: 'destructive',
          title: 'Error Loading Profile',
          description: 'Could not load your profile. Please update your profile first.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [user, toast]);

  // Calculate nutrition targets
  const nutritionTargets = React.useMemo(() => {
    if (!userProfile) return null;
    
    const bmr = calculateBMR(
      userProfile.weight,
      userProfile.height,
      userProfile.age,
      userProfile.gender
    );
    const tdee = calculateTDEE(bmr, userProfile.activityLevel);
    const macros = calculateMacros(tdee, userProfile.goal, userProfile.weight);
    
    return {
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      ...macros
    };
  }, [userProfile]);

  const handleGenerateMealPlan = async () => {
    if (!userProfile) {
      toast({
        variant: 'destructive',
        title: 'Profile Required',
        description: 'Please complete your profile first to generate a meal plan.',
      });
      return;
    }

    if (!nutritionTargets) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not calculate nutrition targets.',
      });
      return;
    }

    setIsGenerating(true);
    try {
      const requestData = {
        // Physical metrics
        weight: userProfile.weight,
        height: userProfile.height,
        age: userProfile.age,
        gender: userProfile.gender,
        activityLevel: userProfile.activityLevel,
        goal: userProfile.goal,
        
        // Calculated nutrition targets
        targetCalories: nutritionTargets.calories,
        targetProtein: nutritionTargets.protein,
        targetCarbs: nutritionTargets.carbs,
        targetFat: nutritionTargets.fat,
        bmr: nutritionTargets.bmr,
        tdee: nutritionTargets.tdee,
        
        // Preferences and restrictions
        cuisinePreferences: userProfile.cuisine?.split(',').map(c => c.trim()) || [],
        dietaryRestrictions: userProfile.diet?.split(',').map(d => d.trim()) || [],
        allergies: userProfile.allergies?.split(',').map(a => a.trim()) || [],
        dislikes: userProfile.dislikes?.split(',').map(d => d.trim()) || [],
        
        // Plan details
        planName: planName,
        planType: parseInt(duration) === 1 ? 'daily' : parseInt(duration) <= 7 ? 'weekly' : 'monthly',
        numberOfDays: parseInt(duration),
        
        // Additional preferences
        cookingTime: 'moderate',
        spiceLevel: 'medium',
        mealComplexity: 'balanced',
        includeSnacks: true,
      };

      console.log('🤖 Sending request to Gemini AI:', requestData);

      const response = await fetch('/api/ai/generate-meal-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Gemini AI Meal Plan Generated:', result);
        setMealPlan(result);
        
        toast({
          title: '🎉 Meal Plan Generated!',
          description: `Your personalized ${duration}-day meal plan is ready!`,
        });
      } else {
        const errorData = await response.json();
        console.error('❌ Generation error:', errorData);
        throw new Error(errorData.error || 'Failed to generate meal plan');
      }
    } catch (error) {
      console.error('Meal plan generation error:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: error instanceof Error ? error.message : 'Could not generate meal plan. Please try again.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleExportPDF = () => {
    if (!mealPlan) return;
    
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      const content = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${mealPlan.planName}</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; line-height: 1.6; }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #333; padding-bottom: 20px; }
            .day { margin-bottom: 30px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; page-break-inside: avoid; }
            .meal { margin-bottom: 20px; padding: 15px; border: 1px solid #eee; border-radius: 5px; background: #f9f9f9; }
            .shopping-list { background: #f0f0f0; padding: 15px; border-radius: 5px; margin-top: 20px; }
            h1 { color: #333; }
            h2 { color: #555; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
            h3 { color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>${mealPlan.planName}</h1>
            <p><strong>Duration:</strong> ${mealPlan.days.length} days | <strong>Type:</strong> ${mealPlan.planType}</p>
            <p><strong>Target:</strong> ${mealPlan.planSummary.averageDailyCalories} cal/day | ${mealPlan.planSummary.averageDailyProtein}g protein</p>
          </div>
          
          ${mealPlan.days.map((day, dayIndex) => `
            <div class="day">
              <h2>Day ${day.dayNumber}</h2>
              <p><strong>Daily Totals:</strong> ${day.dailyTotals.calories} cal | ${day.dailyTotals.protein}g protein | ${day.dailyTotals.carbohydrates}g carbs | ${day.dailyTotals.fat}g fat</p>
              
              ${day.meals.map(meal => `
                <div class="meal">
                  <h3>${meal.name} (${meal.category})</h3>
                  <p><em>${meal.description}</em></p>
                  <p><strong>Cuisine:</strong> ${meal.cuisine} | <strong>Difficulty:</strong> ${meal.difficulty}</p>
                  <p><strong>Nutrition:</strong> ${meal.calories} cal | ${meal.protein}g protein | ${meal.carbohydrates}g carbs | ${meal.fat}g fat</p>
                  <p><strong>Time:</strong> Prep ${meal.prepTime}min | Cook ${meal.cookTime}min | Total ${meal.totalTime}min</p>
                  
                  <h4>Ingredients:</h4>
                  <ul>
                    ${meal.ingredients.map(ing => `<li>${ing.amount} ${ing.unit} ${ing.name}</li>`).join('')}
                  </ul>
                  
                  <h4>Instructions:</h4>
                  <ol>
                    ${meal.instructions.map(step => `<li>${step}</li>`).join('')}
                  </ol>
                </div>
              `).join('')}
            </div>
          `).join('')}
          
          <div class="shopping-list">
            <h2>🛒 Shopping List</h2>
            ${mealPlan.shoppingList?.map(category => `
              <h3>${category.category}</h3>
              <ul>
                ${category.items.map(item => `<li>${item.totalAmount} ${item.unit} ${item.name}</li>`).join('')}
              </ul>
            `).join('') || '<p>No shopping list available</p>'}
          </div>
        </body>
        </html>
      `;
      printWindow.document.write(content);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleShareWhatsApp = () => {
    if (!mealPlan) return;
    
    const summary = `🍽️ *${mealPlan.planName}*\n\n` +
      `📊 *Plan Summary:*\n` +
      `• Duration: ${mealPlan.days.length} days\n` +
      `• Avg Calories: ${mealPlan.planSummary.averageDailyCalories}/day\n` +
      `• Avg Protein: ${mealPlan.planSummary.averageDailyProtein}g/day\n` +
      `• Goal: ${mealPlan.planSummary.goalAlignment}\n\n` +
      `✨ *Key Features:*\n${mealPlan.planSummary.keyFeatures.map(f => `• ${f}`).join('\n')}\n\n` +
      `🤖 Generated by AI based on your personal metrics and preferences!`;
    
    const url = `https://wa.me/?text=${encodeURIComponent(summary)}`;
    window.open(url, '_blank');
  };

  if (isLoading) {
    return (
      <div className="flex-1 space-y-6 p-4 md:p-6">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (!userProfile) {
    return (
      <div className="flex-1 space-y-6 p-4 md:p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-600" />
              Profile Required
            </CardTitle>
            <CardDescription>
              Please complete your profile to generate a personalized meal plan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <a href="/dashboard/profile">Go to Profile</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <ChefHat className="h-8 w-8 text-primary" />
          AI Meal Planner
        </h1>
        <p className="text-muted-foreground">
          Generate personalized meal plans based on your profile, preferences, and nutrition goals
        </p>
      </div>

      {/* Profile Summary */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Target className="h-5 w-5" />
            Your Profile & Nutrition Targets
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-4 bg-white rounded-lg border">
              <div className="text-sm text-muted-foreground">Physical</div>
              <div className="text-lg font-semibold">
                {userProfile.age}yo, {userProfile.gender}, {userProfile.height}cm, {userProfile.weight}kg
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg border">
              <div className="text-sm text-muted-foreground">Activity & Goal</div>
              <div className="text-lg font-semibold capitalize">
                {userProfile.activityLevel.replace('_', ' ')}, {userProfile.goal.replace('_', ' ')}
              </div>
            </div>
            {nutritionTargets && (
              <>
                <div className="p-4 bg-white rounded-lg border">
                  <div className="text-sm text-muted-foreground">BMR / TDEE</div>
                  <div className="text-lg font-semibold">
                    {nutritionTargets.bmr} / {nutritionTargets.tdee} cal
                  </div>
                </div>
                <div className="p-4 bg-white rounded-lg border">
                  <div className="text-sm text-muted-foreground">Daily Target</div>
                  <div className="text-lg font-semibold">
                    {nutritionTargets.calories} cal
                  </div>
                </div>
              </>
            )}
          </div>

          {nutritionTargets && (
            <div className="grid gap-3 md:grid-cols-3">
              <div className="p-3 bg-white rounded-lg border">
                <div className="text-sm text-muted-foreground">Protein</div>
                <div className="text-xl font-bold text-orange-600">{nutritionTargets.protein}g</div>
              </div>
              <div className="p-3 bg-white rounded-lg border">
                <div className="text-sm text-muted-foreground">Carbs</div>
                <div className="text-xl font-bold text-yellow-600">{nutritionTargets.carbs}g</div>
              </div>
              <div className="p-3 bg-white rounded-lg border">
                <div className="text-sm text-muted-foreground">Fat</div>
                <div className="text-xl font-bold text-red-600">{nutritionTargets.fat}g</div>
              </div>
            </div>
          )}

          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {userProfile.cuisine && (
              <div className="p-3 bg-white rounded-lg border">
                <div className="text-xs text-muted-foreground mb-1">Cuisine Preferences</div>
                <div className="text-sm font-medium">{userProfile.cuisine}</div>
              </div>
            )}
            {userProfile.diet && (
              <div className="p-3 bg-white rounded-lg border">
                <div className="text-xs text-muted-foreground mb-1">Dietary Type</div>
                <div className="text-sm font-medium">{userProfile.diet}</div>
              </div>
            )}
            {userProfile.allergies && (
              <div className="p-3 bg-white rounded-lg border">
                <div className="text-xs text-muted-foreground mb-1">Allergies</div>
                <div className="text-sm font-medium text-red-600">{userProfile.allergies}</div>
              </div>
            )}
            {userProfile.dislikes && (
              <div className="p-3 bg-white rounded-lg border">
                <div className="text-xs text-muted-foreground mb-1">Dislikes</div>
                <div className="text-sm font-medium">{userProfile.dislikes}</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Generation Form */}
      {!mealPlan && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Generate Your Personalized Meal Plan
            </CardTitle>
            <CardDescription>
              AI will create meals tailored to your profile, preferences, and nutrition targets
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="plan-name">Plan Name</Label>
                <Input
                  id="plan-name"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  placeholder="My Meal Plan"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Day</SelectItem>
                    <SelectItem value="3">3 Days</SelectItem>
                    <SelectItem value="7">7 Days (1 Week)</SelectItem>
                    <SelectItem value="14">14 Days (2 Weeks)</SelectItem>
                    <SelectItem value="30">30 Days (1 Month)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleGenerateMealPlan} disabled={isGenerating} className="w-full" size="lg">
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  🤖 Gemini AI Generating Your Personalized Meal Plan...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate AI Meal Plan
                </>
              )}
            </Button>

            {isGenerating && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                  <div className="font-medium text-blue-900">AI is creating your meal plan...</div>
                </div>
                <div className="space-y-2 text-sm text-blue-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Analyzing your profile and nutrition targets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Considering your cuisine preferences and restrictions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    <span>Generating recipes with precise nutritional balance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Creating your {duration}-day meal plan...</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Generated Meal Plan */}
      {mealPlan && (
        <div className="space-y-6">
          {/* Action Buttons */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    {mealPlan.planName}
                  </CardTitle>
                  <CardDescription>
                    {mealPlan.days.length}-day personalized meal plan • {mealPlan.planSummary.averageDailyCalories} cal/day average
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleExportPDF} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                  <Button onClick={handleShareWhatsApp} variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button onClick={() => setMealPlan(null)} variant="outline" size="sm">
                    New Plan
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-sm text-blue-700">Avg Calories</div>
                  <div className="text-2xl font-bold text-blue-900">{mealPlan.planSummary.averageDailyCalories}</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                  <div className="text-sm text-orange-700">Avg Protein</div>
                  <div className="text-2xl font-bold text-orange-900">{mealPlan.planSummary.averageDailyProtein}g</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg">
                  <div className="text-sm text-yellow-700">Avg Carbs</div>
                  <div className="text-2xl font-bold text-yellow-900">{mealPlan.planSummary.averageDailyCarbs}g</div>
                </div>
                <div className="p-3 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
                  <div className="text-sm text-red-700">Avg Fat</div>
                  <div className="text-2xl font-bold text-red-900">{mealPlan.planSummary.averageDailyFat}g</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Day Selector */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Select Day
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                {mealPlan.days.map((day, index) => (
                  <Button
                    key={index}
                    variant={selectedDay === index ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedDay(index)}
                  >
                    Day {day.dayNumber}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Selected Day Details */}
          {mealPlan.days[selectedDay] && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Utensils className="h-5 w-5" />
                  Day {mealPlan.days[selectedDay].dayNumber} Meals
                </CardTitle>
                <CardDescription>
                  Daily Totals: {mealPlan.days[selectedDay].dailyTotals.calories} cal • 
                  {mealPlan.days[selectedDay].dailyTotals.protein}g protein • 
                  {mealPlan.days[selectedDay].dailyTotals.carbohydrates}g carbs • 
                  {mealPlan.days[selectedDay].dailyTotals.fat}g fat
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {mealPlan.days[selectedDay].meals.map((meal, mealIndex) => (
                  <div key={mealIndex} className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold">{meal.name}</h3>
                        <p className="text-sm text-muted-foreground">{meal.description}</p>
                        <div className="flex gap-2 flex-wrap mt-2">
                          <Badge variant="secondary">{meal.category}</Badge>
                          <Badge variant="outline">{meal.cuisine}</Badge>
                          <Badge variant="outline">{meal.difficulty}</Badge>
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            {meal.totalTime}min
                          </Badge>
                          <Badge variant="outline">
                            <Users className="h-3 w-3 mr-1" />
                            {meal.servings} servings
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Nutrition */}
                    <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
                      <div className="p-2 bg-blue-50 rounded text-center">
                        <div className="text-xs text-muted-foreground">Calories</div>
                        <div className="font-semibold text-sm">{meal.calories}</div>
                      </div>
                      <div className="p-2 bg-orange-50 rounded text-center">
                        <div className="text-xs text-muted-foreground">Protein</div>
                        <div className="font-semibold text-sm">{meal.protein}g</div>
                      </div>
                      <div className="p-2 bg-yellow-50 rounded text-center">
                        <div className="text-xs text-muted-foreground">Carbs</div>
                        <div className="font-semibold text-sm">{meal.carbohydrates}g</div>
                      </div>
                      <div className="p-2 bg-red-50 rounded text-center">
                        <div className="text-xs text-muted-foreground">Fat</div>
                        <div className="font-semibold text-sm">{meal.fat}g</div>
                      </div>
                      <div className="p-2 bg-green-50 rounded text-center">
                        <div className="text-xs text-muted-foreground">Fiber</div>
                        <div className="font-semibold text-sm">{meal.fiber}g</div>
                      </div>
                      <div className="p-2 bg-purple-50 rounded text-center">
                        <div className="text-xs text-muted-foreground">Sugar</div>
                        <div className="font-semibold text-sm">{meal.sugar}g</div>
                      </div>
                      <div className="p-2 bg-pink-50 rounded text-center">
                        <div className="text-xs text-muted-foreground">Sodium</div>
                        <div className="font-semibold text-sm">{meal.sodium}mg</div>
                      </div>
                    </div>

                    <Separator />

                    {/* Ingredients */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        Ingredients
                      </h4>
                      <ul className="grid md:grid-cols-2 gap-2">
                        {meal.ingredients.map((ing, ingIndex) => (
                          <li key={ingIndex} className="text-sm flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span><strong>{ing.amount} {ing.unit}</strong> {ing.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    {/* Instructions */}
                    <div>
                      <h4 className="font-semibold mb-2 flex items-center gap-2">
                        <ChefHat className="h-4 w-4" />
                        Instructions
                      </h4>
                      <ol className="space-y-2">
                        {meal.instructions.map((step, stepIndex) => (
                          <li key={stepIndex} className="text-sm flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-semibold">
                              {stepIndex + 1}
                            </span>
                            <span className="pt-0.5">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Tags */}
                    {meal.tags && meal.tags.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {meal.tags.map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Shopping List */}
          {mealPlan.shoppingList && mealPlan.shoppingList.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Shopping List
                </CardTitle>
                <CardDescription>
                  All ingredients needed for your {mealPlan.days.length}-day meal plan
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mealPlan.shoppingList.map((category, catIndex) => (
                    <div key={catIndex} className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-3">{category.category}</h4>
                      <ul className="space-y-2">
                        {category.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-sm flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                            <span><strong>{item.totalAmount} {item.unit}</strong> {item.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recommendations */}
          {mealPlan.recommendations && mealPlan.recommendations.length > 0 && (
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-800">
                  <Brain className="h-5 w-5" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {mealPlan.recommendations.map((rec, recIndex) => (
                    <li key={recIndex} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}

