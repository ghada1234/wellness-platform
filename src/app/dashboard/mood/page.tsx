'use client';

import {
  BarChart,
  Calendar,
  Smile,
  Zap,
  Star,
  PlusCircle,
  TrendingUp,
  History,
  Edit,
  Trash2,
  Loader2
} from 'lucide-react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/hooks/use-firestore';
import type { Timestamp } from 'firebase/firestore';


const moods = [
  { value: 'Excellent', emoji: '😄' },
  { value: 'Good', emoji: '😊' },
  { value: 'Okay', emoji: '😐' },
  { value: 'Low', emoji: '😔' },
  { value: 'Poor', emoji: '😢' },
];

const energyLevels = [
  { value: 'High', emoji: '⚡' },
  { value: 'Good', emoji: '💪' },
  { value: 'Moderate', emoji: '😌' },
  { value: 'Low', emoji: '😴' },
  { value: 'Exhausted', emoji: '💤' },
];

const influences = [
  { value: 'Work Stress', emoji: '💼' },
  { value: 'Family Time', emoji: '👨‍👩‍👧‍👦' },
  { value: 'Good Sleep', emoji: '😴' },
  { value: 'Social', emoji: '👥' },
  { value: 'Relaxed', emoji: '🧘' },
  { value: 'Anxious', emoji: '😰' },
  { value: 'Grateful', emoji: '🙏' },
  { value: 'Productive', emoji: '✅' },
  { value: 'Creative', emoji: '🎨' },
  { value: 'Tired', emoji: '😪' },
  { value: 'Excited', emoji: '🎉' },
];

interface MoodEntry {
  id: string;
  mood: string;
  energy: string;
  influences: string[];
  notes: string;
  date: string;
  createdAt: Timestamp | Date;
}

const defaultMoodState: Partial<MoodEntry> = {
    mood: 'Good',
    energy: 'Moderate',
    influences: [],
    notes: '',
};

export default function MoodTrackerPage() {
    const { data: log, loading, addDocument, updateDocument, deleteDocument, hasMore, loadMore, loadingMore } = useFirestore<MoodEntry>('moodEntries', { limit: 10 });
    const [isSaving, setIsSaving] = React.useState(false);
    const [currentMood, setCurrentMood] = React.useState<Partial<MoodEntry>>(defaultMoodState);
    const { toast } = useToast();
    
    const handleSaveEntry = async () => {
        if (!currentMood.mood || !currentMood.energy) {
            toast({
                variant: 'destructive',
                title: 'Missing fields',
                description: 'Please select your mood and energy level.',
            });
            return;
        }
        
        setIsSaving(true);
        try {
            if (currentMood.id) {
                await updateDocument(currentMood.id, {
                    mood: currentMood.mood,
                    energy: currentMood.energy,
                    influences: currentMood.influences || [],
                    notes: currentMood.notes || '',
                });
                toast({ title: 'Mood Entry Updated!' });
            } else {
                 await addDocument({
                    ...currentMood,
                    date: new Date().toLocaleDateString(),
                } as Omit<MoodEntry, 'id' | 'createdAt'>);

                toast({ title: 'Mood Entry Saved!' });
            }
            setCurrentMood(defaultMoodState);
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Failed to save entry',
                description: 'Could not save your mood entry. Please try again.',
            });
        } finally {
            setIsSaving(false);
        }
    };
    
    const handleInfluenceChange = (factor: string, checked: boolean) => {
        const currentFactors = currentMood.influences || [];
        if (checked) {
            setCurrentMood({ ...currentMood, influences: [...currentFactors, factor] });
        } else {
            setCurrentMood({ ...currentMood, influences: currentFactors.filter(f => f !== factor) });
        }
    };
    
    const handleEdit = (entry: MoodEntry) => {
        setCurrentMood(entry);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteDocument(id);
            toast({ title: 'Mood entry deleted.' });
        } catch (error) {
            toast({ variant: 'destructive', title: 'Failed to delete entry' });
        }
    };
    
    const formatDateTime = (date: Date | Timestamp) => {
        const d = date instanceof Date ? date : date.toDate();
        return d.toLocaleString();
    }

    // Get data for the current week
    const getWeekData = () => {
        const now = new Date();
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - now.getDay()); // Start of current week (Sunday)
        startOfWeek.setHours(0, 0, 0, 0);
        
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6); // End of current week (Saturday)
        endOfWeek.setHours(23, 59, 59, 999);

        return log.filter(entry => {
            const entryDate = entry.createdAt instanceof Date ? entry.createdAt : entry.createdAt.toDate();
            return entryDate >= startOfWeek && entryDate <= endOfWeek;
        });
    };

    const weekData = getWeekData();

    // Process mood data for chart
    const getMoodChartData = () => {
        const moodCounts = { 'Excellent': 0, 'Good': 0, 'Okay': 0, 'Low': 0, 'Poor': 0 };
        weekData.forEach(entry => {
            if (moodCounts.hasOwnProperty(entry.mood)) {
                moodCounts[entry.mood as keyof typeof moodCounts]++;
            }
        });
        
        return Object.entries(moodCounts).map(([mood, count]) => ({
            mood,
            count,
            emoji: moods.find(m => m.value === mood)?.emoji || '😐'
        }));
    };

    // Process energy data for chart
    const getEnergyChartData = () => {
        const energyCounts = { 'High': 0, 'Good': 0, 'Moderate': 0, 'Low': 0, 'Exhausted': 0 };
        weekData.forEach(entry => {
            if (energyCounts.hasOwnProperty(entry.energy)) {
                energyCounts[entry.energy as keyof typeof energyCounts]++;
            }
        });
        
        return Object.entries(energyCounts).map(([energy, count]) => ({
            energy,
            count,
            emoji: energyLevels.find(e => e.value === energy)?.emoji || '😌'
        }));
    };

    // Calculate mood insights
    const getMoodInsights = () => {
        if (weekData.length === 0) return { avgMood: '😊', topFactor: 'N/A', streak: 0 };
        
        // Calculate average mood
        const moodValues = { 'Excellent': 5, 'Good': 4, 'Okay': 3, 'Low': 2, 'Poor': 1 };
        const avgScore = weekData.reduce((sum, entry) => sum + (moodValues[entry.mood as keyof typeof moodValues] || 3), 0) / weekData.length;
        const avgMood = Object.entries(moodValues).find(([_, score]) => Math.abs(score - avgScore) < 0.5)?.[0] || 'Good';
        const avgMoodEmoji = moods.find(m => m.value === avgMood)?.emoji || '😊';
        
        // Calculate top influence factor
        const factorCounts: { [key: string]: number } = {};
        weekData.forEach(entry => {
            entry.influences.forEach(factor => {
                factorCounts[factor] = (factorCounts[factor] || 0) + 1;
            });
        });
        const topFactor = Object.entries(factorCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';
        
        // Calculate current streak (consecutive days with entries)
        const sortedEntries = [...log].sort((a, b) => {
            const dateA = a.createdAt instanceof Date ? a.createdAt : a.createdAt.toDate();
            const dateB = b.createdAt instanceof Date ? b.createdAt : b.createdAt.toDate();
            return dateB.getTime() - dateA.getTime();
        });
        
        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        for (let i = 0; i < sortedEntries.length; i++) {
            const entryDate = sortedEntries[i].createdAt instanceof Date ? sortedEntries[i].createdAt : sortedEntries[i].createdAt.toDate();
            const entryDay = new Date(entryDate);
            entryDay.setHours(0, 0, 0, 0);
            
            const expectedDate = new Date(today);
            expectedDate.setDate(today.getDate() - i);
            
            if (entryDay.getTime() === expectedDate.getTime()) {
                streak++;
            } else {
                break;
            }
        }
        
        return { avgMood: avgMoodEmoji, topFactor, streak };
    };

    const insights = getMoodInsights();


  return (
    <div className="flex-1 space-y-6 p-4 md:p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Mood Tracker</h1>
        <p className="text-muted-foreground">
          Check in with your emotions to understand your mental landscape.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle>{currentMood.id ? 'Edit Mood Entry' : 'How are you feeling?'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                    <div className="space-y-4">
                        <Label className="text-base">Right now, my mood is...</Label>
                        <RadioGroup
                          value={currentMood.mood}
                          onValueChange={(value) => setCurrentMood({...currentMood, mood: value})}
                          className="flex flex-wrap gap-4"
                        >
                          {moods.map((mood) => (
                            <div key={mood.value} className="flex items-center space-x-2">
                              <RadioGroupItem
                                value={mood.value}
                                id={`mood-${mood.value.toLowerCase()}`}
                              />
                              <Label htmlFor={`mood-${mood.value.toLowerCase()}`} className="text-lg cursor-pointer">
                                {mood.emoji} {mood.value}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                    </div>

                    <div className="space-y-4">
                        <Label className="text-base">My energy level is...</Label>
                         <RadioGroup
                            value={currentMood.energy}
                            onValueChange={(value) => setCurrentMood({...currentMood, energy: value})}
                            className="flex flex-wrap gap-x-6 gap-y-2"
                        >
                          {energyLevels.map((level) => (
                            <div key={level.value} className="flex items-center space-x-2">
                              <RadioGroupItem
                                value={level.value}
                                id={`energy-${level.value.toLowerCase()}`}
                              />
                              <Label htmlFor={`energy-${level.value.toLowerCase()}`} className="font-normal cursor-pointer">
                                {level.emoji} {level.value}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                    </div>
                    <div className="space-y-4">
                        <Label className="text-base">What might be influencing your mood?</Label>
                         <div className="flex flex-wrap gap-4">
                          {influences.map((factor) => (
                            <div
                              key={factor.value}
                              className="flex items-center space-x-2"
                            >
                              <Checkbox 
                                id={factor.value} 
                                checked={currentMood.influences?.includes(factor.value)} 
                                onCheckedChange={(checked) => handleInfluenceChange(factor.value, !!checked)} 
                              />
                              <Label htmlFor={factor.value} className="font-normal cursor-pointer">
                                {factor.emoji} {factor.value}
                              </Label>
                            </div>
                          ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <Label htmlFor="notes" className="text-base">Anything on your mind?</Label>
                        <Textarea
                          id="notes"
                          placeholder="Reflect on your feelings, triggers, and thoughts..."
                          value={currentMood.notes || ''}
                          onChange={(e) => setCurrentMood({...currentMood, notes: e.target.value})}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Button onClick={handleSaveEntry} disabled={isSaving}>
                            {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            {currentMood.id ? 'Update Entry' : 'Save Mood Entry'}
                        </Button>
                        {currentMood.id && (
                            <Button variant="ghost" onClick={() => setCurrentMood(defaultMoodState)}>
                                Cancel Edit
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Mood This Week</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px]">
              {weekData.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center rounded-lg bg-muted text-center">
                  <BarChart className="h-10 w-10 text-muted-foreground" />
                  <p className="mt-2 font-semibold">No Data Yet</p>
                  <p className="text-xs text-muted-foreground">Log your mood for a few days to see trends.</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={getMoodChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mood" />
                    <YAxis />
                    <Tooltip formatter={(value, name, props) => [`${value} entries`, 'Count']} />
                    <Bar dataKey="count" fill="#8884d8" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Energy This Week</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px]">
              {weekData.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center rounded-lg bg-muted text-center">
                  <Zap className="h-10 w-10 text-muted-foreground" />
                  <p className="mt-2 font-semibold">No Data Yet</p>
                  <p className="text-xs text-muted-foreground">Log your energy levels to see trends.</p>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={getEnergyChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="energy" />
                    <YAxis />
                    <Tooltip formatter={(value, name, props) => [`${value} entries`, 'Count']} />
                    <Bar dataKey="count" fill="#82ca9d" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Mood Insights</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold">{insights.avgMood}</p>
                <p className="text-xs text-muted-foreground">Avg. Mood</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-sm">{insights.topFactor}</p>
                <p className="text-xs text-muted-foreground">Top Factor</p>
              </div>
              <div>
                <p className="text-2xl font-bold">{insights.streak}</p>
                <p className="text-xs text-muted-foreground">Day Streak</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Weekly Summary */}
      {weekData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>This Week's Summary</CardTitle>
            <CardDescription>
              Insights from your {weekData.length} mood entry{weekData.length !== 1 ? 'ies' : ''} this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-blue-600">{weekData.length}</p>
                <p className="text-sm text-muted-foreground">Entries This Week</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-green-600">{insights.avgMood}</p>
                <p className="text-sm text-muted-foreground">Average Mood</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-purple-600">{insights.topFactor}</p>
                <p className="text-sm text-muted-foreground">Most Common Factor</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-orange-600">{insights.streak}</p>
                <p className="text-sm text-muted-foreground">Day Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

       <Card>
        <CardHeader>
            <CardTitle>Recent Mood Entries</CardTitle>
        </CardHeader>
        <CardContent>
        {loading ? (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        ) : log.length === 0 ? (
            <div className="text-center text-muted-foreground py-12">
            <History className="mx-auto h-12 w-12" />
            <p className="mt-4 font-semibold">No mood entries yet.</p>
            </div>
        ) : (
            <ul className="space-y-4">
            {log.map((entry) => (
                <li key={entry.id} className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="font-semibold">
                          {moods.find(m => m.value === entry.mood)?.emoji} {entry.mood} mood, 
                          {energyLevels.find(e => e.value === entry.energy)?.emoji} {entry.energy} energy
                        </p>
                        <p className="text-sm text-muted-foreground">{formatDateTime(entry.createdAt)}</p>
                        {entry.notes && <p className="mt-2 text-sm">Notes: "{entry.notes}"</p>}
                        {entry.influences.length > 0 && 
                            <div className="mt-2 flex flex-wrap gap-2">
                                {entry.influences.map(inf => {
                                  const influence = influences.find(i => i.value === inf);
                                  return (
                                    <Badge key={inf} variant="secondary">
                                      {influence?.emoji} {inf}
                                    </Badge>
                                  );
                                })}
                            </div>
                        }
                    </div>
                     <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(entry)}>
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(entry.id)}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
                </li>
            ))}
            </ul>
        )}
        </CardContent>
        {hasMore && (
            <CardFooter>
            <Button onClick={loadMore} disabled={loadingMore} className="w-full">
                {loadingMore && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Load More
            </Button>
            </CardFooter>
        )}
      </Card>
    </div>
  );
}


