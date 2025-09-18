import { useNotifications } from '@/context/notifications-context';

export const createWelcomeNotifications = async (addNotification: any) => {
  const welcomeNotifications = [
    {
      title: 'Welcome to Find Your Inner Peace! 🎉',
      message: 'Thank you for joining us! Start your wellness journey by exploring our features.',
      type: 'success' as const,
      actionUrl: '/dashboard',
      actionText: 'Explore Dashboard'
    },
    {
      title: 'Complete Your Personal Information',
      message: 'Set up your personal information to get personalized recommendations and insights.',
      type: 'info' as const,
      actionUrl: '/dashboard/profile',
      actionText: 'Set Up Personal Information'
    },
    {
      title: 'Try Your First Meditation',
      message: 'Start with a 5-minute guided meditation to relax and center yourself.',
      type: 'info' as const,
      actionUrl: '/dashboard/meditation',
      actionText: 'Start Meditating'
    },
    {
      title: 'Track Your Mood',
      message: 'Log how you\'re feeling today to begin understanding your emotional patterns.',
      type: 'info' as const,
      actionUrl: '/dashboard/mood',
      actionText: 'Log Mood'
    },
    {
      title: 'Set Your Goals',
      message: 'Define what wellness means to you and set achievable targets for your journey.',
      type: 'info' as const,
      actionUrl: '/dashboard/profile',
      actionText: 'Set Goals'
    },
    {
      title: 'Explore AI Hub',
      message: 'Discover our AI-powered features for personalized wellness insights.',
      type: 'info' as const,
      actionUrl: '/dashboard/ai-hub',
      actionText: 'Visit AI Hub'
    }
  ];

  // Add notifications with a small delay between each to avoid overwhelming the user
  for (let i = 0; i < welcomeNotifications.length; i++) {
    setTimeout(async () => {
      await addNotification(welcomeNotifications[i]);
    }, i * 1000); // 1 second delay between each notification
  }
};

export const createDailyReminderNotifications = async (addNotification: any) => {
  const dailyReminders = [
    {
      title: 'Daily Check-in Reminder',
      message: 'Don\'t forget to log your mood and activities for today!',
      type: 'warning' as const,
      actionUrl: '/dashboard',
      actionText: 'Log Today'
    },
    {
      title: 'Hydration Reminder',
      message: 'Remember to drink water throughout the day for better health.',
      type: 'info' as const,
      actionUrl: '/dashboard/water',
      actionText: 'Log Water'
    },
    {
      title: 'Mindfulness Moment',
      message: 'Take a few minutes to practice mindfulness and reduce stress.',
      type: 'info' as const,
      actionUrl: '/dashboard/meditation',
      actionText: 'Meditate Now'
    }
  ];

  // Add one random daily reminder
  const randomReminder = dailyReminders[Math.floor(Math.random() * dailyReminders.length)];
  await addNotification(randomReminder);
};

export const createAchievementNotifications = async (addNotification: any) => {
  const achievements = [
    {
      title: 'First Steps! 🎯',
      message: 'Congratulations on completing your first wellness activity!',
      type: 'success' as const,
      actionUrl: '/dashboard/wellness-report',
      actionText: 'View Progress'
    },
    {
      title: 'Consistency Champion! 🏆',
      message: 'You\'ve been logging your activities for 3 days straight. Keep it up!',
      type: 'success' as const,
      actionUrl: '/dashboard',
      actionText: 'View Dashboard'
    },
    {
      title: 'Wellness Explorer! 🌟',
      message: 'You\'ve tried multiple features. You\'re on your way to better wellness!',
      type: 'success' as const,
      actionUrl: '/dashboard/wellness-report',
      actionText: 'See Insights'
    }
  ];

  // Add one random achievement
  const randomAchievement = achievements[Math.floor(Math.random() * achievements.length)];
  await addNotification(randomAchievement);
};

export const createTipNotifications = async (addNotification: any) => {
  const tips = [
    {
      title: 'Wellness Tip 💡',
      message: 'Regular meditation can reduce stress and improve focus. Try starting with just 5 minutes daily.',
      type: 'info' as const
    },
    {
      title: 'Health Tip 💡',
      message: 'Drinking water first thing in the morning helps kickstart your metabolism.',
      type: 'info' as const
    },
    {
      title: 'Mindfulness Tip 💡',
      message: 'Taking deep breaths throughout the day can help manage stress and anxiety.',
      type: 'info' as const
    },
    {
      title: 'Sleep Tip 💡',
      message: 'Maintaining a consistent sleep schedule improves both sleep quality and overall health.',
      type: 'info' as const
    },
    {
      title: 'Nutrition Tip 💡',
      message: 'Eating a balanced breakfast helps maintain energy levels throughout the day.',
      type: 'info' as const
    }
  ];

  // Add one random tip
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  await addNotification(randomTip);
};

export const createWelcomeNotifications = async (addNotification: any) => {
  const welcomeNotifications = [
    {
      title: 'Welcome to Find Your Inner Peace! 🎉',
      message: 'Thank you for joining us! Start your wellness journey by exploring our features.',
      type: 'success' as const,
      actionUrl: '/dashboard',
      actionText: 'Explore Dashboard'
    },
    {
      title: 'Complete Your Personal Information',
      message: 'Set up your personal information to get personalized recommendations and insights.',
      type: 'info' as const,
      actionUrl: '/dashboard/profile',
      actionText: 'Set Up Personal Information'
    },
    {
      title: 'Try Your First Meditation',
      message: 'Start with a 5-minute guided meditation to relax and center yourself.',
      type: 'info' as const,
      actionUrl: '/dashboard/meditation',
      actionText: 'Start Meditating'
    },
    {
      title: 'Track Your Mood',
      message: 'Log how you\'re feeling today to begin understanding your emotional patterns.',
      type: 'info' as const,
      actionUrl: '/dashboard/mood',
      actionText: 'Log Mood'
    },
    {
      title: 'Set Your Goals',
      message: 'Define what wellness means to you and set achievable targets for your journey.',
      type: 'info' as const,
      actionUrl: '/dashboard/profile',
      actionText: 'Set Goals'
    },
    {
      title: 'Explore AI Hub',
      message: 'Discover our AI-powered features for personalized wellness insights.',
      type: 'info' as const,
      actionUrl: '/dashboard/ai-hub',
      actionText: 'Visit AI Hub'
    }
  ];

  // Add notifications with a small delay between each to avoid overwhelming the user
  for (let i = 0; i < welcomeNotifications.length; i++) {
    setTimeout(async () => {
      await addNotification(welcomeNotifications[i]);
    }, i * 1000); // 1 second delay between each notification
  }
};

export const createDailyReminderNotifications = async (addNotification: any) => {
  const dailyReminders = [
    {
      title: 'Daily Check-in Reminder',
      message: 'Don\'t forget to log your mood and activities for today!',
      type: 'warning' as const,
      actionUrl: '/dashboard',
      actionText: 'Log Today'
    },
    {
      title: 'Hydration Reminder',
      message: 'Remember to drink water throughout the day for better health.',
      type: 'info' as const,
      actionUrl: '/dashboard/water',
      actionText: 'Log Water'
    },
    {
      title: 'Mindfulness Moment',
      message: 'Take a few minutes to practice mindfulness and reduce stress.',
      type: 'info' as const,
      actionUrl: '/dashboard/meditation',
      actionText: 'Meditate Now'
    }
  ];

  // Add one random daily reminder
  const randomReminder = dailyReminders[Math.floor(Math.random() * dailyReminders.length)];
  await addNotification(randomReminder);
};

export const createAchievementNotifications = async (addNotification: any) => {
  const achievements = [
    {
      title: 'First Steps! 🎯',
      message: 'Congratulations on completing your first wellness activity!',
      type: 'success' as const,
      actionUrl: '/dashboard/wellness-report',
      actionText: 'View Progress'
    },
    {
      title: 'Consistency Champion! 🏆',
      message: 'You\'ve been logging your activities for 3 days straight. Keep it up!',
      type: 'success' as const,
      actionUrl: '/dashboard',
      actionText: 'View Dashboard'
    },
    {
      title: 'Wellness Explorer! 🌟',
      message: 'You\'ve tried multiple features. You\'re on your way to better wellness!',
      type: 'success' as const,
      actionUrl: '/dashboard/wellness-report',
      actionText: 'See Insights'
    }
  ];

  // Add one random achievement
  const randomAchievement = achievements[Math.floor(Math.random() * achievements.length)];
  await addNotification(randomAchievement);
};

export const createTipNotifications = async (addNotification: any) => {
  const tips = [
    {
      title: 'Wellness Tip 💡',
      message: 'Regular meditation can reduce stress and improve focus. Try starting with just 5 minutes daily.',
      type: 'info' as const
    },
    {
      title: 'Health Tip 💡',
      message: 'Drinking water first thing in the morning helps kickstart your metabolism.',
      type: 'info' as const
    },
    {
      title: 'Mindfulness Tip 💡',
      message: 'Taking deep breaths throughout the day can help manage stress and anxiety.',
      type: 'info' as const
    },
    {
      title: 'Sleep Tip 💡',
      message: 'Maintaining a consistent sleep schedule improves both sleep quality and overall health.',
      type: 'info' as const
    },
    {
      title: 'Nutrition Tip 💡',
      message: 'Eating a balanced breakfast helps maintain energy levels throughout the day.',
      type: 'info' as const
    }
  ];

  // Add one random tip
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  await addNotification(randomTip);
};





export const createWelcomeNotifications = async (addNotification: any) => {
  const welcomeNotifications = [
    {
      title: 'Welcome to Find Your Inner Peace! 🎉',
      message: 'Thank you for joining us! Start your wellness journey by exploring our features.',
      type: 'success' as const,
      actionUrl: '/dashboard',
      actionText: 'Explore Dashboard'
    },
    {
      title: 'Complete Your Personal Information',
      message: 'Set up your personal information to get personalized recommendations and insights.',
      type: 'info' as const,
      actionUrl: '/dashboard/profile',
      actionText: 'Set Up Personal Information'
    },
    {
      title: 'Try Your First Meditation',
      message: 'Start with a 5-minute guided meditation to relax and center yourself.',
      type: 'info' as const,
      actionUrl: '/dashboard/meditation',
      actionText: 'Start Meditating'
    },
    {
      title: 'Track Your Mood',
      message: 'Log how you\'re feeling today to begin understanding your emotional patterns.',
      type: 'info' as const,
      actionUrl: '/dashboard/mood',
      actionText: 'Log Mood'
    },
    {
      title: 'Set Your Goals',
      message: 'Define what wellness means to you and set achievable targets for your journey.',
      type: 'info' as const,
      actionUrl: '/dashboard/profile',
      actionText: 'Set Goals'
    },
    {
      title: 'Explore AI Hub',
      message: 'Discover our AI-powered features for personalized wellness insights.',
      type: 'info' as const,
      actionUrl: '/dashboard/ai-hub',
      actionText: 'Visit AI Hub'
    }
  ];

  // Add notifications with a small delay between each to avoid overwhelming the user
  for (let i = 0; i < welcomeNotifications.length; i++) {
    setTimeout(async () => {
      await addNotification(welcomeNotifications[i]);
    }, i * 1000); // 1 second delay between each notification
  }
};

export const createDailyReminderNotifications = async (addNotification: any) => {
  const dailyReminders = [
    {
      title: 'Daily Check-in Reminder',
      message: 'Don\'t forget to log your mood and activities for today!',
      type: 'warning' as const,
      actionUrl: '/dashboard',
      actionText: 'Log Today'
    },
    {
      title: 'Hydration Reminder',
      message: 'Remember to drink water throughout the day for better health.',
      type: 'info' as const,
      actionUrl: '/dashboard/water',
      actionText: 'Log Water'
    },
    {
      title: 'Mindfulness Moment',
      message: 'Take a few minutes to practice mindfulness and reduce stress.',
      type: 'info' as const,
      actionUrl: '/dashboard/meditation',
      actionText: 'Meditate Now'
    }
  ];

  // Add one random daily reminder
  const randomReminder = dailyReminders[Math.floor(Math.random() * dailyReminders.length)];
  await addNotification(randomReminder);
};

export const createAchievementNotifications = async (addNotification: any) => {
  const achievements = [
    {
      title: 'First Steps! 🎯',
      message: 'Congratulations on completing your first wellness activity!',
      type: 'success' as const,
      actionUrl: '/dashboard/wellness-report',
      actionText: 'View Progress'
    },
    {
      title: 'Consistency Champion! 🏆',
      message: 'You\'ve been logging your activities for 3 days straight. Keep it up!',
      type: 'success' as const,
      actionUrl: '/dashboard',
      actionText: 'View Dashboard'
    },
    {
      title: 'Wellness Explorer! 🌟',
      message: 'You\'ve tried multiple features. You\'re on your way to better wellness!',
      type: 'success' as const,
      actionUrl: '/dashboard/wellness-report',
      actionText: 'See Insights'
    }
  ];

  // Add one random achievement
  const randomAchievement = achievements[Math.floor(Math.random() * achievements.length)];
  await addNotification(randomAchievement);
};

export const createTipNotifications = async (addNotification: any) => {
  const tips = [
    {
      title: 'Wellness Tip 💡',
      message: 'Regular meditation can reduce stress and improve focus. Try starting with just 5 minutes daily.',
      type: 'info' as const
    },
    {
      title: 'Health Tip 💡',
      message: 'Drinking water first thing in the morning helps kickstart your metabolism.',
      type: 'info' as const
    },
    {
      title: 'Mindfulness Tip 💡',
      message: 'Taking deep breaths throughout the day can help manage stress and anxiety.',
      type: 'info' as const
    },
    {
      title: 'Sleep Tip 💡',
      message: 'Maintaining a consistent sleep schedule improves both sleep quality and overall health.',
      type: 'info' as const
    },
    {
      title: 'Nutrition Tip 💡',
      message: 'Eating a balanced breakfast helps maintain energy levels throughout the day.',
      type: 'info' as const
    }
  ];

  // Add one random tip
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  await addNotification(randomTip);
};

export const createWelcomeNotifications = async (addNotification: any) => {
  const welcomeNotifications = [
    {
      title: 'Welcome to Find Your Inner Peace! 🎉',
      message: 'Thank you for joining us! Start your wellness journey by exploring our features.',
      type: 'success' as const,
      actionUrl: '/dashboard',
      actionText: 'Explore Dashboard'
    },
    {
      title: 'Complete Your Personal Information',
      message: 'Set up your personal information to get personalized recommendations and insights.',
      type: 'info' as const,
      actionUrl: '/dashboard/profile',
      actionText: 'Set Up Personal Information'
    },
    {
      title: 'Try Your First Meditation',
      message: 'Start with a 5-minute guided meditation to relax and center yourself.',
      type: 'info' as const,
      actionUrl: '/dashboard/meditation',
      actionText: 'Start Meditating'
    },
    {
      title: 'Track Your Mood',
      message: 'Log how you\'re feeling today to begin understanding your emotional patterns.',
      type: 'info' as const,
      actionUrl: '/dashboard/mood',
      actionText: 'Log Mood'
    },
    {
      title: 'Set Your Goals',
      message: 'Define what wellness means to you and set achievable targets for your journey.',
      type: 'info' as const,
      actionUrl: '/dashboard/profile',
      actionText: 'Set Goals'
    },
    {
      title: 'Explore AI Hub',
      message: 'Discover our AI-powered features for personalized wellness insights.',
      type: 'info' as const,
      actionUrl: '/dashboard/ai-hub',
      actionText: 'Visit AI Hub'
    }
  ];

  // Add notifications with a small delay between each to avoid overwhelming the user
  for (let i = 0; i < welcomeNotifications.length; i++) {
    setTimeout(async () => {
      await addNotification(welcomeNotifications[i]);
    }, i * 1000); // 1 second delay between each notification
  }
};

export const createDailyReminderNotifications = async (addNotification: any) => {
  const dailyReminders = [
    {
      title: 'Daily Check-in Reminder',
      message: 'Don\'t forget to log your mood and activities for today!',
      type: 'warning' as const,
      actionUrl: '/dashboard',
      actionText: 'Log Today'
    },
    {
      title: 'Hydration Reminder',
      message: 'Remember to drink water throughout the day for better health.',
      type: 'info' as const,
      actionUrl: '/dashboard/water',
      actionText: 'Log Water'
    },
    {
      title: 'Mindfulness Moment',
      message: 'Take a few minutes to practice mindfulness and reduce stress.',
      type: 'info' as const,
      actionUrl: '/dashboard/meditation',
      actionText: 'Meditate Now'
    }
  ];

  // Add one random daily reminder
  const randomReminder = dailyReminders[Math.floor(Math.random() * dailyReminders.length)];
  await addNotification(randomReminder);
};

export const createAchievementNotifications = async (addNotification: any) => {
  const achievements = [
    {
      title: 'First Steps! 🎯',
      message: 'Congratulations on completing your first wellness activity!',
      type: 'success' as const,
      actionUrl: '/dashboard/wellness-report',
      actionText: 'View Progress'
    },
    {
      title: 'Consistency Champion! 🏆',
      message: 'You\'ve been logging your activities for 3 days straight. Keep it up!',
      type: 'success' as const,
      actionUrl: '/dashboard',
      actionText: 'View Dashboard'
    },
    {
      title: 'Wellness Explorer! 🌟',
      message: 'You\'ve tried multiple features. You\'re on your way to better wellness!',
      type: 'success' as const,
      actionUrl: '/dashboard/wellness-report',
      actionText: 'See Insights'
    }
  ];

  // Add one random achievement
  const randomAchievement = achievements[Math.floor(Math.random() * achievements.length)];
  await addNotification(randomAchievement);
};

export const createTipNotifications = async (addNotification: any) => {
  const tips = [
    {
      title: 'Wellness Tip 💡',
      message: 'Regular meditation can reduce stress and improve focus. Try starting with just 5 minutes daily.',
      type: 'info' as const
    },
    {
      title: 'Health Tip 💡',
      message: 'Drinking water first thing in the morning helps kickstart your metabolism.',
      type: 'info' as const
    },
    {
      title: 'Mindfulness Tip 💡',
      message: 'Taking deep breaths throughout the day can help manage stress and anxiety.',
      type: 'info' as const
    },
    {
      title: 'Sleep Tip 💡',
      message: 'Maintaining a consistent sleep schedule improves both sleep quality and overall health.',
      type: 'info' as const
    },
    {
      title: 'Nutrition Tip 💡',
      message: 'Eating a balanced breakfast helps maintain energy levels throughout the day.',
      type: 'info' as const
    }
  ];

  // Add one random tip
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  await addNotification(randomTip);
};





export const createWelcomeNotifications = async (addNotification: any) => {
  const welcomeNotifications = [
    {
      title: 'Welcome to Find Your Inner Peace! 🎉',
      message: 'Thank you for joining us! Start your wellness journey by exploring our features.',
      type: 'success' as const,
      actionUrl: '/dashboard',
      actionText: 'Explore Dashboard'
    },
    {
      title: 'Complete Your Personal Information',
      message: 'Set up your personal information to get personalized recommendations and insights.',
      type: 'info' as const,
      actionUrl: '/dashboard/profile',
      actionText: 'Set Up Personal Information'
    },
    {
      title: 'Try Your First Meditation',
      message: 'Start with a 5-minute guided meditation to relax and center yourself.',
      type: 'info' as const,
      actionUrl: '/dashboard/meditation',
      actionText: 'Start Meditating'
    },
    {
      title: 'Track Your Mood',
      message: 'Log how you\'re feeling today to begin understanding your emotional patterns.',
      type: 'info' as const,
      actionUrl: '/dashboard/mood',
      actionText: 'Log Mood'
    },
    {
      title: 'Set Your Goals',
      message: 'Define what wellness means to you and set achievable targets for your journey.',
      type: 'info' as const,
      actionUrl: '/dashboard/profile',
      actionText: 'Set Goals'
    },
    {
      title: 'Explore AI Hub',
      message: 'Discover our AI-powered features for personalized wellness insights.',
      type: 'info' as const,
      actionUrl: '/dashboard/ai-hub',
      actionText: 'Visit AI Hub'
    }
  ];

  // Add notifications with a small delay between each to avoid overwhelming the user
  for (let i = 0; i < welcomeNotifications.length; i++) {
    setTimeout(async () => {
      await addNotification(welcomeNotifications[i]);
    }, i * 1000); // 1 second delay between each notification
  }
};

export const createDailyReminderNotifications = async (addNotification: any) => {
  const dailyReminders = [
    {
      title: 'Daily Check-in Reminder',
      message: 'Don\'t forget to log your mood and activities for today!',
      type: 'warning' as const,
      actionUrl: '/dashboard',
      actionText: 'Log Today'
    },
    {
      title: 'Hydration Reminder',
      message: 'Remember to drink water throughout the day for better health.',
      type: 'info' as const,
      actionUrl: '/dashboard/water',
      actionText: 'Log Water'
    },
    {
      title: 'Mindfulness Moment',
      message: 'Take a few minutes to practice mindfulness and reduce stress.',
      type: 'info' as const,
      actionUrl: '/dashboard/meditation',
      actionText: 'Meditate Now'
    }
  ];

  // Add one random daily reminder
  const randomReminder = dailyReminders[Math.floor(Math.random() * dailyReminders.length)];
  await addNotification(randomReminder);
};

export const createAchievementNotifications = async (addNotification: any) => {
  const achievements = [
    {
      title: 'First Steps! 🎯',
      message: 'Congratulations on completing your first wellness activity!',
      type: 'success' as const,
      actionUrl: '/dashboard/wellness-report',
      actionText: 'View Progress'
    },
    {
      title: 'Consistency Champion! 🏆',
      message: 'You\'ve been logging your activities for 3 days straight. Keep it up!',
      type: 'success' as const,
      actionUrl: '/dashboard',
      actionText: 'View Dashboard'
    },
    {
      title: 'Wellness Explorer! 🌟',
      message: 'You\'ve tried multiple features. You\'re on your way to better wellness!',
      type: 'success' as const,
      actionUrl: '/dashboard/wellness-report',
      actionText: 'See Insights'
    }
  ];

  // Add one random achievement
  const randomAchievement = achievements[Math.floor(Math.random() * achievements.length)];
  await addNotification(randomAchievement);
};

export const createTipNotifications = async (addNotification: any) => {
  const tips = [
    {
      title: 'Wellness Tip 💡',
      message: 'Regular meditation can reduce stress and improve focus. Try starting with just 5 minutes daily.',
      type: 'info' as const
    },
    {
      title: 'Health Tip 💡',
      message: 'Drinking water first thing in the morning helps kickstart your metabolism.',
      type: 'info' as const
    },
    {
      title: 'Mindfulness Tip 💡',
      message: 'Taking deep breaths throughout the day can help manage stress and anxiety.',
      type: 'info' as const
    },
    {
      title: 'Sleep Tip 💡',
      message: 'Maintaining a consistent sleep schedule improves both sleep quality and overall health.',
      type: 'info' as const
    },
    {
      title: 'Nutrition Tip 💡',
      message: 'Eating a balanced breakfast helps maintain energy levels throughout the day.',
      type: 'info' as const
    }
  ];

  // Add one random tip
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  await addNotification(randomTip);
};

export const createWelcomeNotifications = async (addNotification: any) => {
  const welcomeNotifications = [
    {
      title: 'Welcome to Find Your Inner Peace! 🎉',
      message: 'Thank you for joining us! Start your wellness journey by exploring our features.',
      type: 'success' as const,
      actionUrl: '/dashboard',
      actionText: 'Explore Dashboard'
    },
    {
      title: 'Complete Your Personal Information',
      message: 'Set up your personal information to get personalized recommendations and insights.',
      type: 'info' as const,
      actionUrl: '/dashboard/profile',
      actionText: 'Set Up Personal Information'
    },
    {
      title: 'Try Your First Meditation',
      message: 'Start with a 5-minute guided meditation to relax and center yourself.',
      type: 'info' as const,
      actionUrl: '/dashboard/meditation',
      actionText: 'Start Meditating'
    },
    {
      title: 'Track Your Mood',
      message: 'Log how you\'re feeling today to begin understanding your emotional patterns.',
      type: 'info' as const,
      actionUrl: '/dashboard/mood',
      actionText: 'Log Mood'
    },
    {
      title: 'Set Your Goals',
      message: 'Define what wellness means to you and set achievable targets for your journey.',
      type: 'info' as const,
      actionUrl: '/dashboard/profile',
      actionText: 'Set Goals'
    },
    {
      title: 'Explore AI Hub',
      message: 'Discover our AI-powered features for personalized wellness insights.',
      type: 'info' as const,
      actionUrl: '/dashboard/ai-hub',
      actionText: 'Visit AI Hub'
    }
  ];

  // Add notifications with a small delay between each to avoid overwhelming the user
  for (let i = 0; i < welcomeNotifications.length; i++) {
    setTimeout(async () => {
      await addNotification(welcomeNotifications[i]);
    }, i * 1000); // 1 second delay between each notification
  }
};

export const createDailyReminderNotifications = async (addNotification: any) => {
  const dailyReminders = [
    {
      title: 'Daily Check-in Reminder',
      message: 'Don\'t forget to log your mood and activities for today!',
      type: 'warning' as const,
      actionUrl: '/dashboard',
      actionText: 'Log Today'
    },
    {
      title: 'Hydration Reminder',
      message: 'Remember to drink water throughout the day for better health.',
      type: 'info' as const,
      actionUrl: '/dashboard/water',
      actionText: 'Log Water'
    },
    {
      title: 'Mindfulness Moment',
      message: 'Take a few minutes to practice mindfulness and reduce stress.',
      type: 'info' as const,
      actionUrl: '/dashboard/meditation',
      actionText: 'Meditate Now'
    }
  ];

  // Add one random daily reminder
  const randomReminder = dailyReminders[Math.floor(Math.random() * dailyReminders.length)];
  await addNotification(randomReminder);
};

export const createAchievementNotifications = async (addNotification: any) => {
  const achievements = [
    {
      title: 'First Steps! 🎯',
      message: 'Congratulations on completing your first wellness activity!',
      type: 'success' as const,
      actionUrl: '/dashboard/wellness-report',
      actionText: 'View Progress'
    },
    {
      title: 'Consistency Champion! 🏆',
      message: 'You\'ve been logging your activities for 3 days straight. Keep it up!',
      type: 'success' as const,
      actionUrl: '/dashboard',
      actionText: 'View Dashboard'
    },
    {
      title: 'Wellness Explorer! 🌟',
      message: 'You\'ve tried multiple features. You\'re on your way to better wellness!',
      type: 'success' as const,
      actionUrl: '/dashboard/wellness-report',
      actionText: 'See Insights'
    }
  ];

  // Add one random achievement
  const randomAchievement = achievements[Math.floor(Math.random() * achievements.length)];
  await addNotification(randomAchievement);
};

export const createTipNotifications = async (addNotification: any) => {
  const tips = [
    {
      title: 'Wellness Tip 💡',
      message: 'Regular meditation can reduce stress and improve focus. Try starting with just 5 minutes daily.',
      type: 'info' as const
    },
    {
      title: 'Health Tip 💡',
      message: 'Drinking water first thing in the morning helps kickstart your metabolism.',
      type: 'info' as const
    },
    {
      title: 'Mindfulness Tip 💡',
      message: 'Taking deep breaths throughout the day can help manage stress and anxiety.',
      type: 'info' as const
    },
    {
      title: 'Sleep Tip 💡',
      message: 'Maintaining a consistent sleep schedule improves both sleep quality and overall health.',
      type: 'info' as const
    },
    {
      title: 'Nutrition Tip 💡',
      message: 'Eating a balanced breakfast helps maintain energy levels throughout the day.',
      type: 'info' as const
    }
  ];

  // Add one random tip
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  await addNotification(randomTip);
};





export const createWelcomeNotifications = async (addNotification: any) => {
  const welcomeNotifications = [
    {
      title: 'Welcome to Find Your Inner Peace! 🎉',
      message: 'Thank you for joining us! Start your wellness journey by exploring our features.',
      type: 'success' as const,
      actionUrl: '/dashboard',
      actionText: 'Explore Dashboard'
    },
    {
      title: 'Complete Your Personal Information',
      message: 'Set up your personal information to get personalized recommendations and insights.',
      type: 'info' as const,
      actionUrl: '/dashboard/profile',
      actionText: 'Set Up Personal Information'
    },
    {
      title: 'Try Your First Meditation',
      message: 'Start with a 5-minute guided meditation to relax and center yourself.',
      type: 'info' as const,
      actionUrl: '/dashboard/meditation',
      actionText: 'Start Meditating'
    },
    {
      title: 'Track Your Mood',
      message: 'Log how you\'re feeling today to begin understanding your emotional patterns.',
      type: 'info' as const,
      actionUrl: '/dashboard/mood',
      actionText: 'Log Mood'
    },
    {
      title: 'Set Your Goals',
      message: 'Define what wellness means to you and set achievable targets for your journey.',
      type: 'info' as const,
      actionUrl: '/dashboard/profile',
      actionText: 'Set Goals'
    },
    {
      title: 'Explore AI Hub',
      message: 'Discover our AI-powered features for personalized wellness insights.',
      type: 'info' as const,
      actionUrl: '/dashboard/ai-hub',
      actionText: 'Visit AI Hub'
    }
  ];

  // Add notifications with a small delay between each to avoid overwhelming the user
  for (let i = 0; i < welcomeNotifications.length; i++) {
    setTimeout(async () => {
      await addNotification(welcomeNotifications[i]);
    }, i * 1000); // 1 second delay between each notification
  }
};

export const createDailyReminderNotifications = async (addNotification: any) => {
  const dailyReminders = [
    {
      title: 'Daily Check-in Reminder',
      message: 'Don\'t forget to log your mood and activities for today!',
      type: 'warning' as const,
      actionUrl: '/dashboard',
      actionText: 'Log Today'
    },
    {
      title: 'Hydration Reminder',
      message: 'Remember to drink water throughout the day for better health.',
      type: 'info' as const,
      actionUrl: '/dashboard/water',
      actionText: 'Log Water'
    },
    {
      title: 'Mindfulness Moment',
      message: 'Take a few minutes to practice mindfulness and reduce stress.',
      type: 'info' as const,
      actionUrl: '/dashboard/meditation',
      actionText: 'Meditate Now'
    }
  ];

  // Add one random daily reminder
  const randomReminder = dailyReminders[Math.floor(Math.random() * dailyReminders.length)];
  await addNotification(randomReminder);
};

export const createAchievementNotifications = async (addNotification: any) => {
  const achievements = [
    {
      title: 'First Steps! 🎯',
      message: 'Congratulations on completing your first wellness activity!',
      type: 'success' as const,
      actionUrl: '/dashboard/wellness-report',
      actionText: 'View Progress'
    },
    {
      title: 'Consistency Champion! 🏆',
      message: 'You\'ve been logging your activities for 3 days straight. Keep it up!',
      type: 'success' as const,
      actionUrl: '/dashboard',
      actionText: 'View Dashboard'
    },
    {
      title: 'Wellness Explorer! 🌟',
      message: 'You\'ve tried multiple features. You\'re on your way to better wellness!',
      type: 'success' as const,
      actionUrl: '/dashboard/wellness-report',
      actionText: 'See Insights'
    }
  ];

  // Add one random achievement
  const randomAchievement = achievements[Math.floor(Math.random() * achievements.length)];
  await addNotification(randomAchievement);
};

export const createTipNotifications = async (addNotification: any) => {
  const tips = [
    {
      title: 'Wellness Tip 💡',
      message: 'Regular meditation can reduce stress and improve focus. Try starting with just 5 minutes daily.',
      type: 'info' as const
    },
    {
      title: 'Health Tip 💡',
      message: 'Drinking water first thing in the morning helps kickstart your metabolism.',
      type: 'info' as const
    },
    {
      title: 'Mindfulness Tip 💡',
      message: 'Taking deep breaths throughout the day can help manage stress and anxiety.',
      type: 'info' as const
    },
    {
      title: 'Sleep Tip 💡',
      message: 'Maintaining a consistent sleep schedule improves both sleep quality and overall health.',
      type: 'info' as const
    },
    {
      title: 'Nutrition Tip 💡',
      message: 'Eating a balanced breakfast helps maintain energy levels throughout the day.',
      type: 'info' as const
    }
  ];

  // Add one random tip
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  await addNotification(randomTip);
};

export const createWelcomeNotifications = async (addNotification: any) => {
  const welcomeNotifications = [
    {
      title: 'Welcome to Find Your Inner Peace! 🎉',
      message: 'Thank you for joining us! Start your wellness journey by exploring our features.',
      type: 'success' as const,
      actionUrl: '/dashboard',
      actionText: 'Explore Dashboard'
    },
    {
      title: 'Complete Your Personal Information',
      message: 'Set up your personal information to get personalized recommendations and insights.',
      type: 'info' as const,
      actionUrl: '/dashboard/profile',
      actionText: 'Set Up Personal Information'
    },
    {
      title: 'Try Your First Meditation',
      message: 'Start with a 5-minute guided meditation to relax and center yourself.',
      type: 'info' as const,
      actionUrl: '/dashboard/meditation',
      actionText: 'Start Meditating'
    },
    {
      title: 'Track Your Mood',
      message: 'Log how you\'re feeling today to begin understanding your emotional patterns.',
      type: 'info' as const,
      actionUrl: '/dashboard/mood',
      actionText: 'Log Mood'
    },
    {
      title: 'Set Your Goals',
      message: 'Define what wellness means to you and set achievable targets for your journey.',
      type: 'info' as const,
      actionUrl: '/dashboard/profile',
      actionText: 'Set Goals'
    },
    {
      title: 'Explore AI Hub',
      message: 'Discover our AI-powered features for personalized wellness insights.',
      type: 'info' as const,
      actionUrl: '/dashboard/ai-hub',
      actionText: 'Visit AI Hub'
    }
  ];

  // Add notifications with a small delay between each to avoid overwhelming the user
  for (let i = 0; i < welcomeNotifications.length; i++) {
    setTimeout(async () => {
      await addNotification(welcomeNotifications[i]);
    }, i * 1000); // 1 second delay between each notification
  }
};

export const createDailyReminderNotifications = async (addNotification: any) => {
  const dailyReminders = [
    {
      title: 'Daily Check-in Reminder',
      message: 'Don\'t forget to log your mood and activities for today!',
      type: 'warning' as const,
      actionUrl: '/dashboard',
      actionText: 'Log Today'
    },
    {
      title: 'Hydration Reminder',
      message: 'Remember to drink water throughout the day for better health.',
      type: 'info' as const,
      actionUrl: '/dashboard/water',
      actionText: 'Log Water'
    },
    {
      title: 'Mindfulness Moment',
      message: 'Take a few minutes to practice mindfulness and reduce stress.',
      type: 'info' as const,
      actionUrl: '/dashboard/meditation',
      actionText: 'Meditate Now'
    }
  ];

  // Add one random daily reminder
  const randomReminder = dailyReminders[Math.floor(Math.random() * dailyReminders.length)];
  await addNotification(randomReminder);
};

export const createAchievementNotifications = async (addNotification: any) => {
  const achievements = [
    {
      title: 'First Steps! 🎯',
      message: 'Congratulations on completing your first wellness activity!',
      type: 'success' as const,
      actionUrl: '/dashboard/wellness-report',
      actionText: 'View Progress'
    },
    {
      title: 'Consistency Champion! 🏆',
      message: 'You\'ve been logging your activities for 3 days straight. Keep it up!',
      type: 'success' as const,
      actionUrl: '/dashboard',
      actionText: 'View Dashboard'
    },
    {
      title: 'Wellness Explorer! 🌟',
      message: 'You\'ve tried multiple features. You\'re on your way to better wellness!',
      type: 'success' as const,
      actionUrl: '/dashboard/wellness-report',
      actionText: 'See Insights'
    }
  ];

  // Add one random achievement
  const randomAchievement = achievements[Math.floor(Math.random() * achievements.length)];
  await addNotification(randomAchievement);
};

export const createTipNotifications = async (addNotification: any) => {
  const tips = [
    {
      title: 'Wellness Tip 💡',
      message: 'Regular meditation can reduce stress and improve focus. Try starting with just 5 minutes daily.',
      type: 'info' as const
    },
    {
      title: 'Health Tip 💡',
      message: 'Drinking water first thing in the morning helps kickstart your metabolism.',
      type: 'info' as const
    },
    {
      title: 'Mindfulness Tip 💡',
      message: 'Taking deep breaths throughout the day can help manage stress and anxiety.',
      type: 'info' as const
    },
    {
      title: 'Sleep Tip 💡',
      message: 'Maintaining a consistent sleep schedule improves both sleep quality and overall health.',
      type: 'info' as const
    },
    {
      title: 'Nutrition Tip 💡',
      message: 'Eating a balanced breakfast helps maintain energy levels throughout the day.',
      type: 'info' as const
    }
  ];

  // Add one random tip
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  await addNotification(randomTip);
};
























