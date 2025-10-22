'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, TrendingUp, Users, Activity, Eye, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-primary" />
          Analytics Dashboard
        </h1>
        <p className="text-muted-foreground">
          Monitor your wellness app usage and engagement metrics
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">285+</div>
            <p className="text-xs text-muted-foreground">Active users</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.7K+</div>
            <p className="text-xs text-muted-foreground">Total views</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">User engagement</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Session</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12m</div>
            <p className="text-xs text-muted-foreground">Average duration</p>
          </CardContent>
        </Card>
      </div>

      {/* Feature Usage */}
      <Card>
        <CardHeader>
          <CardTitle>Feature Usage</CardTitle>
          <CardDescription>Most popular features by user engagement</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Meditation Sessions</span>
                <span className="text-sm text-muted-foreground">87%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-purple-600" style={{ width: '87%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Nutrition Tracking</span>
                <span className="text-sm text-muted-foreground">73%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-blue-600" style={{ width: '73%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Mood Tracking</span>
                <span className="text-sm text-muted-foreground">65%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-green-600" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">AI Meal Planner</span>
                <Badge variant="secondary" className="text-xs">NEW</Badge>
                <span className="text-sm text-muted-foreground">42%</span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-orange-600" style={{ width: '42%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Google Analytics Info */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Google Analytics Integration
          </CardTitle>
          <CardDescription>
            Real-time tracking and detailed user insights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white dark:bg-slate-900 rounded-lg border">
            <h4 className="font-semibold mb-2">Tracked Events:</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Page views across all pages
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Meal plan generations
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Profile completions
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                Meal plan saves & exports
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                User engagement metrics
              </li>
            </ul>
          </div>

          <Button asChild variant="outline" className="w-full">
            <a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer">
              <TrendingUp className="mr-2 h-4 w-4" />
              View in Google Analytics
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Vercel Analytics Info */}
      <Card>
        <CardHeader>
          <CardTitle>Vercel Analytics</CardTitle>
          <CardDescription>Performance and visitor data from Vercel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Edge Requests</div>
              <div className="text-2xl font-bold">1.7K+</div>
            </div>
            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Error Rate</div>
              <div className="text-2xl font-bold text-green-600">0%</div>
            </div>
          </div>

          <Button asChild variant="outline" className="w-full">
            <a href="https://vercel.com/ghada-rabees-projects/mind-main2/analytics" target="_blank" rel="noopener noreferrer">
              <BarChart3 className="mr-2 h-4 w-4" />
              View in Vercel Dashboard
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

