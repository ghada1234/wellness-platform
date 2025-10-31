'use client';

import { Button } from "@/components/ui/button";
import { Moon, Activity, Quote, ArrowRight, Play, CheckCircle, User, Brain, Apple, Droplets, BookOpen, BrainCircuit, BedDouble, Smile, Wind, HeartHandshake, Sparkles, HeartPulse, Camera, Search, Scan, ChefHat, Target, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center gap-2" href="/">
          <Image 
            src="/sun.jpeg" 
            alt="Logo" 
            width={24} 
            height={24} 
            className="shrink-0 rounded"
          />
          <span className="text-foreground font-semibold text-sm sm:text-base">Find Your Inner Peace</span>
        </Link>
        <nav className="ml-auto flex gap-1 sm:gap-2">
          <Link href="/auth/sign-in">
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              Sign In
            </Button>
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-8 sm:py-12 md:py-24 lg:py-32 xl:py-48 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 text-center lg:text-left">
                <div className="space-y-2">
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-5xl xl:text-6xl/none">
                    Find Your Inner Peace
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground text-sm sm:text-base md:text-xl mx-auto lg:mx-0">
                    Your Comprehensive Wellness & Meditation Platform. Track your mood, meditate, and discover AI-powered insights for a healthier, happier you.
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-center lg:justify-start">
                  <Link href="/auth/sign-in">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Sign In
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="order-first lg:order-last">
                <Image
                  src="https://picsum.photos/600/400"
                  width="600"
                  height="400"
                  alt="Hero"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center w-full max-w-md lg:max-w-none"
                />
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                      Comprehensive Wellness Features
                    </h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Discover our complete suite of AI-powered wellness tools designed to help you achieve optimal health and inner peace.
                    </p>
              </div>
            </div>
            
            {/* Core Features Grid */}
            <div className="mx-auto grid max-w-6xl items-center gap-8 py-12 lg:grid-cols-2 lg:gap-12">
              
              {/* AI Hub */}
              <div className="flex flex-col space-y-4 p-6 border rounded-lg bg-card">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">AI Hub</h3>
                    <p className="text-muted-foreground">Your personal wellness assistant</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Get personalized wellness summaries, 5 tailored recommendations, and AI-powered insights based on your data patterns.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Personalized Recommendations</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Wellness Summary</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">AI Assistant</span>
                  </div>
                </div>
              </div>

              {/* Nutrition Tracker */}
              <div className="flex flex-col space-y-4 p-6 border rounded-lg bg-card">
                <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Apple className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">AI Nutrition Tracker</h3>
                    <p className="text-muted-foreground">Smart food analysis and tracking</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Analyze food photos, scan nutrition labels, search food database, and track your daily nutrition with AI.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Photo Analysis</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Label Scanning</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Food Database</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Macro Tracking</span>
                  </div>
                </div>
              </div>

              {/* AI Meal Planner - NEW! */}
              <div className="flex flex-col space-y-4 p-6 border rounded-lg bg-card relative">
                <div className="absolute top-2 right-2">
                  <span className="px-2 py-1 bg-green-500 text-white text-xs rounded font-semibold">NEW</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <ChefHat className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">AI Meal Planner</h3>
                    <p className="text-muted-foreground">Personalized meal plans with recipes</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Generate complete meal plans based on your profile, preferences, and nutrition targets. Get recipes with instructions and shopping lists.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Recipe Generation</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Shopping Lists</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Cuisine Diversity</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Nutrition Targets</span>
                  </div>
                </div>
              </div>

              {/* Meditation & Mindfulness */}
              <div className="flex flex-col space-y-4 p-6 border rounded-lg bg-card">
                <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <BrainCircuit className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Meditation & Mindfulness</h3>
                    <p className="text-muted-foreground">Guided sessions with vocal instructions</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Access guided meditation sessions, breathing exercises, and mindfulness practices with vocal guidance.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Guided Meditation</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Breathing Exercises</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Vocal Instructions</span>
                  </div>
                </div>
              </div>

              {/* Sleep Tracking */}
              <div className="flex flex-col space-y-4 p-6 border rounded-lg bg-card">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <BedDouble className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                  <h3 className="text-xl font-bold">Sleep Analysis</h3>
                    <p className="text-muted-foreground">Comprehensive sleep monitoring</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Track sleep quality, duration, and patterns. Get insights to improve your rest and recovery.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Sleep Quality</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Duration Tracking</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Pattern Analysis</span>
                  </div>
                </div>
              </div>

              {/* Activity Tracking */}
              <div className="flex flex-col space-y-4 p-6 border rounded-lg bg-card">
                <div className="flex items-center space-x-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Activity className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Activity Tracking</h3>
                    <p className="text-muted-foreground">Monitor your daily activities</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Log various activities, track calories burned, and visualize your weekly activity patterns with charts.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Activity Logging</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Calorie Tracking</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Weekly Charts</span>
                  </div>
                </div>
              </div>

              {/* Water Log */}
              <div className="flex flex-col space-y-4 p-6 border rounded-lg bg-card">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Droplets className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Water Intake Tracking</h3>
                    <p className="text-muted-foreground">Stay hydrated with smart logging</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Track daily water intake with quick-add buttons, custom amounts, and comprehensive history with offline sync.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Quick Add</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Custom Amounts</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Offline Sync</span>
                  </div>
                </div>
              </div>

              {/* Mood Tracking */}
              <div className="flex flex-col space-y-4 p-6 border rounded-lg bg-card">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Smile className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Mood Tracking</h3>
                    <p className="text-muted-foreground">Monitor emotional well-being</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Log daily moods, emotions, and triggers to identify patterns and improve your mental health.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Emotion Logging</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Pattern Analysis</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Trigger Tracking</span>
                  </div>
                </div>
              </div>

              {/* Journal */}
              <div className="flex flex-col space-y-4 p-6 border rounded-lg bg-card">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <BookOpen className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Digital Journal</h3>
                    <p className="text-muted-foreground">Reflect and document your journey</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Write daily reflections, gratitude entries, and thoughts. Organize entries with tags and search functionality.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Daily Reflections</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Gratitude Entries</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Tag Organization</span>
                  </div>
                </div>
              </div>

              {/* Self Love */}
              <div className="flex flex-col space-y-4 p-6 border rounded-lg bg-card">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <HeartHandshake className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Self Love & Care</h3>
                    <p className="text-muted-foreground">Nurture your relationship with yourself</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Practice self-compassion, positive affirmations, and self-care activities to build a healthier relationship with yourself.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Affirmations</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Self-Care Activities</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Compassion Practice</span>
                  </div>
                </div>
              </div>

              {/* Wellness Report */}
              <div className="flex flex-col space-y-4 p-6 border rounded-lg bg-card">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <HeartPulse className="h-6 w-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold">Wellness Report</h3>
                    <p className="text-muted-foreground">Comprehensive health overview</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Get detailed insights into your overall wellness with comprehensive reports covering all tracked metrics.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Health Overview</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Progress Tracking</span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">Trend Analysis</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Features Section */}
            <div className="mt-16 p-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border">
              <div className="text-center space-y-6">
                <h3 className="text-2xl font-bold">Advanced AI-Powered Features</h3>
                <p className="text-muted-foreground max-w-3xl mx-auto">
                  Our platform leverages cutting-edge AI technology to provide personalized insights and recommendations tailored to your unique wellness journey.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 max-w-3xl mx-auto">
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Camera className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h4 className="font-semibold">Smart Food Analysis</h4>
                    <p className="text-sm text-muted-foreground">
                      Take a photo of your meal and get instant nutritional analysis, portion size estimation, and macro breakdown.
                    </p>
                  </div>
                  
                  <div className="text-center space-y-3">
                    <div className="flex justify-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <Target className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                    <h4 className="font-semibold">Personalized Goals</h4>
                    <p className="text-sm text-muted-foreground">
                      Get customized nutrition targets, macro recommendations, and wellness goals based on your unique profile and objectives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Tutorial Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  How It Works
              </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get started with our comprehensive wellness platform in just a few simple steps.
              </p>
              </div>
            </div>
            
            <div className="mx-auto grid max-w-6xl items-center gap-8 py-12 lg:grid-cols-2 lg:gap-12">
              {/* Step 1 */}
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                    1
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Create Your Profile
                    </h3>
                    <p className="text-muted-foreground">
                      Set up your personal information including age, weight, height, activity level, and wellness goals.
                    </p>
                  </div>
                </div>
                <div className="ml-16 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Personalized recommendations</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Accurate nutrition calculations</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Nutrition tracking & analysis</span>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                    2
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Brain className="h-5 w-5" />
                      Explore AI-Powered Features
                    </h3>
                    <p className="text-muted-foreground">
                      Use our AI Hub for personalized recommendations, nutrition analysis, and wellness insights.
                    </p>
                  </div>
                </div>
                <div className="ml-16 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Food photo analysis</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Nutrition label scanning</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Personalized meal plans</span>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                    3
                </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Apple className="h-5 w-5" />
                      Track Your Wellness
                    </h3>
                    <p className="text-muted-foreground">
                      Log your meals, water intake, activities, sleep, and mood to get comprehensive insights.
                    </p>
                  </div>
                </div>
                <div className="ml-16 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Nutrition tracking</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Water intake monitoring</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Activity and sleep logs</span>
                  </div>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                    4
                </div>
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Practice Mindfulness
                    </h3>
                    <p className="text-muted-foreground">
                      Engage with meditation sessions, breathing exercises, and journaling for mental wellness.
                    </p>
                  </div>
                </div>
                <div className="ml-16 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Guided meditation</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Breathing exercises</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Journaling and reflection</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Start Guide */}
            <div className="mt-16 p-8 bg-background rounded-lg border">
              <div className="text-center space-y-4">
                <h3 className="text-2xl font-bold">Quick Start Guide</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  New to wellness tracking? Follow our quick start guide to get the most out of your journey.
                </p>
                {/* Sign up button removed */}
              </div>
            </div>
          </div>
        </section>

        {/* Features Overview Section */}
        <section className="w-full py-12 md:py-24 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Complete Wellness Platform
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Access all our AI-powered wellness features, meditation sessions, and personalized insights completely free.
                </p>
              </div>

              {/* Features Card - Free Access */}
              <div className="max-w-lg w-full mt-8 mx-auto">
                <div className="flex flex-col p-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border-2 border-green-200 dark:border-green-800 shadow-2xl relative">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-green-500 text-white text-xs font-semibold px-4 py-1.5 rounded-full">
                      COMPLETELY FREE
                    </span>
                  </div>
                  
                  <div className="mb-6 text-center">
                    <h3 className="text-3xl font-bold mb-3 text-green-700 dark:text-green-400">Free Access</h3>
                    <div className="flex items-baseline justify-center gap-1 mb-4">
                      <span className="text-5xl font-bold text-green-600 dark:text-green-400">$0</span>
                      <span className="text-muted-foreground text-lg">/month</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Full access to all wellness features and tools
                    </p>
                  </div>
                  
                  <div className="space-y-3 mb-8 flex-1">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm">Unlimited meditation sessions (5-60 min)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm">AI-powered nutrition analysis</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm">Food photo recognition & analysis</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm font-semibold">AI-generated personalized meal plans 🆕</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm">Advanced breathing & mindfulness exercises</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm">Mood tracking & mental wellness tools</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm">Sleep analysis & activity tracking</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm">Comprehensive wellness reports</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm">AI Hub with personalized insights</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm">Digital journaling & self-love practices</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-sm">Community support & regular updates</span>
                    </div>
                  </div>
                  
                  {/* Sign up button removed */}
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 text-center max-w-2xl">
                <p className="text-sm text-muted-foreground mb-4">
                  All features include secure data encryption, regular updates, and access to our supportive community.
                </p>
                <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Secure data encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Regular feature updates</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
      </main>
      <footer className="flex flex-col gap-2 py-6 w-full shrink-0 md:flex-row md:justify-between">
        <nav className="flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:gap-6">
          <Link className="flex items-center gap-2 hover:underline" href="/about">
            About
          </Link>
          <Link className="flex items-center gap-2 hover:underline" href="/contact">
            Contact
          </Link>
          <Link className="flex items-center gap-2 hover:underline" href="/privacy">
            Privacy Policy
          </Link>
          <Link className="flex items-center gap-2 hover:underline" href="/terms">
            Terms of Service
          </Link>
        </nav>
        <div className="text-sm text-muted-foreground">
          © 2024 Find Your Inner Peace. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

