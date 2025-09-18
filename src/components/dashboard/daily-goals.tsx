import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Droplets, Footprints, BookOpen, BrainCircuit, Edit, Save } from 'lucide-react';
import { useWaterIntake } from '@/hooks/use-water-intake';
import { useFirestore } from '@/hooks/use-firestore';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import type { Timestamp } from 'firebase/firestore';

interface ActivityLog {
  id: string;
  duration: number;
  createdAt: Timestamp | Date;
}

interface JournalEntry {
  id: string;
  createdAt: Timestamp | Date;
}

interface MeditationSession {
  id: string;
  duration: number;
  createdAt: Timestamp | Date;
}

export function DailyGoals() {
  const { waterIntake, updateWaterGoal, loading: waterLoading } = useWaterIntake();
  const { data: activityData } = useFirestore<ActivityLog>('activityLog');
  const { data: journalData } = useFirestore<JournalEntry>('journalLog');
  const { data: meditationData } = useFirestore<MeditationSession>('meditationLog');
  const { toast } = useToast();

  const [isWaterGoalDialogOpen, setIsWaterGoalDialogOpen] = useState(false);
  const [newWaterGoal, setNewWaterGoal] = useState(waterIntake?.goal || 8);

  // Update newWaterGoal when waterIntake changes
  useEffect(() => {
    if (waterIntake?.goal) {
      setNewWaterGoal(waterIntake.goal);
    }
  }, [waterIntake?.goal]);

  // Calculate today's totals
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayActivity = activityData.filter(entry => {
    const entryDate = entry.createdAt instanceof Date ? entry.createdAt : entry.createdAt.toDate();
    return entryDate >= today;
  }).reduce((total, entry) => total + entry.duration, 0);

  const todayJournal = journalData.filter(entry => {
    const entryDate = entry.createdAt instanceof Date ? entry.createdAt : entry.createdAt.toDate();
    return entryDate >= today;
  }).length;

  const todayMeditation = meditationData.filter(entry => {
    const entryDate = entry.createdAt instanceof Date ? entry.createdAt : entry.createdAt.toDate();
    return entryDate >= today;
  }).reduce((total, entry) => total + entry.duration, 0);

  const goals = [
    {
      title: 'Meditate',
      icon: BrainCircuit,
      current: todayMeditation, // Duration is already in minutes
      target: 10,
      unit: 'minutes',
      editable: false,
    },
    {
      title: 'Drink Water',
      icon: Droplets,
      current: waterIntake?.glasses || 0,
      target: waterIntake?.goal || 8,
      unit: 'glasses',
      editable: true,
    },
    {
      title: 'Walk',
      icon: Footprints,
      current: todayActivity, // Duration is already in minutes
      target: 30,
      unit: 'minutes',
      editable: false,
    },
    {
      title: 'Journal',
      icon: BookOpen,
      current: todayJournal,
      target: 1,
      unit: 'entry',
      editable: false,
    },
  ];

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  const getRemainingText = (current: number, target: number, unit: string) => {
    if (current >= target) return 'Completed';
    const remaining = target - current;
    const pluralUnit = remaining > 1 && !unit.endsWith('s') ? `${unit}s` : unit;
    return `${remaining} ${pluralUnit} more to go`;
  };

  const handleWaterGoalUpdate = async () => {
    try {
      await updateWaterGoal(newWaterGoal);
      setIsWaterGoalDialogOpen(false);
      toast({
        title: 'Water goal updated!',
        description: `Your daily water goal is now ${newWaterGoal} glasses.`,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to update water goal',
        description: 'Please try again.',
      });
    }
  };

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Daily Goals</CardTitle>
        <CardDescription>
          Stay on track with your wellness targets for today.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {goals.map((goal) => {
          const progress = calculateProgress(goal.current, goal.target);
          const remainingText = getRemainingText(goal.current, goal.target, goal.unit);
          return (
            <div key={goal.title} className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <goal.icon className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-baseline justify-between">
                  <p className="font-medium">{goal.title}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground">
                      {goal.current.toLocaleString()} / {goal.target.toLocaleString()}{' '}
                      {goal.unit}
                    </p>
                    {goal.editable && (
                      <Dialog open={isWaterGoalDialogOpen} onOpenChange={setIsWaterGoalDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => setNewWaterGoal(waterIntake?.goal || 8)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Update Water Goal</DialogTitle>
                            <DialogDescription>
                              Set your daily water intake goal in glasses.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="water-goal">Daily Goal (glasses)</Label>
                              <Input
                                id="water-goal"
                                type="number"
                                min="1"
                                max="20"
                                value={newWaterGoal}
                                onChange={(e) => setNewWaterGoal(parseInt(e.target.value) || 8)}
                                placeholder="8"
                              />
                              <p className="text-xs text-muted-foreground">
                                Recommended: 6-8 glasses per day
                              </p>
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              onClick={() => setIsWaterGoalDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button onClick={handleWaterGoalUpdate}>
                              <Save className="mr-2 h-4 w-4" />
                              Save Goal
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
                <Progress value={progress} className="mt-1 h-2" />
                <p className="mt-1 text-xs text-muted-foreground">
                  {remainingText}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
