'use client';

import { AuthProvider } from '@/context/auth-context';
import { NotificationsProvider } from '@/context/notifications-context';
// import { OnboardingProvider } from '@/context/onboarding-context';
import { queryClient } from '@/lib/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import { Analytics } from "@vercel/analytics/next";
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <NotificationsProvider>
          {children}
        </NotificationsProvider>
      </AuthProvider>
      {process.env.NODE_ENV === 'development' && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
      {/* <Analytics /> */}
    </QueryClientProvider>
  );
}

