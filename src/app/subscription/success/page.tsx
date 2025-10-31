'use client';

import { Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

function SubscriptionSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Subscription Successful!</CardTitle>
          <CardDescription>
            Thank you for subscribing to our wellness platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {sessionId && (
            <p className="text-sm text-muted-foreground mb-4">
              Session ID: {sessionId}
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            Your subscription has been activated. You now have access to all premium features.
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={() => router.push('/dashboard')}
            className="w-full"
          >
            Go to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function SubscriptionSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <SubscriptionSuccessContent />
    </Suspense>
  );
}

