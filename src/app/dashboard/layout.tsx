
'use client';

import type { ReactNode } from 'react';
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Toaster } from '@/components/ui/toaster';
import withAuth from '@/components/withAuth';
import { DashboardHeader } from '@/components/dashboard/header';
// import { OnboardingModal } from '@/components/onboarding/onboarding-modal';

function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <SidebarNav />
      <SidebarInset>
        <DashboardHeader />
        {children}
      </SidebarInset>
      <Toaster />
      {/* <OnboardingModal /> */}
    </SidebarProvider>
  );
}

export default withAuth(DashboardLayout);
