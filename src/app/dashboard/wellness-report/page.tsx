
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import {
  Share2,
  AlertCircle,
  Dumbbell,
  Flame,
  Bed,
  Star,
  CalendarDays,
  Utensils,
  Smile,
  Download,
  Loader2,
} from 'lucide-react';
import type { ChartConfig } from '@/components/ui/chart';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/hooks/use-firestore';
import { useMemo, useState } from 'react';
import { exportWellnessReportToPDF } from '@/lib/wellness-pdf-export';

const activityData = [
  { day: 'Wed', minutes: 0 },
  { day: 'Thu', minutes: 0 },
  { day: 'Fri', minutes: 0 },
  { day: 'Sat', minutes: 0 },
  { day: 'Sun', minutes: 0 },
  { day: 'Mon', minutes: 0 },
  { day: 'Tue', minutes: 0 },
];
const activityChartConfig = {
  minutes: { label: 'Minutes', color: 'hsl(var(--chart-1))' },
} satisfies ChartConfig;

const sleepData = [
  { date: 'Sep 3', hours: 0 },
  { date: 'Sep 4', hours: 0 },
  { date: 'Sep 5', hours: 0 },
  { date: 'Sep 6', hours: 0 },
  { date: 'Sep 7', hours: 0 },
  { date: 'Sep 8', hours: 0 },
  { date: 'Sep 9', hours: 0 },
];
const sleepChartConfig = {
  hours: { label: 'Hours', color: 'hsl(var(--chart-2))' },
} satisfies ChartConfig;

const nutritionData = [
  { day: 'Wed', calories: 0 },
  { day: 'Thu', calories: 0 },
  { day: 'Fri', calories: 0 },
  { day: 'Sat', calories: 0 },
  { day: 'Sun', calories: 0 },
  { day: 'Mon', calories: 0 },
  { day: 'Tue', calories: 0 },
];
const nutritionChartConfig = {
  calories: { label: 'Calories', color: 'hsl(var(--chart-3))' },
} satisfies ChartConfig;

const moodData = [
  { day: 'Wed', mood: 3 }, // 3 for 'Okay'
  { day: 'Thu', mood: 4 }, // 4 for 'Good'
  { day: 'Fri', mood: 3 },
  { day: 'Sat', mood: 5 }, // 5 for 'Excellent'
  { day: 'Sun', mood: 4 },
  { day: 'Mon', mood: 2 }, // 2 for 'Low'
  { day: 'Tue', mood: 4 },
];

const moodLevels: { [key: number]: string } = {
  1: 'Poor',
  2: 'Low',
  3: 'Okay',
  4: 'Good',
  5: 'Excellent',
};

const moodChartConfig = {
  mood: { label: 'Mood' },
  Excellent: { label: 'Excellent', color: 'hsl(var(--chart-1))' },
  Good: { label: 'Good', color: 'hsl(var(--chart-2))' },
  Okay: { label: 'Okay', color: 'hsl(var(--chart-3))' },
  Low: { label: 'Low', color: 'hsl(var(--chart-4))' },
  Poor: { label: 'Poor', color: 'hsl(var(--chart-5))' },
} satisfies ChartConfig;

const generateReportText = (processedData: any) => {
    let report = `*✨ Your Weekly Wellness Report ✨*\n\n`;

    // Calculate summary statistics
    const totalActivity = processedData.activityChartData.reduce((sum: number, d: any) => sum + d.minutes, 0);
    const totalCalories = processedData.nutritionChartData.reduce((sum: number, d: any) => sum + d.calories, 0);
    const avgCalories = Math.round(totalCalories / 7);
    const avgMood = Math.round(processedData.moodChartData.reduce((sum: number, d: any) => sum + d.mood, 0) / 7);
    const avgSleep = Math.round((processedData.sleepChartData.reduce((sum: number, d: any) => sum + d.hours, 0) / 7) * 10) / 10;
    const activeDays = processedData.activityChartData.filter((d: any) => d.minutes > 0).length;

    report += `*📊 Summary*\n`;
    report += `--------------------\n`;
    report += `💪 *Total Activity:* ${totalActivity} min\n`;
    report += `🔥 *Total Calories:* ${totalCalories}\n`;
    report += `🥗 *Avg. Calories:* ${avgCalories} kcal\n`;
    report += `😊 *Avg. Mood:* ${moodLevels[avgMood as keyof typeof moodLevels]}\n`;
    report += `😴 *Avg. Sleep:* ${avgSleep} h\n`;
    report += `⭐ *Active Days:* ${activeDays}/7\n\n`;

    report += `*📈 Weekly Trends*\n`;
    report += `--------------------\n`;

    report += `*💪 Activity (minutes):*\n`;
    processedData.activityChartData.forEach((d: any) => {
        report += `  • ${d.day}: ${d.minutes} min\n`;
    });

    report += `\n*😴 Sleep (hours):*\n`;
    processedData.sleepChartData.forEach((d: any) => {
        report += `  • ${d.date}: ${d.hours} hrs\n`;
    });

    report += `\n*🥗 Nutrition (calories):*\n`;
    processedData.nutritionChartData.forEach((d: any) => {
        report += `  • ${d.day}: ${d.calories} kcal\n`;
    });

    report += `\n*😊 Mood:*\n`;
    processedData.moodChartData.forEach((d: any) => {
        report += `  • ${d.day}: ${moodLevels[d.mood as keyof typeof moodLevels]}\n`;
    });

    report += `\n_Keep tracking your wellness data for better insights!_`;
    return report;
};

export default function WellnessReportPage() {
    const { toast } = useToast();
    const [isExporting, setIsExporting] = useState(false);
    
    // Fetch data from Firestore
    const { data: moodData, loading: moodLoading } = useFirestore('moodEntries', { limit: 50 });
    const { data: meditationData, loading: meditationLoading } = useFirestore('meditationLog', { limit: 50 });
    const { data: nutritionData, loading: nutritionLoading } = useFirestore('mealEntries', { limit: 50 });
    const { data: activityData, loading: activityLoading } = useFirestore('activityLog', { limit: 50 });
    const { data: sleepData, loading: sleepLoading } = useFirestore('sleepLog', { limit: 50 });
    const { data: journalData, loading: journalLoading } = useFirestore('journalLog', { limit: 50 });
    const { data: breathingData, loading: breathingLoading } = useFirestore('breathingLog', { limit: 50 });
    const { data: waterData, loading: waterLoading } = useFirestore('waterIntake', { limit: 50 });
    
    const isLoading = moodLoading || meditationLoading || nutritionLoading || activityLoading || sleepLoading || journalLoading || breathingLoading || waterLoading;

    // Process data for charts
    const processedData = useMemo(() => {
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return date;
        }).reverse();

        const getDayLabel = (date: Date) => {
            return date.toLocaleDateString('en-US', { weekday: 'short' });
        };

        const getDateLabel = (date: Date) => {
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        };

        // Process activity data
        const activityChartData = last7Days.map(date => {
            const dayLabel = getDayLabel(date);
            const dayData = activityData.filter(item => {
                const itemDate = new Date(item.createdAt?.toDate?.() || item.createdAt || new Date());
                return itemDate.toDateString() === date.toDateString();
            });
            const totalMinutes = dayData.reduce((sum, item) => sum + (item.duration || 0), 0);
            return { day: dayLabel, minutes: totalMinutes };
        });

        // Process sleep data
        const sleepChartData = last7Days.map(date => {
            const dateLabel = getDateLabel(date);
            const dayData = sleepData.filter(item => {
                const itemDate = new Date(item.createdAt?.toDate?.() || item.createdAt || new Date());
                return itemDate.toDateString() === date.toDateString();
            });
            const avgHours = dayData.length > 0 ? dayData.reduce((sum, item) => sum + (item.duration || 0), 0) / dayData.length : 0;
            return { date: dateLabel, hours: Math.round(avgHours * 10) / 10 };
        });

        // Process nutrition data
        const nutritionChartData = last7Days.map(date => {
            const dayLabel = getDayLabel(date);
            const dayData = nutritionData.filter(item => {
                const itemDate = new Date(item.createdAt?.toDate?.() || item.createdAt || new Date());
                return itemDate.toDateString() === date.toDateString();
            });
            const totalCalories = dayData.reduce((sum, item) => {
                return sum + (item.items?.reduce((itemSum: number, foodItem: any) => itemSum + (foodItem.calories || 0), 0) || 0);
            }, 0);
            return { day: dayLabel, calories: totalCalories };
        });

        // Process mood data
        const moodChartData = last7Days.map(date => {
            const dayLabel = getDayLabel(date);
            const dayData = moodData.filter(item => {
                const itemDate = new Date(item.createdAt?.toDate?.() || item.createdAt || new Date());
                return itemDate.toDateString() === date.toDateString();
            });
            
            if (dayData.length === 0) {
                return { day: dayLabel, mood: 3 }; // Default to 'Okay'
            }
            
            // Convert mood strings to numbers
            const moodValues = { 'Poor': 1, 'Low': 2, 'Okay': 3, 'Good': 4, 'Excellent': 5 };
            const avgMood = dayData.reduce((sum, item) => {
                const moodValue = typeof item.mood === 'string' ? moodValues[item.mood as keyof typeof moodValues] || 3 : item.mood || 3;
                return sum + moodValue;
            }, 0) / dayData.length;
            
            return { day: dayLabel, mood: Math.round(avgMood) };
        });

        // Process meditation data
        const meditationChartData = last7Days.map(date => {
            const dayLabel = getDayLabel(date);
            const dayData = meditationData.filter(item => {
                const itemDate = new Date(item.createdAt?.toDate?.() || item.createdAt || new Date());
                return itemDate.toDateString() === date.toDateString();
            });
            const totalMinutes = dayData.reduce((sum, item) => sum + (item.duration || 0), 0);
            return { day: dayLabel, minutes: totalMinutes };
        });

        // Process water data
        const waterChartData = last7Days.map(date => {
            const dayLabel = getDayLabel(date);
            const dayData = waterData.filter(item => {
                const itemDate = new Date(item.createdAt?.toDate?.() || item.createdAt || new Date());
                return itemDate.toDateString() === date.toDateString();
            });
            const totalGlasses = dayData.reduce((sum, item) => sum + (item.amount || 0), 0);
            return { day: dayLabel, glasses: totalGlasses };
        });

        return {
            activityChartData,
            sleepChartData,
            nutritionChartData,
            moodChartData,
            meditationChartData,
            waterChartData,
        };
    }, [moodData, meditationData, nutritionData, activityData, sleepData, journalData, breathingData, waterData]);

    const handleShareReport = () => {
        const summary = generateReportText(processedData);
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(summary)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleExportPDF = async () => {
        setIsExporting(true);
        try {
            const wellnessData = {
                moodData: moodData || [],
                meditationData: meditationData || [],
                nutritionData: nutritionData || [],
                activityData: activityData || [],
                sleepData: sleepData || [],
                journalData: journalData || [],
                breathingData: breathingData || [],
                waterData: waterData || [],
            };
            
            await exportWellnessReportToPDF(wellnessData, processedData);
            toast({
                title: 'PDF Export Successful!',
                description: 'Your comprehensive wellness report has been downloaded.',
            });
        } catch (error) {
            console.error('PDF export error:', error);
            toast({
                variant: 'destructive',
                title: 'Export Failed',
                description: 'Failed to export PDF. Please try again.',
            });
        } finally {
            setIsExporting(false);
        }
    };
    
    const handleDownloadReport = () => {
        const text = generateReportText();
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'wellness-report.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Wellness Report
          </h1>
          <p className="text-muted-foreground">
            An overview of your activity, sleep, nutrition, and mood data.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue="weekly">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Weekly Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-y-6 md:grid-cols-4">
              <div className="flex items-center gap-4">
                <Dumbbell className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">
                    {processedData.activityChartData.reduce((sum, d) => sum + d.minutes, 0)} min
                  </p>
                  <p className="text-sm text-muted-foreground">Total Activity</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Flame className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">
                    {processedData.nutritionChartData.reduce((sum, d) => sum + d.calories, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Calories</p>
                </div>
              </div>
               <div className="flex items-center gap-4">
                <Utensils className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">
                    {Math.round(processedData.nutritionChartData.reduce((sum, d) => sum + d.calories, 0) / 7)}
                  </p>
                  <p className="text-sm text-muted-foreground">Avg. Calories</p>
                </div>
              </div>
               <div className="flex items-center gap-4">
                <Smile className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">
                    {processedData.moodChartData.length > 0 
                      ? moodLevels[Math.round(processedData.moodChartData.reduce((sum, d) => sum + d.mood, 0) / processedData.moodChartData.length) as keyof typeof moodLevels] || 'N/A'
                      : 'N/A'
                    }
                  </p>
                  <p className="text-sm text-muted-foreground">Avg. Mood</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Bed className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">
                    {Math.round((processedData.sleepChartData.reduce((sum, d) => sum + d.hours, 0) / 7) * 10) / 10} h
                  </p>
                  <p className="text-sm text-muted-foreground">Avg. Sleep</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Star className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">
                    {sleepData.length > 0 
                      ? Math.round((sleepData.reduce((sum, item) => sum + (item.quality || 0), 0) / sleepData.length) * 10) / 10
                      : 0
                    }/5
                  </p>
                  <p className="text-sm text-muted-foreground">Avg. Quality</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <CalendarDays className="h-8 w-8 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">
                    {processedData.activityChartData.filter(d => d.minutes > 0).length} Days
                  </p>
                  <p className="text-sm text-muted-foreground">Active Days</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
             <Card>
              <CardHeader>
                <CardTitle>Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center h-[200px]">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : (
                  <div id="activity-chart">
                    <ChartContainer config={activityChartConfig} className="h-[200px] w-full">
                      <RechartsBarChart data={processedData.activityChartData} accessibilityLayer>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis domain={[0, 4]} hide/>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                      <Bar dataKey="minutes" fill="var(--color-minutes)" radius={4} />
                    </RechartsBarChart>
                  </ChartContainer>
                  </div>
                )}
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle>Sleep</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center h-[200px]">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : (
                  <div id="sleep-chart">
                    <ChartContainer config={sleepChartConfig} className="h-[200px] w-full">
                      <RechartsBarChart data={processedData.sleepChartData} accessibilityLayer>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis domain={[0, 12]} hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                       <Bar dataKey="hours" fill="var(--color-hours)" radius={4} />
                    </RechartsBarChart>
                  </ChartContainer>
                  </div>
                )}
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle>Nutrition</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center h-[200px]">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : (
                  <div id="nutrition-chart">
                    <ChartContainer config={nutritionChartConfig} className="h-[200px] w-full">
                      <RechartsBarChart data={processedData.nutritionChartData} accessibilityLayer>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis domain={[0, 2200]} hide />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                       <Bar dataKey="calories" fill="var(--color-calories)" radius={4} />
                    </RechartsBarChart>
                  </ChartContainer>
                  </div>
                )}
              </CardContent>
            </Card>
             <Card>
              <CardHeader>
                <CardTitle>Mood</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex justify-center items-center h-[200px]">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : (
                  <div id="mood-chart">
                    <ChartContainer config={moodChartConfig} className="h-[200px] w-full">
                      <RechartsBarChart data={processedData.moodChartData} accessibilityLayer>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis domain={[1, 5]} hide />
                    <ChartTooltip 
                        content={<ChartTooltipContent 
                            formatter={(value) => moodLevels[value as keyof typeof moodLevels]}
                            nameKey="mood"
                        />} 
                    />
                    <ChartLegend content={<ChartLegendContent payload={Object.values(moodChartConfig).filter(c => c.label !== 'Mood').map(c => ({value: c.label, type: 'square', color: c.color}))} />} />
                     <Bar dataKey="mood" radius={4}>
                      {processedData.moodChartData.map((entry, index) => {
                          const moodLevel = moodLevels[entry.mood as keyof typeof moodLevels];
                          const color = moodChartConfig[moodLevel as keyof typeof moodChartConfig]?.color;
                          return <Cell key={`cell-${index}`} fill={color} />;
                      })}
                       </Bar>
                    </RechartsBarChart>
                  </ChartContainer>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Health Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <h4 className="font-semibold">Health Conditions</h4>
                    <p className="text-sm text-muted-foreground">
                        No health conditions listed. You can add them on your personal information page to get more personalized insights.
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Logs</CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="multiple">
                        <AccordionItem value="activity">
                            <AccordionTrigger>Activity Log</AccordionTrigger>
                            <AccordionContent>
                                <div className="text-center text-muted-foreground p-4">
                                    <AlertCircle className="mx-auto h-8 w-8" />
                                    <p className="mt-2 text-sm">No activity logged for this period.</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="sleep">
                            <AccordionTrigger>Sleep Log</AccordionTrigger>
                            <AccordionContent>
                                <div className="text-center text-muted-foreground p-4">
                                    <AlertCircle className="mx-auto h-8 w-8" />
                                    <p className="mt-2 text-sm">No sleep logged for this period.</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="nutrition">
                            <AccordionTrigger>Nutrition Log</AccordionTrigger>
                            <AccordionContent>
                                <div className="text-center text-muted-foreground p-4">
                                    <AlertCircle className="mx-auto h-8 w-8" />
                                    <p className="mt-2 text-sm">No nutrition logged for this period.</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="mood">
                            <AccordionTrigger>Mood Log</AccordionTrigger>
                            <AccordionContent>
                                <div className="text-center text-muted-foreground p-4">
                                    <AlertCircle className="mx-auto h-8 w-8" />
                                    <p className="mt-2 text-sm">No mood logged for this period.</p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Export & Share</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Button 
                        variant="default" 
                        className="w-full" 
                        onClick={handleExportPDF}
                        disabled={isExporting}
                    >
                        {isExporting ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Download className="mr-2 h-4 w-4" />
                        )}
                        {isExporting ? 'Generating PDF...' : 'Export Full PDF Report'}
                    </Button>
                    <Button variant="outline" className="w-full" onClick={handleShareReport}>
                        <Share2 className="mr-2 h-4 w-4" />
                        Share to WhatsApp
                    </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
