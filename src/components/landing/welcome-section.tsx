'use client';

import * as React from 'react';
import { ArrowRight, Play, Users, Award, Shield, Heart, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const features = [
  {
    icon: Brain,
    title: 'Guided Meditation',
    description: 'Find peace with our library of guided meditation sessions',
    color: 'text-blue-600'
  },
  {
    icon: Heart,
    title: 'Mood Tracking',
    description: 'Understand your emotional patterns and improve your wellbeing',
    color: 'text-pink-600'
  },
  {
    icon: Zap,
    title: 'AI-Powered Insights',
    description: 'Get personalized recommendations based on your data',
    color: 'text-purple-600'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data is secure and never shared with third parties',
    color: 'text-green-600'
  }
];

const stats = [
  { number: 'New', label: 'Just Launched' },
  { number: '100%', label: 'Free to Use' },
  { number: 'AI-Powered', label: 'Smart Insights' },
  { number: '24/7', label: 'Available' }
];

const testimonials = [
  {
    name: 'Early Adopter',
    role: 'Beta Tester',
    content: 'This app has everything I need to track my wellness journey. The AI insights are incredibly helpful!',
    avatar: 'EA'
  },
  {
    name: 'Wellness Enthusiast',
    role: 'First User',
    content: 'I love how comprehensive this platform is. From meditation to mood tracking, it covers everything.',
    avatar: 'WE'
  },
  {
    name: 'Health Conscious',
    role: 'Pioneer User',
    content: 'The interface is beautiful and intuitive. Perfect for anyone starting their wellness journey.',
    avatar: 'HC'
  }
];

export function WelcomeSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 sm:py-16 md:py-20">
        <div className="text-center space-y-8">
          <Badge variant="secondary" className="px-4 py-2">
            🚀 Be among the first to experience the future of wellness
          </Badge>
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Find Your Inner Peace
            <br />
            Start Your Journey
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Discover a comprehensive wellness platform that combines meditation, mood tracking, 
            and AI-powered insights to help you live a healthier, happier life.
          </p>
          
          <div className="flex justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/auth/sign-up">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">Everything You Need for Wellness</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Our comprehensive platform provides all the tools you need to track, 
            understand, and improve your mental and physical wellbeing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">What Our Users Say</h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
              Be part of the wellness revolution - start your journey today
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold">Ready to Transform Your Life?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Be among the first to experience the future of wellness tracking. 
            Your healthier, happier self is just one click away.
          </p>
          <div className="flex justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <Link href="/auth/sign-up">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}





import * as React from 'react';
import { ArrowRight, Play, Users, Award, Shield, Heart, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const features = [
  {
    icon: Brain,
    title: 'Guided Meditation',
    description: 'Find peace with our library of guided meditation sessions',
    color: 'text-blue-600'
  },
  {
    icon: Heart,
    title: 'Mood Tracking',
    description: 'Understand your emotional patterns and improve your wellbeing',
    color: 'text-pink-600'
  },
  {
    icon: Zap,
    title: 'AI-Powered Insights',
    description: 'Get personalized recommendations based on your data',
    color: 'text-purple-600'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data is secure and never shared with third parties',
    color: 'text-green-600'
  }
];

const stats = [
  { number: 'New', label: 'Just Launched' },
  { number: '100%', label: 'Free to Use' },
  { number: 'AI-Powered', label: 'Smart Insights' },
  { number: '24/7', label: 'Available' }
];

const testimonials = [
  {
    name: 'Early Adopter',
    role: 'Beta Tester',
    content: 'This app has everything I need to track my wellness journey. The AI insights are incredibly helpful!',
    avatar: 'EA'
  },
  {
    name: 'Wellness Enthusiast',
    role: 'First User',
    content: 'I love how comprehensive this platform is. From meditation to mood tracking, it covers everything.',
    avatar: 'WE'
  },
  {
    name: 'Health Conscious',
    role: 'Pioneer User',
    content: 'The interface is beautiful and intuitive. Perfect for anyone starting their wellness journey.',
    avatar: 'HC'
  }
];

export function WelcomeSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <Badge variant="secondary" className="px-4 py-2">
            🚀 Be among the first to experience the future of wellness
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Find Your Inner Peace
            <br />
            Start Your Journey
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover a comprehensive wellness platform that combines meditation, mood tracking, 
            and AI-powered insights to help you live a healthier, happier life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/auth/sign-up">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">Everything You Need for Wellness</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools you need to track, 
            understand, and improve your mental and physical wellbeing.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">
              Be part of the wellness revolution - start your journey today
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold">Ready to Transform Your Life?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Be among the first to experience the future of wellness tracking. 
            Your healthier, happier self is just one click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <Link href="/auth/sign-up">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent border-white text-white hover:bg-white hover:text-primary">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}




import * as React from 'react';
import { ArrowRight, Play, Users, Award, Shield, Heart, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const features = [
  {
    icon: Brain,
    title: 'Guided Meditation',
    description: 'Find peace with our library of guided meditation sessions',
    color: 'text-blue-600'
  },
  {
    icon: Heart,
    title: 'Mood Tracking',
    description: 'Understand your emotional patterns and improve your wellbeing',
    color: 'text-pink-600'
  },
  {
    icon: Zap,
    title: 'AI-Powered Insights',
    description: 'Get personalized recommendations based on your data',
    color: 'text-purple-600'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data is secure and never shared with third parties',
    color: 'text-green-600'
  }
];

const stats = [
  { number: 'New', label: 'Just Launched' },
  { number: '100%', label: 'Free to Use' },
  { number: 'AI-Powered', label: 'Smart Insights' },
  { number: '24/7', label: 'Available' }
];

const testimonials = [
  {
    name: 'Early Adopter',
    role: 'Beta Tester',
    content: 'This app has everything I need to track my wellness journey. The AI insights are incredibly helpful!',
    avatar: 'EA'
  },
  {
    name: 'Wellness Enthusiast',
    role: 'First User',
    content: 'I love how comprehensive this platform is. From meditation to mood tracking, it covers everything.',
    avatar: 'WE'
  },
  {
    name: 'Health Conscious',
    role: 'Pioneer User',
    content: 'The interface is beautiful and intuitive. Perfect for anyone starting their wellness journey.',
    avatar: 'HC'
  }
];

export function WelcomeSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <Badge variant="secondary" className="px-4 py-2">
            🚀 Be among the first to experience the future of wellness
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Find Your Inner Peace
            <br />
            Start Your Journey
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover a comprehensive wellness platform that combines meditation, mood tracking, 
            and AI-powered insights to help you live a healthier, happier life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/auth/sign-up">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">Everything You Need for Wellness</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools you need to track, 
            understand, and improve your mental and physical wellbeing.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">
              Be part of the wellness revolution - start your journey today
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold">Ready to Transform Your Life?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Be among the first to experience the future of wellness tracking. 
            Your healthier, happier self is just one click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <Link href="/auth/sign-up">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent border-white text-white hover:bg-white hover:text-primary">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}




import * as React from 'react';
import { ArrowRight, Play, Users, Award, Shield, Heart, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const features = [
  {
    icon: Brain,
    title: 'Guided Meditation',
    description: 'Find peace with our library of guided meditation sessions',
    color: 'text-blue-600'
  },
  {
    icon: Heart,
    title: 'Mood Tracking',
    description: 'Understand your emotional patterns and improve your wellbeing',
    color: 'text-pink-600'
  },
  {
    icon: Zap,
    title: 'AI-Powered Insights',
    description: 'Get personalized recommendations based on your data',
    color: 'text-purple-600'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data is secure and never shared with third parties',
    color: 'text-green-600'
  }
];

const stats = [
  { number: 'New', label: 'Just Launched' },
  { number: '100%', label: 'Free to Use' },
  { number: 'AI-Powered', label: 'Smart Insights' },
  { number: '24/7', label: 'Available' }
];

const testimonials = [
  {
    name: 'Early Adopter',
    role: 'Beta Tester',
    content: 'This app has everything I need to track my wellness journey. The AI insights are incredibly helpful!',
    avatar: 'EA'
  },
  {
    name: 'Wellness Enthusiast',
    role: 'First User',
    content: 'I love how comprehensive this platform is. From meditation to mood tracking, it covers everything.',
    avatar: 'WE'
  },
  {
    name: 'Health Conscious',
    role: 'Pioneer User',
    content: 'The interface is beautiful and intuitive. Perfect for anyone starting their wellness journey.',
    avatar: 'HC'
  }
];

export function WelcomeSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <Badge variant="secondary" className="px-4 py-2">
            🚀 Be among the first to experience the future of wellness
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Find Your Inner Peace
            <br />
            Start Your Journey
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover a comprehensive wellness platform that combines meditation, mood tracking, 
            and AI-powered insights to help you live a healthier, happier life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/auth/sign-up">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">Everything You Need for Wellness</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools you need to track, 
            understand, and improve your mental and physical wellbeing.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">
              Be part of the wellness revolution - start your journey today
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold">Ready to Transform Your Life?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Be among the first to experience the future of wellness tracking. 
            Your healthier, happier self is just one click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <Link href="/auth/sign-up">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent border-white text-white hover:bg-white hover:text-primary">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}











'use client';


import * as React from 'react';
import { ArrowRight, Play, Users, Award, Shield, Heart, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const features = [
  {
    icon: Brain,
    title: 'Guided Meditation',
    description: 'Find peace with our library of guided meditation sessions',
    color: 'text-blue-600'
  },
  {
    icon: Heart,
    title: 'Mood Tracking',
    description: 'Understand your emotional patterns and improve your wellbeing',
    color: 'text-pink-600'
  },
  {
    icon: Zap,
    title: 'AI-Powered Insights',
    description: 'Get personalized recommendations based on your data',
    color: 'text-purple-600'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data is secure and never shared with third parties',
    color: 'text-green-600'
  }
];

const stats = [
  { number: 'New', label: 'Just Launched' },
  { number: '100%', label: 'Free to Use' },
  { number: 'AI-Powered', label: 'Smart Insights' },
  { number: '24/7', label: 'Available' }
];

const testimonials = [
  {
    name: 'Early Adopter',
    role: 'Beta Tester',
    content: 'This app has everything I need to track my wellness journey. The AI insights are incredibly helpful!',
    avatar: 'EA'
  },
  {
    name: 'Wellness Enthusiast',
    role: 'First User',
    content: 'I love how comprehensive this platform is. From meditation to mood tracking, it covers everything.',
    avatar: 'WE'
  },
  {
    name: 'Health Conscious',
    role: 'Pioneer User',
    content: 'The interface is beautiful and intuitive. Perfect for anyone starting their wellness journey.',
    avatar: 'HC'
  }
];

export function WelcomeSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <Badge variant="secondary" className="px-4 py-2">
            🚀 Be among the first to experience the future of wellness
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Find Your Inner Peace
            <br />
            Start Your Journey
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover a comprehensive wellness platform that combines meditation, mood tracking, 
            and AI-powered insights to help you live a healthier, happier life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/auth/sign-up">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">Everything You Need for Wellness</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools you need to track, 
            understand, and improve your mental and physical wellbeing.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">
              Be part of the wellness revolution - start your journey today
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold">Ready to Transform Your Life?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Be among the first to experience the future of wellness tracking. 
            Your healthier, happier self is just one click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <Link href="/auth/sign-up">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent border-white text-white hover:bg-white hover:text-primary">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}





import * as React from 'react';
import { ArrowRight, Play, Users, Award, Shield, Heart, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const features = [
  {
    icon: Brain,
    title: 'Guided Meditation',
    description: 'Find peace with our library of guided meditation sessions',
    color: 'text-blue-600'
  },
  {
    icon: Heart,
    title: 'Mood Tracking',
    description: 'Understand your emotional patterns and improve your wellbeing',
    color: 'text-pink-600'
  },
  {
    icon: Zap,
    title: 'AI-Powered Insights',
    description: 'Get personalized recommendations based on your data',
    color: 'text-purple-600'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data is secure and never shared with third parties',
    color: 'text-green-600'
  }
];

const stats = [
  { number: 'New', label: 'Just Launched' },
  { number: '100%', label: 'Free to Use' },
  { number: 'AI-Powered', label: 'Smart Insights' },
  { number: '24/7', label: 'Available' }
];

const testimonials = [
  {
    name: 'Early Adopter',
    role: 'Beta Tester',
    content: 'This app has everything I need to track my wellness journey. The AI insights are incredibly helpful!',
    avatar: 'EA'
  },
  {
    name: 'Wellness Enthusiast',
    role: 'First User',
    content: 'I love how comprehensive this platform is. From meditation to mood tracking, it covers everything.',
    avatar: 'WE'
  },
  {
    name: 'Health Conscious',
    role: 'Pioneer User',
    content: 'The interface is beautiful and intuitive. Perfect for anyone starting their wellness journey.',
    avatar: 'HC'
  }
];

export function WelcomeSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <Badge variant="secondary" className="px-4 py-2">
            🚀 Be among the first to experience the future of wellness
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Find Your Inner Peace
            <br />
            Start Your Journey
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover a comprehensive wellness platform that combines meditation, mood tracking, 
            and AI-powered insights to help you live a healthier, happier life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/auth/sign-up">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">Everything You Need for Wellness</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools you need to track, 
            understand, and improve your mental and physical wellbeing.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">
              Be part of the wellness revolution - start your journey today
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold">Ready to Transform Your Life?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Be among the first to experience the future of wellness tracking. 
            Your healthier, happier self is just one click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <Link href="/auth/sign-up">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent border-white text-white hover:bg-white hover:text-primary">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}




import * as React from 'react';
import { ArrowRight, Play, Users, Award, Shield, Heart, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const features = [
  {
    icon: Brain,
    title: 'Guided Meditation',
    description: 'Find peace with our library of guided meditation sessions',
    color: 'text-blue-600'
  },
  {
    icon: Heart,
    title: 'Mood Tracking',
    description: 'Understand your emotional patterns and improve your wellbeing',
    color: 'text-pink-600'
  },
  {
    icon: Zap,
    title: 'AI-Powered Insights',
    description: 'Get personalized recommendations based on your data',
    color: 'text-purple-600'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data is secure and never shared with third parties',
    color: 'text-green-600'
  }
];

const stats = [
  { number: 'New', label: 'Just Launched' },
  { number: '100%', label: 'Free to Use' },
  { number: 'AI-Powered', label: 'Smart Insights' },
  { number: '24/7', label: 'Available' }
];

const testimonials = [
  {
    name: 'Early Adopter',
    role: 'Beta Tester',
    content: 'This app has everything I need to track my wellness journey. The AI insights are incredibly helpful!',
    avatar: 'EA'
  },
  {
    name: 'Wellness Enthusiast',
    role: 'First User',
    content: 'I love how comprehensive this platform is. From meditation to mood tracking, it covers everything.',
    avatar: 'WE'
  },
  {
    name: 'Health Conscious',
    role: 'Pioneer User',
    content: 'The interface is beautiful and intuitive. Perfect for anyone starting their wellness journey.',
    avatar: 'HC'
  }
];

export function WelcomeSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <Badge variant="secondary" className="px-4 py-2">
            🚀 Be among the first to experience the future of wellness
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Find Your Inner Peace
            <br />
            Start Your Journey
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover a comprehensive wellness platform that combines meditation, mood tracking, 
            and AI-powered insights to help you live a healthier, happier life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/auth/sign-up">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">Everything You Need for Wellness</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools you need to track, 
            understand, and improve your mental and physical wellbeing.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">
              Be part of the wellness revolution - start your journey today
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold">Ready to Transform Your Life?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Be among the first to experience the future of wellness tracking. 
            Your healthier, happier self is just one click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <Link href="/auth/sign-up">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent border-white text-white hover:bg-white hover:text-primary">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}




import * as React from 'react';
import { ArrowRight, Play, Users, Award, Shield, Heart, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const features = [
  {
    icon: Brain,
    title: 'Guided Meditation',
    description: 'Find peace with our library of guided meditation sessions',
    color: 'text-blue-600'
  },
  {
    icon: Heart,
    title: 'Mood Tracking',
    description: 'Understand your emotional patterns and improve your wellbeing',
    color: 'text-pink-600'
  },
  {
    icon: Zap,
    title: 'AI-Powered Insights',
    description: 'Get personalized recommendations based on your data',
    color: 'text-purple-600'
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your data is secure and never shared with third parties',
    color: 'text-green-600'
  }
];

const stats = [
  { number: 'New', label: 'Just Launched' },
  { number: '100%', label: 'Free to Use' },
  { number: 'AI-Powered', label: 'Smart Insights' },
  { number: '24/7', label: 'Available' }
];

const testimonials = [
  {
    name: 'Early Adopter',
    role: 'Beta Tester',
    content: 'This app has everything I need to track my wellness journey. The AI insights are incredibly helpful!',
    avatar: 'EA'
  },
  {
    name: 'Wellness Enthusiast',
    role: 'First User',
    content: 'I love how comprehensive this platform is. From meditation to mood tracking, it covers everything.',
    avatar: 'WE'
  },
  {
    name: 'Health Conscious',
    role: 'Pioneer User',
    content: 'The interface is beautiful and intuitive. Perfect for anyone starting their wellness journey.',
    avatar: 'HC'
  }
];

export function WelcomeSection() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <Badge variant="secondary" className="px-4 py-2">
            🚀 Be among the first to experience the future of wellness
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Find Your Inner Peace
            <br />
            Start Your Journey
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover a comprehensive wellness platform that combines meditation, mood tracking, 
            and AI-powered insights to help you live a healthier, happier life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-6" asChild>
              <Link href="/auth/sign-up">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <Play className="mr-2 h-5 w-5" />
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">Everything You Need for Wellness</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Our comprehensive platform provides all the tools you need to track, 
            understand, and improve your mental and physical wellbeing.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className={`mx-auto w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">What Our Users Say</h2>
            <p className="text-xl text-muted-foreground">
              Be part of the wellness revolution - start your journey today
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
          <h2 className="text-4xl font-bold">Ready to Transform Your Life?</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Be among the first to experience the future of wellness tracking. 
            Your healthier, happier self is just one click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6" asChild>
              <Link href="/auth/sign-up">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent border-white text-white hover:bg-white hover:text-primary">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}










