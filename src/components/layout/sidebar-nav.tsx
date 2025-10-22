
'use client';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from '@/components/ui/sidebar';
import {
  LayoutDashboard,
  BrainCircuit,
  BedDouble,
  Activity,
  Apple,
  Smile,
  Wind,
  BookText,
  HeartHandshake,
  Bell,
  Sparkles,
  HeartPulse,
  Brain,
  Droplets,
  ChevronDown,
  ChevronRight,
  Palette,
  Target,
  UserCheck,
  Sparkle,
  Calendar,
  Video,
  Info,
  MessageSquare,
  BarChart3,
  ChefHat,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { useState } from 'react';

// Navigation categories
const navigationCategories = {
  overview: {
    label: 'Overview',
    items: [
      { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ]
  },
  mind: {
    label: 'Mind',
    items: [
      { href: '/dashboard/mind-practices', icon: BrainCircuit, label: 'Mind Practices' },
      { href: '/dashboard/journal', icon: BookText, label: 'Journal' },
    ]
  },
  body: {
    label: 'Body',
    items: [
      { href: '/dashboard/nutrition', icon: Apple, label: 'Nutrition' },
      { href: '/dashboard/nutrition/meal-planner', icon: ChefHat, label: 'AI Meal Planner' },
      { href: '/dashboard/water', icon: Droplets, label: 'Water Log' },
      { href: '/dashboard/activity', icon: Activity, label: 'Activity' },
      { href: '/dashboard/sleep', icon: BedDouble, label: 'Sleep' },
    ]
  },
  wellness: {
    label: 'Wellness',
    items: [
      { href: '/dashboard/mood', icon: Smile, label: 'Mood' },
      { href: '/dashboard/self-love', icon: HeartHandshake, label: 'Self Love' },
    ]
  },
  community: {
    label: 'Community',
    items: [
      { href: '/dashboard/whatsapp-groups', icon: MessageSquare, label: 'WhatsApp Groups' },
      { href: '/dashboard/hobbies', icon: Palette, label: 'Hobbies' },
      { href: '/dashboard/habits', icon: Target, label: 'Habits & Goals' },
    ]
  },
  ai: {
    label: 'AI & Insights',
    items: [
      { href: '/dashboard/ai-hub', icon: Sparkles, label: 'AI Hub' },
      { href: '/dashboard/wellness-report', icon: HeartPulse, label: 'Wellness Report' },
      { href: '/dashboard/analytics', icon: BarChart3, label: 'Analytics' },
    ]
  },
  info: {
    label: 'Info',
    items: [
      { href: '/about', icon: Info, label: 'About' },
      { href: '/contact', icon: MessageSquare, label: 'Contact' },
    ]
  },
  // Professional support section hidden as requested
  // professional: {
  //   label: 'Professional Support',
  //   items: [
  //     { href: '/dashboard/find-therapist', icon: UserCheck, label: 'Find Therapist' },
  //     { href: '/dashboard/find-healer', icon: Sparkle, label: 'Find Healer/Coach' },
  //     { href: '/dashboard/appointments', icon: Calendar, label: 'My Appointments' },
  //     { href: '/dashboard/teletherapy', icon: Video, label: 'Teletherapy' },
  //   ]
  // }
};

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <>
      <Sidebar>
        <SidebarHeader>
          <Link href="/">
            <Logo />
          </Link>
        </SidebarHeader>
        <SidebarContent className="p-2 overflow-y-auto">
          {Object.entries(navigationCategories).map(([categoryKey, category]) => (
            <SidebarGroup key={categoryKey}>
              <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {category.label}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {category.items.map((item) => (
                    <SidebarMenuItem key={item.label}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        tooltip={item.label}
                      >
                        <a href={item.href}>
                          <item.icon />
                          <span>{item.label}</span>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter className="p-2"></SidebarFooter>
      </Sidebar>
    </>
  );
}
