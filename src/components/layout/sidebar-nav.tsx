
'use client';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
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
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/logo';
import Link from 'next/link';

const mainNav = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/meditation', icon: BrainCircuit, label: 'Meditation' },
  { href: '/dashboard/sleep', icon: BedDouble, label: 'Sleep' },
  { href: '/dashboard/activity', icon: Activity, label: 'Activity' },
  { href: '/dashboard/nutrition', icon: Apple, label: 'Nutrition' },
  { href: '/dashboard/mood', icon: Smile, label: 'Mood' },
  { href: '/dashboard/breathing', icon: Wind, label: 'Breathing' },
  { href: '/dashboard/journal', icon: BookText, label: 'Journal' },
];

const secondaryNav = [
  { href: '/dashboard/self-love', icon: HeartHandshake, label: 'Self Love' },
  { href: '/dashboard/mindfulness', icon: Brain, label: 'Mindfulness' },
  { href: '/dashboard/water', icon: Droplets, label: 'Water Log' },
  { href: '/dashboard/notifications', icon: Bell, label: 'Notifications' },
  { href: '/dashboard/ai-hub', icon: Sparkles, label: 'AI Hub' },
  {
    href: '/dashboard/wellness-report',
    icon: HeartPulse,
    label: 'Wellness Report',
  },
];

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
          <SidebarMenu>
            {mainNav.map((item) => (
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
          <SidebarMenu>
            {secondaryNav.map((item) => (
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
        </SidebarContent>
        <SidebarFooter className="p-2"></SidebarFooter>
      </Sidebar>
    </>
  );
}
