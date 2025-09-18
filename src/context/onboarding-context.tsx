'use client';

import * as React from 'react';
import { useFirestore } from '@/hooks/use-firestore';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  order: number;
}

interface OnboardingContextType {
  steps: OnboardingStep[];
  currentStep: number;
  isOnboardingComplete: boolean;
  completeStep: (stepId: string) => Promise<void>;
  skipOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
  loading: boolean;
}

const defaultSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Find Your Inner Peace!',
    description: 'Your personal wellness companion for a healthier, happier life.',
    completed: false,
    order: 1
  },
  {
    id: 'profile-setup',
    title: 'Set Up Your Personal Information',
    description: 'Tell us about yourself to personalize your wellness journey.',
    completed: false,
    order: 2
  },
  {
    id: 'first-meditation',
    title: 'Try Your First Meditation',
    description: 'Start with a 5-minute guided meditation to relax and center yourself.',
    completed: false,
    order: 3
  },
  {
    id: 'log-mood',
    title: 'Log Your Mood',
    description: 'Track how you\'re feeling to better understand your emotional patterns.',
    completed: false,
    order: 4
  },
  {
    id: 'set-goals',
    title: 'Set Your Goals',
    description: 'Define what wellness means to you and set achievable targets.',
    completed: false,
    order: 5
  },
  {
    id: 'explore-features',
    title: 'Explore Features',
    description: 'Discover all the tools available to support your wellness journey.',
    completed: false,
    order: 6
  }
];

const OnboardingContext = React.createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: onboardingData, loading, addDocument, updateDocument } = useFirestore<{ steps: OnboardingStep[], completed: boolean }>('onboarding');

  const steps = React.useMemo(() => {
    if (onboardingData && onboardingData.length > 0) {
      return onboardingData[0].steps || defaultSteps;
    }
    return defaultSteps;
  }, [onboardingData]);

  const currentStep = React.useMemo(() => {
    const incompleteStep = steps.find(step => !step.completed);
    return incompleteStep ? incompleteStep.order - 1 : steps.length;
  }, [steps]);

  const isOnboardingComplete = React.useMemo(() => {
    return steps.every(step => step.completed);
  }, [steps]);

  const completeStep = async (stepId: string) => {
    const updatedSteps = steps.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    );

    if (onboardingData && onboardingData.length > 0) {
      await updateDocument(onboardingData[0].id, { steps: updatedSteps });
    } else {
      await addDocument({ steps: updatedSteps, completed: false });
    }
  };

  const skipOnboarding = async () => {
    const completedSteps = steps.map(step => ({ ...step, completed: true }));
    
    if (onboardingData && onboardingData.length > 0) {
      await updateDocument(onboardingData[0].id, { steps: completedSteps, completed: true });
    } else {
      await addDocument({ steps: completedSteps, completed: true });
    }
  };

  const resetOnboarding = async () => {
    if (onboardingData && onboardingData.length > 0) {
      await updateDocument(onboardingData[0].id, { steps: defaultSteps, completed: false });
    } else {
      await addDocument({ steps: defaultSteps, completed: false });
    }
  };

  const value = {
    steps,
    currentStep,
    isOnboardingComplete,
    completeStep,
    skipOnboarding,
    resetOnboarding,
    loading
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = React.useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

import * as React from 'react';
import { useFirestore } from '@/hooks/use-firestore';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  order: number;
}

interface OnboardingContextType {
  steps: OnboardingStep[];
  currentStep: number;
  isOnboardingComplete: boolean;
  completeStep: (stepId: string) => Promise<void>;
  skipOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
  loading: boolean;
}

const defaultSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Find Your Inner Peace!',
    description: 'Your personal wellness companion for a healthier, happier life.',
    completed: false,
    order: 1
  },
  {
    id: 'profile-setup',
    title: 'Set Up Your Personal Information',
    description: 'Tell us about yourself to personalize your wellness journey.',
    completed: false,
    order: 2
  },
  {
    id: 'first-meditation',
    title: 'Try Your First Meditation',
    description: 'Start with a 5-minute guided meditation to relax and center yourself.',
    completed: false,
    order: 3
  },
  {
    id: 'log-mood',
    title: 'Log Your Mood',
    description: 'Track how you\'re feeling to better understand your emotional patterns.',
    completed: false,
    order: 4
  },
  {
    id: 'set-goals',
    title: 'Set Your Goals',
    description: 'Define what wellness means to you and set achievable targets.',
    completed: false,
    order: 5
  },
  {
    id: 'explore-features',
    title: 'Explore Features',
    description: 'Discover all the tools available to support your wellness journey.',
    completed: false,
    order: 6
  }
];

const OnboardingContext = React.createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: onboardingData, loading, addDocument, updateDocument } = useFirestore<{ steps: OnboardingStep[], completed: boolean }>('onboarding');

  const steps = React.useMemo(() => {
    if (onboardingData && onboardingData.length > 0) {
      return onboardingData[0].steps || defaultSteps;
    }
    return defaultSteps;
  }, [onboardingData]);

  const currentStep = React.useMemo(() => {
    const incompleteStep = steps.find(step => !step.completed);
    return incompleteStep ? incompleteStep.order - 1 : steps.length;
  }, [steps]);

  const isOnboardingComplete = React.useMemo(() => {
    return steps.every(step => step.completed);
  }, [steps]);

  const completeStep = async (stepId: string) => {
    const updatedSteps = steps.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    );

    if (onboardingData && onboardingData.length > 0) {
      await updateDocument(onboardingData[0].id, { steps: updatedSteps });
    } else {
      await addDocument({ steps: updatedSteps, completed: false });
    }
  };

  const skipOnboarding = async () => {
    const completedSteps = steps.map(step => ({ ...step, completed: true }));
    
    if (onboardingData && onboardingData.length > 0) {
      await updateDocument(onboardingData[0].id, { steps: completedSteps, completed: true });
    } else {
      await addDocument({ steps: completedSteps, completed: true });
    }
  };

  const resetOnboarding = async () => {
    if (onboardingData && onboardingData.length > 0) {
      await updateDocument(onboardingData[0].id, { steps: defaultSteps, completed: false });
    } else {
      await addDocument({ steps: defaultSteps, completed: false });
    }
  };

  const value = {
    steps,
    currentStep,
    isOnboardingComplete,
    completeStep,
    skipOnboarding,
    resetOnboarding,
    loading
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = React.useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};





import * as React from 'react';
import { useFirestore } from '@/hooks/use-firestore';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  order: number;
}

interface OnboardingContextType {
  steps: OnboardingStep[];
  currentStep: number;
  isOnboardingComplete: boolean;
  completeStep: (stepId: string) => Promise<void>;
  skipOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
  loading: boolean;
}

const defaultSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Find Your Inner Peace!',
    description: 'Your personal wellness companion for a healthier, happier life.',
    completed: false,
    order: 1
  },
  {
    id: 'profile-setup',
    title: 'Set Up Your Personal Information',
    description: 'Tell us about yourself to personalize your wellness journey.',
    completed: false,
    order: 2
  },
  {
    id: 'first-meditation',
    title: 'Try Your First Meditation',
    description: 'Start with a 5-minute guided meditation to relax and center yourself.',
    completed: false,
    order: 3
  },
  {
    id: 'log-mood',
    title: 'Log Your Mood',
    description: 'Track how you\'re feeling to better understand your emotional patterns.',
    completed: false,
    order: 4
  },
  {
    id: 'set-goals',
    title: 'Set Your Goals',
    description: 'Define what wellness means to you and set achievable targets.',
    completed: false,
    order: 5
  },
  {
    id: 'explore-features',
    title: 'Explore Features',
    description: 'Discover all the tools available to support your wellness journey.',
    completed: false,
    order: 6
  }
];

const OnboardingContext = React.createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: onboardingData, loading, addDocument, updateDocument } = useFirestore<{ steps: OnboardingStep[], completed: boolean }>('onboarding');

  const steps = React.useMemo(() => {
    if (onboardingData && onboardingData.length > 0) {
      return onboardingData[0].steps || defaultSteps;
    }
    return defaultSteps;
  }, [onboardingData]);

  const currentStep = React.useMemo(() => {
    const incompleteStep = steps.find(step => !step.completed);
    return incompleteStep ? incompleteStep.order - 1 : steps.length;
  }, [steps]);

  const isOnboardingComplete = React.useMemo(() => {
    return steps.every(step => step.completed);
  }, [steps]);

  const completeStep = async (stepId: string) => {
    const updatedSteps = steps.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    );

    if (onboardingData && onboardingData.length > 0) {
      await updateDocument(onboardingData[0].id, { steps: updatedSteps });
    } else {
      await addDocument({ steps: updatedSteps, completed: false });
    }
  };

  const skipOnboarding = async () => {
    const completedSteps = steps.map(step => ({ ...step, completed: true }));
    
    if (onboardingData && onboardingData.length > 0) {
      await updateDocument(onboardingData[0].id, { steps: completedSteps, completed: true });
    } else {
      await addDocument({ steps: completedSteps, completed: true });
    }
  };

  const resetOnboarding = async () => {
    if (onboardingData && onboardingData.length > 0) {
      await updateDocument(onboardingData[0].id, { steps: defaultSteps, completed: false });
    } else {
      await addDocument({ steps: defaultSteps, completed: false });
    }
  };

  const value = {
    steps,
    currentStep,
    isOnboardingComplete,
    completeStep,
    skipOnboarding,
    resetOnboarding,
    loading
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = React.useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

import * as React from 'react';
import { useFirestore } from '@/hooks/use-firestore';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  order: number;
}

interface OnboardingContextType {
  steps: OnboardingStep[];
  currentStep: number;
  isOnboardingComplete: boolean;
  completeStep: (stepId: string) => Promise<void>;
  skipOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
  loading: boolean;
}

const defaultSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Find Your Inner Peace!',
    description: 'Your personal wellness companion for a healthier, happier life.',
    completed: false,
    order: 1
  },
  {
    id: 'profile-setup',
    title: 'Set Up Your Personal Information',
    description: 'Tell us about yourself to personalize your wellness journey.',
    completed: false,
    order: 2
  },
  {
    id: 'first-meditation',
    title: 'Try Your First Meditation',
    description: 'Start with a 5-minute guided meditation to relax and center yourself.',
    completed: false,
    order: 3
  },
  {
    id: 'log-mood',
    title: 'Log Your Mood',
    description: 'Track how you\'re feeling to better understand your emotional patterns.',
    completed: false,
    order: 4
  },
  {
    id: 'set-goals',
    title: 'Set Your Goals',
    description: 'Define what wellness means to you and set achievable targets.',
    completed: false,
    order: 5
  },
  {
    id: 'explore-features',
    title: 'Explore Features',
    description: 'Discover all the tools available to support your wellness journey.',
    completed: false,
    order: 6
  }
];

const OnboardingContext = React.createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: onboardingData, loading, addDocument, updateDocument } = useFirestore<{ steps: OnboardingStep[], completed: boolean }>('onboarding');

  const steps = React.useMemo(() => {
    if (onboardingData && onboardingData.length > 0) {
      return onboardingData[0].steps || defaultSteps;
    }
    return defaultSteps;
  }, [onboardingData]);

  const currentStep = React.useMemo(() => {
    const incompleteStep = steps.find(step => !step.completed);
    return incompleteStep ? incompleteStep.order - 1 : steps.length;
  }, [steps]);

  const isOnboardingComplete = React.useMemo(() => {
    return steps.every(step => step.completed);
  }, [steps]);

  const completeStep = async (stepId: string) => {
    const updatedSteps = steps.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    );

    if (onboardingData && onboardingData.length > 0) {
      await updateDocument(onboardingData[0].id, { steps: updatedSteps });
    } else {
      await addDocument({ steps: updatedSteps, completed: false });
    }
  };

  const skipOnboarding = async () => {
    const completedSteps = steps.map(step => ({ ...step, completed: true }));
    
    if (onboardingData && onboardingData.length > 0) {
      await updateDocument(onboardingData[0].id, { steps: completedSteps, completed: true });
    } else {
      await addDocument({ steps: completedSteps, completed: true });
    }
  };

  const resetOnboarding = async () => {
    if (onboardingData && onboardingData.length > 0) {
      await updateDocument(onboardingData[0].id, { steps: defaultSteps, completed: false });
    } else {
      await addDocument({ steps: defaultSteps, completed: false });
    }
  };

  const value = {
    steps,
    currentStep,
    isOnboardingComplete,
    completeStep,
    skipOnboarding,
    resetOnboarding,
    loading
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = React.useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};





import * as React from 'react';
import { useFirestore } from '@/hooks/use-firestore';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  order: number;
}

interface OnboardingContextType {
  steps: OnboardingStep[];
  currentStep: number;
  isOnboardingComplete: boolean;
  completeStep: (stepId: string) => Promise<void>;
  skipOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
  loading: boolean;
}

const defaultSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Find Your Inner Peace!',
    description: 'Your personal wellness companion for a healthier, happier life.',
    completed: false,
    order: 1
  },
  {
    id: 'profile-setup',
    title: 'Set Up Your Personal Information',
    description: 'Tell us about yourself to personalize your wellness journey.',
    completed: false,
    order: 2
  },
  {
    id: 'first-meditation',
    title: 'Try Your First Meditation',
    description: 'Start with a 5-minute guided meditation to relax and center yourself.',
    completed: false,
    order: 3
  },
  {
    id: 'log-mood',
    title: 'Log Your Mood',
    description: 'Track how you\'re feeling to better understand your emotional patterns.',
    completed: false,
    order: 4
  },
  {
    id: 'set-goals',
    title: 'Set Your Goals',
    description: 'Define what wellness means to you and set achievable targets.',
    completed: false,
    order: 5
  },
  {
    id: 'explore-features',
    title: 'Explore Features',
    description: 'Discover all the tools available to support your wellness journey.',
    completed: false,
    order: 6
  }
];

const OnboardingContext = React.createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: onboardingData, loading, addDocument, updateDocument } = useFirestore<{ steps: OnboardingStep[], completed: boolean }>('onboarding');

  const steps = React.useMemo(() => {
    if (onboardingData && onboardingData.length > 0) {
      return onboardingData[0].steps || defaultSteps;
    }
    return defaultSteps;
  }, [onboardingData]);

  const currentStep = React.useMemo(() => {
    const incompleteStep = steps.find(step => !step.completed);
    return incompleteStep ? incompleteStep.order - 1 : steps.length;
  }, [steps]);

  const isOnboardingComplete = React.useMemo(() => {
    return steps.every(step => step.completed);
  }, [steps]);

  const completeStep = async (stepId: string) => {
    const updatedSteps = steps.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    );

    if (onboardingData && onboardingData.length > 0) {
      await updateDocument(onboardingData[0].id, { steps: updatedSteps });
    } else {
      await addDocument({ steps: updatedSteps, completed: false });
    }
  };

  const skipOnboarding = async () => {
    const completedSteps = steps.map(step => ({ ...step, completed: true }));
    
    if (onboardingData && onboardingData.length > 0) {
      await updateDocument(onboardingData[0].id, { steps: completedSteps, completed: true });
    } else {
      await addDocument({ steps: completedSteps, completed: true });
    }
  };

  const resetOnboarding = async () => {
    if (onboardingData && onboardingData.length > 0) {
      await updateDocument(onboardingData[0].id, { steps: defaultSteps, completed: false });
    } else {
      await addDocument({ steps: defaultSteps, completed: false });
    }
  };

  const value = {
    steps,
    currentStep,
    isOnboardingComplete,
    completeStep,
    skipOnboarding,
    resetOnboarding,
    loading
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = React.useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

import * as React from 'react';
import { useFirestore } from '@/hooks/use-firestore';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  order: number;
}

interface OnboardingContextType {
  steps: OnboardingStep[];
  currentStep: number;
  isOnboardingComplete: boolean;
  completeStep: (stepId: string) => Promise<void>;
  skipOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
  loading: boolean;
}

const defaultSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Find Your Inner Peace!',
    description: 'Your personal wellness companion for a healthier, happier life.',
    completed: false,
    order: 1
  },
  {
    id: 'profile-setup',
    title: 'Set Up Your Personal Information',
    description: 'Tell us about yourself to personalize your wellness journey.',
    completed: false,
    order: 2
  },
  {
    id: 'first-meditation',
    title: 'Try Your First Meditation',
    description: 'Start with a 5-minute guided meditation to relax and center yourself.',
    completed: false,
    order: 3
  },
  {
    id: 'log-mood',
    title: 'Log Your Mood',
    description: 'Track how you\'re feeling to better understand your emotional patterns.',
    completed: false,
    order: 4
  },
  {
    id: 'set-goals',
    title: 'Set Your Goals',
    description: 'Define what wellness means to you and set achievable targets.',
    completed: false,
    order: 5
  },
  {
    id: 'explore-features',
    title: 'Explore Features',
    description: 'Discover all the tools available to support your wellness journey.',
    completed: false,
    order: 6
  }
];

const OnboardingContext = React.createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: onboardingData, loading, addDocument, updateDocument } = useFirestore<{ steps: OnboardingStep[], completed: boolean }>('onboarding');

  const steps = React.useMemo(() => {
    if (onboardingData && onboardingData.length > 0) {
      return onboardingData[0].steps || defaultSteps;
    }
    return defaultSteps;
  }, [onboardingData]);

  const currentStep = React.useMemo(() => {
    const incompleteStep = steps.find(step => !step.completed);
    return incompleteStep ? incompleteStep.order - 1 : steps.length;
  }, [steps]);

  const isOnboardingComplete = React.useMemo(() => {
    return steps.every(step => step.completed);
  }, [steps]);

  const completeStep = async (stepId: string) => {
    const updatedSteps = steps.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    );

    if (onboardingData && onboardingData.length > 0) {
      await updateDocument(onboardingData[0].id, { steps: updatedSteps });
    } else {
      await addDocument({ steps: updatedSteps, completed: false });
    }
  };

  const skipOnboarding = async () => {
    const completedSteps = steps.map(step => ({ ...step, completed: true }));
    
    if (onboardingData && onboardingData.length > 0) {
      await updateDocument(onboardingData[0].id, { steps: completedSteps, completed: true });
    } else {
      await addDocument({ steps: completedSteps, completed: true });
    }
  };

  const resetOnboarding = async () => {
    if (onboardingData && onboardingData.length > 0) {
      await updateDocument(onboardingData[0].id, { steps: defaultSteps, completed: false });
    } else {
      await addDocument({ steps: defaultSteps, completed: false });
    }
  };

  const value = {
    steps,
    currentStep,
    isOnboardingComplete,
    completeStep,
    skipOnboarding,
    resetOnboarding,
    loading
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = React.useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};





import * as React from 'react';
import { useFirestore } from '@/hooks/use-firestore';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  order: number;
}

interface OnboardingContextType {
  steps: OnboardingStep[];
  currentStep: number;
  isOnboardingComplete: boolean;
  completeStep: (stepId: string) => Promise<void>;
  skipOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
  loading: boolean;
}

const defaultSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Find Your Inner Peace!',
    description: 'Your personal wellness companion for a healthier, happier life.',
    completed: false,
    order: 1
  },
  {
    id: 'profile-setup',
    title: 'Set Up Your Personal Information',
    description: 'Tell us about yourself to personalize your wellness journey.',
    completed: false,
    order: 2
  },
  {
    id: 'first-meditation',
    title: 'Try Your First Meditation',
    description: 'Start with a 5-minute guided meditation to relax and center yourself.',
    completed: false,
    order: 3
  },
  {
    id: 'log-mood',
    title: 'Log Your Mood',
    description: 'Track how you\'re feeling to better understand your emotional patterns.',
    completed: false,
    order: 4
  },
  {
    id: 'set-goals',
    title: 'Set Your Goals',
    description: 'Define what wellness means to you and set achievable targets.',
    completed: false,
    order: 5
  },
  {
    id: 'explore-features',
    title: 'Explore Features',
    description: 'Discover all the tools available to support your wellness journey.',
    completed: false,
    order: 6
  }
];

const OnboardingContext = React.createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: onboardingData, loading, addDocument, updateDocument } = useFirestore<{ steps: OnboardingStep[], completed: boolean }>('onboarding');

  const steps = React.useMemo(() => {
    if (onboardingData && onboardingData.length > 0) {
      return onboardingData[0].steps || defaultSteps;
    }
    return defaultSteps;
  }, [onboardingData]);

  const currentStep = React.useMemo(() => {
    const incompleteStep = steps.find(step => !step.completed);
    return incompleteStep ? incompleteStep.order - 1 : steps.length;
  }, [steps]);

  const isOnboardingComplete = React.useMemo(() => {
    return steps.every(step => step.completed);
  }, [steps]);

  const completeStep = async (stepId: string) => {
    const updatedSteps = steps.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    );

    if (onboardingData && onboardingData.length > 0) {
      await updateDocument(onboardingData[0].id, { steps: updatedSteps });
    } else {
      await addDocument({ steps: updatedSteps, completed: false });
    }
  };

  const skipOnboarding = async () => {
    const completedSteps = steps.map(step => ({ ...step, completed: true }));
    
    if (onboardingData && onboardingData.length > 0) {
      await updateDocument(onboardingData[0].id, { steps: completedSteps, completed: true });
    } else {
      await addDocument({ steps: completedSteps, completed: true });
    }
  };

  const resetOnboarding = async () => {
    if (onboardingData && onboardingData.length > 0) {
      await updateDocument(onboardingData[0].id, { steps: defaultSteps, completed: false });
    } else {
      await addDocument({ steps: defaultSteps, completed: false });
    }
  };

  const value = {
    steps,
    currentStep,
    isOnboardingComplete,
    completeStep,
    skipOnboarding,
    resetOnboarding,
    loading
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = React.useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};

import * as React from 'react';
import { useFirestore } from '@/hooks/use-firestore';

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  order: number;
}

interface OnboardingContextType {
  steps: OnboardingStep[];
  currentStep: number;
  isOnboardingComplete: boolean;
  completeStep: (stepId: string) => Promise<void>;
  skipOnboarding: () => Promise<void>;
  resetOnboarding: () => Promise<void>;
  loading: boolean;
}

const defaultSteps: OnboardingStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Find Your Inner Peace!',
    description: 'Your personal wellness companion for a healthier, happier life.',
    completed: false,
    order: 1
  },
  {
    id: 'profile-setup',
    title: 'Set Up Your Personal Information',
    description: 'Tell us about yourself to personalize your wellness journey.',
    completed: false,
    order: 2
  },
  {
    id: 'first-meditation',
    title: 'Try Your First Meditation',
    description: 'Start with a 5-minute guided meditation to relax and center yourself.',
    completed: false,
    order: 3
  },
  {
    id: 'log-mood',
    title: 'Log Your Mood',
    description: 'Track how you\'re feeling to better understand your emotional patterns.',
    completed: false,
    order: 4
  },
  {
    id: 'set-goals',
    title: 'Set Your Goals',
    description: 'Define what wellness means to you and set achievable targets.',
    completed: false,
    order: 5
  },
  {
    id: 'explore-features',
    title: 'Explore Features',
    description: 'Discover all the tools available to support your wellness journey.',
    completed: false,
    order: 6
  }
];

const OnboardingContext = React.createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: onboardingData, loading, addDocument, updateDocument } = useFirestore<{ steps: OnboardingStep[], completed: boolean }>('onboarding');

  const steps = React.useMemo(() => {
    if (onboardingData && onboardingData.length > 0) {
      return onboardingData[0].steps || defaultSteps;
    }
    return defaultSteps;
  }, [onboardingData]);

  const currentStep = React.useMemo(() => {
    const incompleteStep = steps.find(step => !step.completed);
    return incompleteStep ? incompleteStep.order - 1 : steps.length;
  }, [steps]);

  const isOnboardingComplete = React.useMemo(() => {
    return steps.every(step => step.completed);
  }, [steps]);

  const completeStep = async (stepId: string) => {
    const updatedSteps = steps.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    );

    if (onboardingData && onboardingData.length > 0) {
      await updateDocument(onboardingData[0].id, { steps: updatedSteps });
    } else {
      await addDocument({ steps: updatedSteps, completed: false });
    }
  };

  const skipOnboarding = async () => {
    const completedSteps = steps.map(step => ({ ...step, completed: true }));
    
    if (onboardingData && onboardingData.length > 0) {
      await updateDocument(onboardingData[0].id, { steps: completedSteps, completed: true });
    } else {
      await addDocument({ steps: completedSteps, completed: true });
    }
  };

  const resetOnboarding = async () => {
    if (onboardingData && onboardingData.length > 0) {
      await updateDocument(onboardingData[0].id, { steps: defaultSteps, completed: false });
    } else {
      await addDocument({ steps: defaultSteps, completed: false });
    }
  };

  const value = {
    steps,
    currentStep,
    isOnboardingComplete,
    completeStep,
    skipOnboarding,
    resetOnboarding,
    loading
  };

  return (
    <OnboardingContext.Provider value={value}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = React.useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};
























