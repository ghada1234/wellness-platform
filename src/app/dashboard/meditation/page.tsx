'use client';

import { useState } from 'react';
import { Play, Clock, Target, TrendingUp, Heart, Brain, Zap, Shield, Pause, RotateCcw, Plus, Edit, Trash2 } from 'lucide-react';
import { useFirestore } from '@/hooks/use-firestore';
import { useToast } from '@/hooks/use-toast';
import type { Timestamp } from 'firebase/firestore';

interface MeditationLog {
  id: string;
  technique: string;
  duration: number;
  notes: string;
  createdAt: Timestamp | Date;
}

export default function MeditationPage() {
  const { data: meditationLogs, addDocument: addMeditationLog, deleteDocument: deleteMeditationLog } = useFirestore<MeditationLog>('meditationLog', { limit: 50 });
  const { toast } = useToast();
  
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('exercises');
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(10);
  const [timeRemaining, setTimeRemaining] = useState(10 * 60); // in seconds
  const [showLogForm, setShowLogForm] = useState(false);
  const [logForm, setLogForm] = useState({
    technique: 'Mindful Breathing',
    duration: 10,
    notes: ''
  });

const meditationSessions = [
  {
      id: 'mindful-breathing',
    title: 'Mindful Breathing',
    level: 'Beginner',
    duration: '5 min',
      instructor: 'Sarah Wilson',
      description: 'A simple, powerful practice to anchor you in the present moment.',
    benefits: ['Stress Relief', 'Better Focus', 'Emotional Balance'],
      icon: <Brain className="w-6 h-6" />
  },
  {
      id: 'body-scan',
    title: 'Body Scan for Deep Relaxation',
    level: 'Intermediate',
    duration: '15 min',
      instructor: 'Michael Chen',
    description: 'Release tension and cultivate awareness throughout your body.',
    benefits: ['Deep Relaxation', 'Better Sleep', 'Pain Relief'],
      icon: <Heart className="w-6 h-6" />
  },
  {
      id: 'loving-kindness',
    title: 'Loving-Kindness Meditation',
    level: 'Beginner',
    duration: '10 min',
      instructor: 'Emma Rodriguez',
      description: 'Cultivate feelings of warmth, kindness, and compassion for yourself and others.',
    benefits: ['Self-Compassion', 'Positive Emotions', 'Connection'],
      icon: <Heart className="w-6 h-6" />
  },
  {
      id: 'anxiety-relief',
    title: 'Meditation for Anxiety',
    level: 'Advanced',
    duration: '12 min',
      instructor: 'Dr. James Park',
      description: 'A guided session to help you manage and reduce anxious thoughts.',
    benefits: ['Anxiety Reduction', 'Calm Mind', 'Groundedness'],
      icon: <Shield className="w-6 h-6" />
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Timer functions
  const startTimer = () => {
    setIsTimerActive(true);
    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          setIsTimerActive(false);
          clearInterval(interval);
          alert('Meditation session complete!');
          return timerMinutes * 60;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    setIsTimerActive(false);
  };

  const resetTimer = () => {
    setIsTimerActive(false);
    setTimeRemaining(timerMinutes * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Button handlers
  const handleGuidedMeditations = () => {
    setActiveTab('exercises');
    console.log('Opening guided meditations');
  };

  const handleMeditationTimer = () => {
    setActiveTab('timer');
    console.log('Opening meditation timer');
  };

  const handleLogSession = () => {
    setActiveTab('log');
    setShowLogForm(true);
    console.log('Opening log session form');
  };

  const handleHistory = () => {
    setActiveTab('history');
    console.log('Opening meditation history');
  };

  const handleStartMeditation = (sessionId: string) => {
    console.log(`Starting meditation: ${sessionId}`);
    // Add your meditation start logic here
    alert(`Starting ${sessionId} meditation session!`);
  };

  const handleLogFormSubmit = async () => {
    try {
      await addMeditationLog({
        technique: logForm.technique,
        duration: logForm.duration,
        notes: logForm.notes,
      } as Omit<MeditationLog, 'id' | 'createdAt'>);
      
      toast({
        title: 'Meditation Logged!',
        description: `Logged ${logForm.duration} minutes of ${logForm.technique}`,
      });
      
      setShowLogForm(false);
      setLogForm({ technique: 'Mindful Breathing', duration: 10, notes: '' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to Log Session',
        description: 'Could not save your meditation session. Please try again.',
      });
    }
  };

  const handleDeleteMeditationLog = async (id: string) => {
    try {
      await deleteMeditationLog(id);
      toast({ title: 'Meditation log deleted.' });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Failed to Delete',
        description: 'Could not delete meditation log.',
      });
    }
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Meditation Library</h1>
        <p className="text-gray-600">Find a session to calm your mind and find your focus.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Sessions This Week</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
            <Target className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Time</p>
              <p className="text-2xl font-bold text-gray-900">50 min</p>
            </div>
            <Clock className="w-8 h-8 text-green-600" />
          </div>
      </div>

        <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Longest Streak</p>
              <p className="text-2xl font-bold text-gray-900">0 Days</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button 
          onClick={() => setSelectedSession('guided')}
          className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
        >
          <div className="text-center">
            <Play className="w-6 h-6 mx-auto mb-2 text-blue-600" />
            <p className="text-sm font-medium text-gray-900">Guided Meditations</p>
          </div>
        </button>
        
        <button 
          onClick={() => setSelectedSession('timer')}
          className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
        >
          <div className="text-center">
            <Clock className="w-6 h-6 mx-auto mb-2 text-green-600" />
            <p className="text-sm font-medium text-gray-900">Meditation Timer</p>
          </div>
        </button>
        
        <button 
          onClick={() => setSelectedSession('log')}
          className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
        >
          <div className="text-center">
            <Zap className="w-6 h-6 mx-auto mb-2 text-purple-600" />
            <p className="text-sm font-medium text-gray-900">Log Session</p>
          </div>
        </button>
        
        <button 
          onClick={() => setSelectedSession('history')}
          className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow"
        >
          <div className="text-center">
            <TrendingUp className="w-6 h-6 mx-auto mb-2 text-orange-600" />
            <p className="text-sm font-medium text-gray-900">History</p>
          </div>
        </button>
      </div>

      {/* Tab Content */}
      {selectedSession === 'guided' && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Featured Sessions</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {meditationSessions.map((session) => (
              <div key={session.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {session.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{session.title}</h3>
                      <p className="text-sm text-gray-600">With {session.instructor}</p>
                    </div>
                    </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(session.level)}`}>
                    {session.level}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{session.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{session.duration}</span>
                </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Benefits:</p>
                  <div className="flex flex-wrap gap-2">
                    {session.benefits.map((benefit, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => handleStartMeditation(session.id)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Start Meditation
                </button>
                  </div>
            ))}
                      </div>
                      </div>
      )}

      {selectedSession === 'timer' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Meditation Timer</h2>
          
          <div className="text-center">
            <div className="mb-8">
              <div className="text-6xl font-bold text-gray-900 mb-2">
                {formatTime(timeRemaining)}
              </div>
              <p className="text-gray-600">Time Remaining</p>
            </div>
            
            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={startTimer}
                disabled={isTimerActive}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400 transition-colors font-medium"
              >
                <Play className="w-5 h-5 inline mr-2" />
                Start
              </button>
              
              <button
                onClick={pauseTimer}
                disabled={!isTimerActive}
                className="bg-yellow-600 text-white px-6 py-3 rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 transition-colors font-medium"
              >
                <Pause className="w-5 h-5 inline mr-2" />
                Pause
              </button>
              
              <button
                onClick={resetTimer}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
              >
                <RotateCcw className="w-5 h-5 inline mr-2" />
                Reset
              </button>
            </div>
            
            <div className="flex justify-center space-x-2">
              {[5, 10, 15, 20, 30].map((minutes) => (
                <button
                  key={minutes}
                  onClick={() => {
                    setTimerMinutes(minutes);
                    setTimeRemaining(minutes * 60);
                  }}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    timerMinutes === minutes
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {minutes}m
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedSession === 'log' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Log Meditation Session</h2>
          
          {showLogForm ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Technique
                </label>
                <select
                  value={logForm.technique}
                  onChange={(e) => setLogForm({...logForm, technique: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Mindful Breathing">Mindful Breathing</option>
                  <option value="Body Scan">Body Scan</option>
                  <option value="Loving-Kindness">Loving-Kindness</option>
                  <option value="Walking Meditation">Walking Meditation</option>
                  <option value="Mantra Meditation">Mantra Meditation</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={logForm.duration}
                  onChange={(e) => setLogForm({...logForm, duration: parseInt(e.target.value)})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  max="120"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes (optional)
                </label>
                <textarea
                  value={logForm.notes}
                  onChange={(e) => setLogForm({...logForm, notes: e.target.value})}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={3}
                  placeholder="How did you feel during this session?"
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  onClick={handleLogFormSubmit}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Log Session
                </button>
                <button
                  onClick={() => setShowLogForm(false)}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Log your meditation session to track your progress</p>
              <button
                onClick={() => setShowLogForm(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Plus className="w-5 h-5 inline mr-2" />
                Log New Session
              </button>
            </div>
          )}
        </div>
      )}

      {selectedSession === 'history' && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Meditation History</h2>
          
          <div className="space-y-4">
            {meditationLogs && meditationLogs.length > 0 ? (
              meditationLogs
                .sort((a, b) => {
                  const aTime = a.createdAt instanceof Date ? a.createdAt.getTime() : (a.createdAt as any).toMillis();
                  const bTime = b.createdAt instanceof Date ? b.createdAt.getTime() : (b.createdAt as any).toMillis();
                  return bTime - aTime;
                })
                .map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900">{log.technique}</h3>
                      <p className="text-sm text-gray-600">
                        {log.duration} minutes • {log.createdAt instanceof Date ? log.createdAt.toLocaleDateString() : (log.createdAt as any).toDate().toLocaleDateString()}
                      </p>
                      {log.notes && (
                        <p className="text-sm text-gray-500">{log.notes}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleDeleteMeditationLog(log.id)}
                        className="text-red-600 hover:text-red-800"
                        title="Delete meditation log"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Brain className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">No meditation sessions yet</p>
                <p className="text-sm">Start logging your meditation sessions to see your progress here</p>
                <button
                  onClick={() => setSelectedSession('log')}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Log Your First Session
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Default view when no session is selected */}
      {!selectedSession && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Featured Sessions</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {meditationSessions.map((session) => (
              <div key={session.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      {session.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{session.title}</h3>
                      <p className="text-sm text-gray-600">With {session.instructor}</p>
                    </div>
                    </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(session.level)}`}>
                    {session.level}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4">{session.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{session.duration}</span>
                </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Benefits:</p>
                  <div className="flex flex-wrap gap-2">
                    {session.benefits.map((benefit, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                        {benefit}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => handleStartMeditation(session.id)}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Start Meditation
                </button>
                  </div>
            ))}
                      </div>
                      </div>
      )}
    </div>
  );
}





