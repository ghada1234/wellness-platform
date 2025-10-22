'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BrainCircuit, PlayCircle, Wind, Heart, Brain, Timer, CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function MindPracticesPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <BrainCircuit className="h-8 w-8 text-primary" />
          Mind Practices
        </h1>
        <p className="text-muted-foreground">
          Explore mindfulness, meditation, and breathing exercises for mental wellness
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Meditation Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
                <Brain className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle>Guided Meditation</CardTitle>
            </div>
            <CardDescription>
              Access guided meditation sessions from 5 to 60 minutes with vocal instructions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>5-60 minute sessions</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Vocal guidance included</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Progress tracking</span>
              </div>
            </div>
            <Button asChild className="w-full">
              <Link href="/dashboard/meditation">
                <PlayCircle className="mr-2 h-4 w-4" />
                Start Meditation
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Breathing Exercises Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                <Wind className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle>Breathing Exercises</CardTitle>
            </div>
            <CardDescription>
              Practice various breathing techniques to reduce stress and improve focus
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Box breathing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>4-7-8 technique</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Guided sessions</span>
              </div>
            </div>
            <Button asChild className="w-full">
              <Link href="/dashboard/breathing">
                <Wind className="mr-2 h-4 w-4" />
                Start Breathing
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Mindfulness Card */}
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-pink-100 dark:bg-pink-900/20">
                <Heart className="h-6 w-6 text-pink-600 dark:text-pink-400" />
              </div>
              <CardTitle>Mindfulness Practices</CardTitle>
            </div>
            <CardDescription>
              Develop awareness and presence through mindfulness exercises
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Body scan meditation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Mindful walking</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Present moment awareness</span>
              </div>
            </div>
            <Button asChild className="w-full">
              <Link href="/dashboard/mindfulness">
                <Heart className="mr-2 h-4 w-4" />
                Practice Mindfulness
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Timer className="h-5 w-5" />
            Your Mind Practice Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-sm text-muted-foreground">Total Sessions</div>
            </div>
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-sm text-muted-foreground">Minutes Practiced</div>
            </div>
            <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
              <div className="text-2xl font-bold text-pink-600">0</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

