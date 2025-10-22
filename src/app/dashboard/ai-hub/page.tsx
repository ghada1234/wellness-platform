'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  getPersonalizedRecommendations,
  PersonalizedRecommendationsOutput,
  type PersonalizedRecommendationsInput as RecsInput,
} from '@/ai/flows/personalized-recommendations';
import { chatWithAssistant, ChatWithAssistantInput } from '@/ai/flows/wellness-assistant';
import { Loader2, Sparkles, Wand2, BarChart, AlertTriangle, User, Bot, Send, Target, BrainCircuit, BedDouble, Droplets, BookText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';


interface ChatMessage {
    role: 'user' | 'model';
    content: { text: string }[];
}

export default function AiHubPage() {
  const [isLoadingRecs, setIsLoadingRecs] = React.useState(true);
  const [recommendations, setRecommendations] = React.useState<PersonalizedRecommendationsOutput | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState('recommendations');


  // Chat state
  const [chatHistory, setChatHistory] = React.useState<ChatMessage[]>([
    {
        role: 'model',
        content: [{ text: "Hello! I'm your AI Wellness Assistant. How can I help you understand your data or reach your goals today?" }]
    }
  ]);
  const [userInput, setUserInput] = React.useState('');
  const [isChatLoading, setIsChatLoading] = React.useState(false);
  const chatScrollAreaRef = React.useRef<HTMLDivElement>(null);


  React.useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const mockInput: RecsInput = {
          mood: 'Good',
          sleepDuration: 6.5,
          calorieIntake: 1800,
          workoutTime: 20,
          dailySteps: 4500,
          meditationMinutes: 5,
          journalEntries: ["Felt a bit stressed at work today.", "Grateful for the sunny weather."],
          goals: ['Improve Sleep', 'Be More Active'],
        };
        
        // Try to get AI recommendations
        const result = await getPersonalizedRecommendations(mockInput);
        setRecommendations(result);
      } catch (e: any) {
        console.error('AI Hub error:', e);
        
        // Check if it's an API key error
        const errorMessage = e?.message || String(e);
        if (errorMessage.includes('API key') || errorMessage.includes('GEMINI')) {
          setError('⚠️ Gemini API key not configured. Using demo recommendations instead.');
          
          // Show demo recommendations
          setRecommendations({
            recommendations: [
              {
                title: "Improve Sleep Quality",
                priority: "High",
                impact: "High",
                duration: "1-2 Weeks",
                description: "Your sleep duration of 6.5 hours is below the recommended 7-8 hours. Better sleep improves mood, focus, and overall health.",
                recommendedActions: [
                  "Go to bed 30 minutes earlier each night",
                  "Create a relaxing bedtime routine",
                  "Avoid screens 1 hour before sleep",
                  "Keep bedroom cool and dark"
                ]
              },
              {
                title: "Increase Daily Activity",
                priority: "High",
                impact: "Medium",
                duration: "2-4 Weeks",
                description: "With 4,500 steps daily, you're below the recommended 10,000 steps. More activity boosts energy and supports weight goals.",
                recommendedActions: [
                  "Take a 10-minute walk after meals",
                  "Use stairs instead of elevator",
                  "Park further away from destinations",
                  "Set hourly movement reminders"
                ]
              },
              {
                title: "Enhance Meditation Practice",
                priority: "Medium",
                impact: "High",
                duration: "1 Week",
                description: "You're doing 5 minutes of meditation daily - great start! Increasing to 10-15 minutes can significantly reduce stress.",
                recommendedActions: [
                  "Try guided meditations from our library",
                  "Meditate at the same time daily",
                  "Use breathing exercises when stressed",
                  "Track how you feel before and after"
                ]
              },
              {
                title: "Optimize Nutrition",
                priority: "Medium",
                impact: "Medium",
                duration: "2-3 Weeks",
                description: "Your calorie intake is on track. Focus on nutrient quality and meal timing for better results.",
                recommendedActions: [
                  "Use our AI Meal Planner for balanced meals",
                  "Track macros with nutrition tracker",
                  "Eat protein at every meal",
                  "Stay hydrated with 8 glasses of water"
                ]
              }
            ]
          });
        } else {
          setError('Failed to fetch AI recommendations. Please try again later.');
        }
      } finally {
        setIsLoadingRecs(false);
      }
    };
    fetchRecommendations();
  }, []);

  const handleChatSubmit = async (e: React.FormEvent | string) => {
    const message = typeof e === 'string' ? e : userInput;
    if (typeof e !== 'string') {
        e.preventDefault();
    }
    if (!message.trim()) return;

    const newUserMessage: ChatMessage = {
        role: 'user',
        content: [{ text: message }]
    };
    
    setChatHistory(prev => [...prev, newUserMessage]);
    if (typeof e !== 'string') {
        setUserInput('');
    }
    setIsChatLoading(true);

    try {
        const input: ChatWithAssistantInput = {
            history: chatHistory.map(m => ({...m, role: m.role as 'user' | 'model' | 'system' | 'tool' })),
            message: message,
        };
        const responseText = await chatWithAssistant(input);
        
        const newModelMessage: ChatMessage = {
            role: 'model',
            content: [{ text: responseText }]
        };

        setChatHistory(prev => [...prev, newModelMessage]);
    } catch (err) {
        console.error(err);
        const errorMessage: ChatMessage = {
            role: 'model',
            content: [{ text: "I'm sorry, I encountered an error. Please try again." }]
        };
         setChatHistory(prev => [...prev, errorMessage]);
    } finally {
        setIsChatLoading(false);
    }
  };
  
  const handleTellMeMore = (recTitle: string, recDescription: string) => {
    const prompt = `Tell me more about this recommendation: "${recTitle}". Here's the description: "${recDescription}"`;
    setActiveTab('assistant');
    handleChatSubmit(prompt);
  };

  const handleAddToPlan = (recTitle: string) => {
    toast({
        title: 'Added to Plan!',
        description: `"${recTitle}" has been added to your wellness plan.`,
    });
  };

  const getPriorityBadgeVariant = (priority: 'High' | 'Medium' | 'Low') => {
    switch (priority) {
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'secondary';
      case 'Low':
        return 'outline';
      default:
        return 'outline';
    }
  };
  
  React.useEffect(() => {
    if (chatScrollAreaRef.current) {
        chatScrollAreaRef.current.scrollTo({
            top: chatScrollAreaRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [chatHistory]);

  return (
    <div className="flex-1 flex flex-col h-full bg-gradient-to-br from-background to-muted/20">
      <div className="flex-shrink-0 p-6 pb-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                AI Wellness Hub
              </h1>
              <p className="text-muted-foreground text-sm">
                Your intelligent center for personalized insights and recommendations
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col min-h-0 px-6 pb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="recommendations" className="flex-1 flex flex-col">
        <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/50 backdrop-blur-sm border border-border/50">
          <TabsTrigger value="recommendations" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-200">
            <Sparkles className="mr-2 h-4 w-4" /> Recommendations
          </TabsTrigger>
          <TabsTrigger value="assistant" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-200">
            <Wand2 className="mr-2 h-4 w-4" /> AI Assistant
          </TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-md transition-all duration-200">
            <BarChart className="mr-2 h-4 w-4" /> Insights
          </TabsTrigger>
        </TabsList>
        <TabsContent value="recommendations" className="flex-1 flex flex-col min-h-0">
          {isLoadingRecs && (
            <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/30">
              <CardContent className="flex flex-col items-center justify-center p-16">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
                  <Loader2 className="h-16 w-16 animate-spin text-primary relative z-10" />
                </div>
                <p className="mt-6 text-muted-foreground text-lg font-medium">Generating your personalized recommendations...</p>
                <p className="mt-2 text-sm text-muted-foreground/70">This may take a few moments</p>
              </CardContent>
            </Card>
          )}
          {error && !recommendations && (
            <Card className="border-destructive/20 bg-destructive/5">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="h-5 w-5"/> Error
                  </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{error}</p>
                <Button className="mt-4" onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}
          {error && recommendations && (
            <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-800">Demo Mode</p>
                  <p className="text-sm text-yellow-700">{error}</p>
                  <p className="text-xs text-yellow-600 mt-1">Add Gemini API key to Vercel to get AI-powered recommendations based on your real data.</p>
                </div>
              </div>
            </div>
          )}
          {recommendations && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Your Personalized Recommendations</h2>
                  <p className="text-muted-foreground">AI-powered insights tailored to your wellness journey</p>
                </div>
                <Badge variant="secondary" className="text-sm">
                  {recommendations.recommendations.length} recommendations
                </Badge>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
              {recommendations.recommendations.map((rec, index) => (
                  <Card key={index} className="group hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-background to-muted/20 hover:from-background hover:to-muted/30">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <Target className="h-5 w-5 text-primary" />
                          </div>
                          <CardTitle className="text-lg">{rec.title}</CardTitle>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          <Badge variant={getPriorityBadgeVariant(rec.priority)} className="text-xs">
                            {rec.priority} Priority
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {rec.impact} Impact
                          </Badge>
                         </div>
                    </div>
                      <CardDescription className="flex items-center gap-2 text-sm">
                        <span className="font-medium">Duration:</span> {rec.duration}
                      </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">{rec.description}</p>
                      <div className="bg-muted/30 rounded-lg p-4">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          Recommended Actions:
                        </h4>
                        <ul className="space-y-2">
                          {rec.recommendedActions.map((action, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                              <span className="text-muted-foreground">{action}</span>
                            </li>
                          ))}
                        </ul>
                    </div>
                  </CardContent>
                    <CardFooter className="flex flex-wrap gap-3 pt-4">
                      <Button 
                        onClick={() => handleAddToPlan(rec.title)}
                        className="flex-1 sm:flex-none bg-primary hover:bg-primary/90 transition-all duration-200"
                      >
                        <Target className="mr-2 h-4 w-4" />
                        ✨ Add to Plan
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleTellMeMore(rec.title, rec.description)}
                        className="flex-1 sm:flex-none hover:bg-muted/50 transition-all duration-200"
                      >
                        <Wand2 className="mr-2 h-4 w-4" />
                        💬 Tell me more
                      </Button>
                  </CardFooter>
                </Card>
              ))}
              </div>
            </div>
          )}
        </TabsContent>
         <TabsContent value="assistant" className="flex-1 flex flex-col min-h-0">
            <div className="flex flex-col flex-1 min-h-0">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-primary/10">
                        <Bot className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">Chat with Wellness AI</h2>
                        <p className="text-muted-foreground text-sm">
                            Ask questions, get explanations, and explore your wellness data with AI assistance.
                        </p>
                    </div>
                </div>
                <div className="flex-1 flex flex-col">
                     <ScrollArea className="flex-1" ref={chatScrollAreaRef}>
                        <div className="space-y-4 pr-4">
                            {chatHistory.map((message, index) => (
                                <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                                    {message.role === 'model' && (
                                        <Avatar className="h-8 w-8 border-0">
                                            <AvatarFallback className="bg-primary/10">
                                                <Bot className="h-4 w-4 text-primary"/>
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div className={`rounded-2xl p-3 max-w-xs lg:max-w-md ${
                                        message.role === 'user' 
                                            ? 'bg-primary text-primary-foreground ml-auto' 
                                            : 'bg-muted/50'
                                    }`}>
                                        <p className="text-sm leading-relaxed">{message.content.map(c => c.text).join('')}</p>
                                    </div>
                                    {message.role === 'user' && (
                                        <Avatar className="h-8 w-8 border-0">
                                            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                                                {user?.email?.[0].toUpperCase() ?? 'U'}
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                </div>
                            ))}
                             {isChatLoading && (
                                <div className="flex items-start gap-3">
                                    <Avatar className="h-8 w-8 border-0">
                                        <AvatarFallback className="bg-primary/10">
                                            <Bot className="h-4 w-4 text-primary"/>
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="rounded-2xl p-3 bg-muted/50 flex items-center gap-2">
                                       <Loader2 className="h-4 w-4 animate-spin text-primary"/>
                                       <span className="text-sm text-muted-foreground">AI is thinking...</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </div>
                <div className="mt-4">
                    <form onSubmit={handleChatSubmit} className="flex w-full items-center space-x-3">
                        <Input 
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="Ask about your sleep, mood, activity, or wellness goals..."
                            disabled={isChatLoading}
                            className="flex-1"
                        />
                        <Button 
                            type="submit" 
                            disabled={isChatLoading || !userInput.trim()}
                        >
                            <Send className="h-4 w-4"/>
                            <span className="sr-only">Send</span>
                        </Button>
                    </form>
                </div>
            </div>
        </TabsContent>
         <TabsContent value="insights">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <BarChart className="h-6 w-6 text-primary" />
                </div>
                <div>
                <h2 className="text-2xl font-bold">Wellness Insights</h2>
                <p className="text-muted-foreground">Deep analytics and trends from your wellness journey</p>
                </div>
              </div>

              {/* Coming Soon Features */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-lg bg-purple-500/10">
                      <Sparkles className="h-5 w-5 text-purple-500" />
                    </div>
                    🚀 Coming Soon Features
                  </CardTitle>
                  <CardDescription>Exciting new analytics and insights features in development</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 hover:scale-105" onClick={() => toast({ title: "🔍 Correlation Analysis", description: "This feature will analyze relationships between your sleep, mood, activity, and nutrition data." })}>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-blue-500/10">
                              <BarChart className="h-5 w-5 text-blue-500" />
                            </div>
                            <h4 className="font-semibold text-lg flex items-center gap-2">
                              🔍 Correlation Analysis
                              <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                            </h4>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">Discover how different wellness factors influence each other</p>
                          <div className="text-xs text-blue-600 font-medium group-hover:text-blue-700 transition-colors">Click to learn more →</div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20 hover:scale-105" onClick={() => toast({ title: "📈 Predictive Insights", description: "AI will predict your wellness trends and suggest proactive improvements." })}>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-green-500/10">
                              <Sparkles className="h-5 w-5 text-green-500" />
                            </div>
                            <h4 className="font-semibold text-lg flex items-center gap-2">
                              📈 Predictive Insights
                              <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                            </h4>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">Get AI-powered predictions about your wellness trajectory</p>
                          <div className="text-xs text-green-600 font-medium group-hover:text-green-700 transition-colors">Click to learn more →</div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 hover:scale-105" onClick={() => toast({ title: "📊 Interactive Dashboards", description: "Custom charts and real-time data visualization will be available soon." })}>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-purple-500/10">
                              <BarChart className="h-5 w-5 text-purple-500" />
                            </div>
                            <h4 className="font-semibold text-lg flex items-center gap-2">
                              📊 Interactive Dashboards
                              <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                            </h4>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">Customizable charts and real-time data visualization</p>
                          <div className="text-xs text-purple-600 font-medium group-hover:text-purple-700 transition-colors">Click to learn more →</div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20 hover:scale-105" onClick={() => toast({ title: "📋 Wellness Reports", description: "Comprehensive weekly and monthly wellness summaries will be generated automatically." })}>
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-orange-500/10">
                              <BookText className="h-5 w-5 text-orange-500" />
                            </div>
                            <h4 className="font-semibold text-lg flex items-center gap-2">
                              📋 Wellness Reports
                              <Badge variant="secondary" className="text-xs">Coming Soon</Badge>
                            </h4>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">Weekly and monthly comprehensive wellness summaries</p>
                          <div className="text-xs text-orange-600 font-medium group-hover:text-orange-700 transition-colors">Click to learn more →</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>

              {/* Data Trends Section */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <BarChart className="h-5 w-5 text-blue-500" />
                    </div>
                    📊 Data Trends
                  </CardTitle>
                  <CardDescription>Track patterns in your mood, sleep, activity, and nutrition over time</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <div className="group rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 p-6 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-4 w-4 rounded-full bg-blue-500 shadow-sm"></div>
                        <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">Mood Trend</span>
                      </div>
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">4.2</div>
                      <div className="text-xs text-blue-600/70 dark:text-blue-400/70 mb-3">+0.3 from last week</div>
                      <div className="h-3 bg-blue-200 dark:bg-blue-800/30 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000" style={{width: '84%'}}></div>
                      </div>
                    </div>
                    <div className="group rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20 p-6 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-4 w-4 rounded-full bg-green-500 shadow-sm"></div>
                        <span className="text-sm font-semibold text-green-700 dark:text-green-300">Sleep Quality</span>
                      </div>
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">7.5h</div>
                      <div className="text-xs text-green-600/70 dark:text-green-400/70 mb-3">+0.5h from last week</div>
                      <div className="h-3 bg-green-200 dark:bg-green-800/30 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000" style={{width: '75%'}}></div>
                      </div>
                    </div>
                    <div className="group rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-950/30 dark:to-purple-900/20 p-6 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-4 w-4 rounded-full bg-purple-500 shadow-sm"></div>
                        <span className="text-sm font-semibold text-purple-700 dark:text-purple-300">Activity</span>
                      </div>
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">6,240</div>
                      <div className="text-xs text-purple-600/70 dark:text-purple-400/70 mb-3">steps today</div>
                      <div className="h-3 bg-purple-200 dark:bg-purple-800/30 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full transition-all duration-1000" style={{width: '62%'}}></div>
                      </div>
                    </div>
                    <div className="group rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20 p-6 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-4 w-4 rounded-full bg-orange-500 shadow-sm"></div>
                        <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">Water Intake</span>
                      </div>
                      <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">6/8</div>
                      <div className="text-xs text-orange-600/70 dark:text-orange-400/70 mb-3">glasses today</div>
                      <div className="h-3 bg-orange-200 dark:bg-orange-800/30 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-1000" style={{width: '75%'}}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Goal Progress Section */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-background to-muted/20">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <Target className="h-5 w-5 text-green-500" />
                    </div>
                    🎯 Goal Progress
                  </CardTitle>
                  <CardDescription>Visualize your progress toward wellness goals with detailed analytics</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="group rounded-xl bg-gradient-to-r from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/20 p-6 transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-blue-500/10">
                            <BrainCircuit className="h-6 w-6 text-blue-500" />
                          </div>
                      <div>
                            <p className="font-semibold text-lg">Daily Meditation</p>
                        <p className="text-sm text-muted-foreground">5/7 days this week</p>
                          </div>
                      </div>
                      <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">71%</p>
                          <div className="w-24 h-3 bg-blue-200 dark:bg-blue-800/30 rounded-full mt-2 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-1000" style={{width: '71%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="group rounded-xl bg-gradient-to-r from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/20 p-6 transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-green-500/10">
                            <BedDouble className="h-6 w-6 text-green-500" />
                          </div>
                      <div>
                            <p className="font-semibold text-lg">Sleep Goal</p>
                        <p className="text-sm text-muted-foreground">7-8 hours nightly</p>
                          </div>
                      </div>
                      <div className="text-right">
                          <p className="text-2xl font-bold text-green-600 dark:text-green-400">85%</p>
                          <div className="w-24 h-3 bg-green-200 dark:bg-green-800/30 rounded-full mt-2 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-1000" style={{width: '85%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="group rounded-xl bg-gradient-to-r from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/20 p-6 transition-all duration-300">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-lg bg-orange-500/10">
                            <Droplets className="h-6 w-6 text-orange-500" />
                          </div>
                      <div>
                            <p className="font-semibold text-lg">Water Intake</p>
                        <p className="text-sm text-muted-foreground">8 glasses daily</p>
                          </div>
                      </div>
                      <div className="text-right">
                          <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">75%</p>
                          <div className="w-24 h-3 bg-orange-200 dark:bg-orange-800/30 rounded-full mt-2 overflow-hidden">
                            <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full transition-all duration-1000" style={{width: '75%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
        </TabsContent>
      </Tabs>
      </div>
    </div>
  );
}



