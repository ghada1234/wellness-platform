'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

interface AnalyticsProps {
  measurementId?: string;
}

function AnalyticsContent({ measurementId }: AnalyticsProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!measurementId) return;
    
    if (typeof window.gtag === 'function') {
      const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '');
      window.gtag('config', measurementId, {
        page_path: url,
      });
      
      // Track page view
      window.gtag('event', 'page_view', {
        page_path: url,
        page_title: document.title,
      });
      
      console.log('📊 Analytics tracked page:', url);
    }
  }, [measurementId, pathname, searchParams]);

  if (!measurementId) {
    console.warn('⚠️ Google Analytics Measurement ID not provided');
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}

// Export the main Analytics component with Suspense wrapper
export function Analytics({ measurementId }: AnalyticsProps) {
  if (!measurementId) return null;
  
  return (
    <Suspense fallback={null}>
      <AnalyticsContent measurementId={measurementId} />
    </Suspense>
  );
}

// Custom event tracking for meal planner
export function trackMealPlanGeneration(planDetails: {
  duration: number;
  hasPreferences: boolean;
  hasRestrictions: boolean;
}) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'meal_plan_generated', {
      event_category: 'AI Features',
      event_label: `${planDetails.duration}-day plan`,
      plan_duration: planDetails.duration,
      has_preferences: planDetails.hasPreferences,
      has_restrictions: planDetails.hasRestrictions,
    });
    console.log('📊 Tracked: Meal plan generated', planDetails);
  }
}

export function trackMealPlanSaved(planId: string, duration: number) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'meal_plan_saved', {
      event_category: 'User Engagement',
      event_label: 'Saved meal plan',
      plan_id: planId,
      plan_duration: duration,
    });
    console.log('📊 Tracked: Meal plan saved', planId);
  }
}

export function trackMealPlanExported(planId: string, exportType: 'pdf' | 'whatsapp') {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'meal_plan_exported', {
      event_category: 'User Engagement',
      event_label: `Export ${exportType}`,
      plan_id: planId,
      export_type: exportType,
    });
    console.log('📊 Tracked: Meal plan exported', exportType);
  }
}

export function trackProfileCompleted(hasPreferences: boolean) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'profile_completed', {
      event_category: 'User Engagement',
      event_label: 'Profile saved',
      has_preferences: hasPreferences,
    });
    console.log('📊 Tracked: Profile completed');
  }
}

