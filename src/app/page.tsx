import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Moon, Activity, Quote, ArrowRight, CheckCircle, Star, Users, Zap, Shield } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center gap-2" href="/">
          <Heart className="h-6 w-6 text-primary fill-none stroke-2" />
          <span className="text-foreground font-semibold text-sm sm:text-base">Find Your Inner Peace</span>
        </Link>
        <nav className="ml-auto flex gap-1 sm:gap-2">
          <Link href="/auth/sign-in">
            <Button variant="outline" size="sm" className="text-xs sm:text-sm">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button size="sm" className="text-xs sm:text-sm">
              Sign Up
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
                  <Link href="/auth/sign-up">
                    <Button size="lg" className="w-full sm:w-auto">
                      Start Your Journey
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/auth/sign-up">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto">
                      Get Started Free
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
                  Features
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover the tools and insights you need to find your inner peace and improve your well-being.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Heart className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Mood Tracking</h3>
                    <p className="text-muted-foreground">
                    Track your daily mood and emotions to understand patterns and triggers.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Moon className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Sleep Analysis</h3>
                    <p className="text-muted-foreground">
                    Monitor your sleep patterns and get personalized insights for better rest.
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Activity className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Activity Tracking</h3>
                    <p className="text-muted-foreground">
                    Log your daily activities and see how they impact your well-being.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Testimonials
              </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See what our users have to say about their journey to inner peace.
              </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Quote className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                <p className="text-muted-foreground">
                    "This app has completely transformed how I understand my mental health. The insights are incredible."
                </p>
                  <div className="space-y-1">
                    <p className="font-semibold">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">Wellness Coach</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Quote className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                <p className="text-muted-foreground">
                    "The sleep tracking feature helped me identify patterns I never knew existed."
                </p>
                  <div className="space-y-1">
                    <p className="font-semibold">Michael Chen</p>
                    <p className="text-sm text-muted-foreground">Software Engineer</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Quote className="h-6 w-6" />
                </div>
                <div className="space-y-2">
                <p className="text-muted-foreground">
                    "I love how the app helps me stay mindful throughout the day."
                </p>
                  <div className="space-y-1">
                    <p className="font-semibold">Emma Rodriguez</p>
                    <p className="text-sm text-muted-foreground">Teacher</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Get Started Today
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of users who have found their inner peace with our app.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/auth/sign-up">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started Free
                  </Button>
                </Link>
                <Link href="/auth/sign-in">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 py-6 w-full shrink-0 md:flex-row md:justify-end">
        <nav className="flex flex-col gap-2 text-sm text-muted-foreground md:flex-row md:gap-6">
          <Link className="flex items-center gap-2 hover:underline" href="/privacy">
            Privacy Policy
          </Link>
          <Link className="flex items-center gap-2 hover:underline" href="/terms">
            Terms of Service
          </Link>
        </nav>
      </footer>
    </div>
  );
}

