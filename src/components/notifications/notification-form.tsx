'use client';

import * as React from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useNotifications } from '@/context/notifications-context';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

interface NotificationFormData {
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  actionUrl: string;
  actionText: string;
}

const notificationTypes = [
  { value: 'info', label: 'Info', color: 'text-blue-600' },
  { value: 'success', label: 'Success', color: 'text-green-600' },
  { value: 'warning', label: 'Warning', color: 'text-yellow-600' },
  { value: 'error', label: 'Error', color: 'text-red-600' },
];

const notificationTemplates = [
  {
    name: 'Welcome Message',
    data: {
      title: 'Welcome!',
      message: 'Thank you for joining us!',
      type: 'success' as const,
      actionUrl: '/dashboard',
      actionText: 'Get Started'
    }
  },
  {
    name: 'Reminder',
    data: {
      title: 'Reminder',
      message: 'Don\'t forget to complete your daily tasks.',
      type: 'info' as const,
      actionUrl: '/dashboard',
      actionText: 'View Tasks'
    }
  },
  {
    name: 'Achievement',
    data: {
      title: 'Achievement Unlocked!',
      message: 'Congratulations on reaching your goal!',
      type: 'success' as const,
      actionUrl: '/dashboard/achievements',
      actionText: 'View Achievement'
    }
  },
  {
    name: 'Warning',
    data: {
      title: 'Important Notice',
      message: 'Please review your account settings.',
      type: 'warning' as const,
      actionUrl: '/dashboard/settings',
      actionText: 'Review Settings'
    }
  },
  {
    name: 'Error Alert',
    data: {
      title: 'Action Required',
      message: 'There was an issue with your recent action.',
      type: 'error' as const,
      actionUrl: '/dashboard',
      actionText: 'Fix Issue'
    }
  }
];

export function NotificationForm() {
  const { addNotification } = useNotifications();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState<NotificationFormData>({
    title: '',
    message: '',
    type: 'info',
    actionUrl: '',
    actionText: '',
  });

  const handleInputChange = (field: keyof NotificationFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTemplateSelect = (template: typeof notificationTemplates[0]) => {
    setFormData(prev => ({
      ...prev,
      ...template.data
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      console.error('User not authenticated');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await addNotification({
        title: formData.title,
        message: formData.message,
        type: formData.type,
        actionUrl: formData.actionUrl || undefined,
        actionText: formData.actionText || undefined,
        isRead: false,
      });

      // Reset form
      setFormData({
        title: '',
        message: '',
        type: 'info',
        actionUrl: '',
        actionText: '',
      });
      
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to create notification:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Notification
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Notification</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Templates */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Quick Templates (Optional)</Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setFormData({
                  title: '',
                  message: '',
                  type: 'info',
                  actionUrl: '',
                  actionText: '',
                })}
                className="text-xs"
              >
                Clear All
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {notificationTemplates.map((template) => (
                <Button
                  key={template.name}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleTemplateSelect(template)}
                  className="justify-start"
                >
                  {template.name}
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              💡 You can use templates as a starting point or enter your own custom title and message below.
            </p>
          </div>

          {/* Type */}
          <div className="space-y-2">
            <Label htmlFor="type">Type *</Label>
            <Select
              value={formData.type}
              onValueChange={(value: NotificationFormData['type']) => 
                handleInputChange('type', value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select notification type" />
              </SelectTrigger>
              <SelectContent>
                {notificationTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    <span className={type.color}>{type.label}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="Enter your custom notification title"
              required
              className="font-medium"
            />
            <p className="text-xs text-muted-foreground">
              ✏️ You can type any custom title here, or use a template above as a starting point.
            </p>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Notification message"
              rows={3}
              required
            />
          </div>

          {/* Action URL */}
          <div className="space-y-2">
            <Label htmlFor="actionUrl">Action URL (optional)</Label>
            <Input
              id="actionUrl"
              value={formData.actionUrl}
              onChange={(e) => handleInputChange('actionUrl', e.target.value)}
              placeholder="/dashboard or https://example.com"
            />
          </div>

          {/* Action Text */}
          <div className="space-y-2">
            <Label htmlFor="actionText">Action Button Text (optional)</Label>
            <Input
              id="actionText"
              value={formData.actionText}
              onChange={(e) => handleInputChange('actionText', e.target.value)}
              placeholder="Button text"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Notification'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
