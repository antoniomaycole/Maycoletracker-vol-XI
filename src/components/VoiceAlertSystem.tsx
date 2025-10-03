/**
 * MaycoleTracker™ Volume XI - Advanced Voice Alert System
 * Revolutionary audio alerts with speech synthesis and sound notifications
 * Features: Real-time voice alerts, customizable voices, sound effects, verbal notifications
 */

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Volume2, VolumeX, Mic, Settings, AlertTriangle, Package,
  Clock, Bell, Play, Pause, RotateCcw, Download, Upload, Zap, Brain,
  Speaker, Headphones, TestTube, CheckCircle, RefreshCw, Target
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Slider } from './ui/slider';

interface VoiceAlert {
  id: string;
  productName: string;
  alertType: 'low_stock' | 'out_of_stock' | 'expiring' | 'reorder' | 'quality_issue';
  message: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  industry: string;
  timestamp: string;
  hasBeenPlayed: boolean;
  repeatCount: number;
  customMessage?: string;
  soundEffect: boolean;
  voiceSettings: {
    voice: string;
    speed: number;
    pitch: number;
    volume: number;
  };
}

interface VoiceSettings {
  enabled: boolean;
  voice: string;
  speed: number;
  pitch: number;
  volume: number;
  soundEffects: boolean;
  alertFrequency: number; // minutes
  playDuringHours: {
    start: string;
    end: string;
  };
  repeatCriticalAlerts: boolean;
  maxRepeats: number;
}

const SAMPLE_ALERTS: VoiceAlert[] = [
  {
    id: '1',
    productName: 'Red Peppers',
    alertType: 'low_stock',
    message: 'The red peppers are running low. Current stock is 8 pounds. Please refill or place an order.',
    priority: 'high',
    industry: 'Restaurant',
    timestamp: '2024-01-15T14:30:00Z',
    hasBeenPlayed: false,
    repeatCount: 0,
    soundEffect: true,
    voiceSettings: {
      voice: 'female',
      speed: 1.0,
      pitch: 1.0,
      volume: 0.8
    }
  },
  {
    id: '2',
    productName: 'Pain Killers (Ibuprofen)',
    alertType: 'low_stock',
    message: 'Check medications: Pain killers are low. Current stock is 25 units. Refill or put in an order immediately.',
    priority: 'critical',
    industry: 'Healthcare',
    timestamp: '2024-01-15T14:25:00Z',
    hasBeenPlayed: false,
    repeatCount: 0,
    soundEffect: true,
    voiceSettings: {
      voice: 'male',
      speed: 0.9,
      pitch: 1.1,
      volume: 0.9
    }
  },
  {
    id: '3',
    productName: 'N95 Masks',
    alertType: 'critical',
    message: 'CRITICAL ALERT: N95 masks are critically low. Only 12 units remaining. Immediate reorder required for patient safety.',
    priority: 'critical',
    industry: 'Healthcare',
    timestamp: '2024-01-15T14:20:00Z',
    hasBeenPlayed: false,
    repeatCount: 0,
    soundEffect: true,
    voiceSettings: {
      voice: 'female',
      speed: 0.8,
      pitch: 1.2,
      volume: 1.0
    }
  },
  {
    id: '4',
    productName: 'Safety Hard Hats',
    alertType: 'reorder',
    message: 'Safety hard hats need reordering. Current stock is 5 units. Minimum required is 20 for OSHA compliance.',
    priority: 'high',
    industry: 'Construction',
    timestamp: '2024-01-15T14:15:00Z',
    hasBeenPlayed: false,
    repeatCount: 0,
    soundEffect: true,
    voiceSettings: {
      voice: 'male',
      speed: 1.0,
      pitch: 1.0,
      volume: 0.8
    }
  },
  {
    id: '5',
    productName: 'Fresh Milk',
    alertType: 'expiring',
    message: 'Fresh milk expires today. 15 gallons will expire. Use immediately or mark for disposal.',
    priority: 'medium',
    industry: 'Restaurant',
    timestamp: '2024-01-15T14:10:00Z',
    hasBeenPlayed: false,
    repeatCount: 0,
    soundEffect: true,
    voiceSettings: {
      voice: 'female',
      speed: 1.1,
      pitch: 0.9,
      volume: 0.7
    }
  }
];

export default function VoiceAlertSystem() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alerts, setAlerts] = useState<VoiceAlert[]>(SAMPLE_ALERTS);
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    enabled: true,
    voice: 'female',
    speed: 1.0,
    pitch: 1.0,
    volume: 0.8,
    soundEffects: true,
    alertFrequency: 15,
    playDuringHours: {
      start: '08:00',
      end: '18:00'
    },
    repeatCriticalAlerts: true,
    maxRepeats: 3
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  const [testMessage, setTestMessage] = useState('This is a test of the MaycoleTracker voice alert system.');
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const synthesisRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthesisRef.current = window.speechSynthesis;
      
      // Load available voices
      const loadVoices = () => {
        const voices = synthesisRef.current?.getVoices() || [];
        setAvailableVoices(voices);
      };
      
      loadVoices();
      synthesisRef.current.onvoiceschanged = loadVoices;
    }

    // Check for alerts that need to be played
    const alertInterval = setInterval(() => {
      checkAndPlayAlerts();
    }, voiceSettings.alertFrequency * 60 * 1000);

    return () => {
      clearInterval(alertInterval);
      if (synthesisRef.current) {
        synthesisRef.current.cancel();
      }
    };
  }, [voiceSettings]);

  const checkAndPlayAlerts = () => {
    if (!voiceSettings.enabled) return;

    const now = new Date();
    const currentHour = now.getHours();
    const startHour = parseInt(voiceSettings.playDuringHours.start.split(':')[0]);
    const endHour = parseInt(voiceSettings.playDuringHours.end.split(':')[0]);

    // Check if within allowed hours
    if (currentHour < startHour || currentHour > endHour) return;

    // Find unplayed alerts
    const unplayedAlerts = alerts.filter(alert => !alert.hasBeenPlayed);
    const criticalAlerts = unplayedAlerts.filter(alert => alert.priority === 'critical');

    // Play critical alerts first
    if (criticalAlerts.length > 0) {
      playAlert(criticalAlerts[0]);
    } else if (unplayedAlerts.length > 0) {
      playAlert(unplayedAlerts[0]);
    }
  };

  const playAlert = (alert: VoiceAlert) => {
    if (!synthesisRef.current || isPlaying) return;

    setIsPlaying(true);
    setCurrentlyPlaying(alert.id);

    // Play sound effect first if enabled
    if (alert.soundEffect && voiceSettings.soundEffects) {
      playAlertSound(alert.priority);
    }

    // Create speech synthesis utterance
    const utterance = new SpeechSynthesisUtterance(alert.customMessage || alert.message);
    utteranceRef.current = utterance;

    // Configure voice settings
    const selectedVoice = availableVoices.find(voice => 
      voice.name.toLowerCase().includes(alert.voiceSettings.voice) ||
      (alert.voiceSettings.voice === 'female' && voice.name.toLowerCase().includes('female')) ||
      (alert.voiceSettings.voice === 'male' && voice.name.toLowerCase().includes('male'))
    );

    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.rate = alert.voiceSettings.speed;
    utterance.pitch = alert.voiceSettings.pitch;
    utterance.volume = alert.voiceSettings.volume;

    utterance.onend = () => {
      setIsPlaying(false);
      setCurrentlyPlaying(null);
      
      // Mark alert as played
      setAlerts(prev => prev.map(a => 
        a.id === alert.id 
          ? { ...a, hasBeenPlayed: true, repeatCount: a.repeatCount + 1 }
          : a
      ));

      // Schedule repeat for critical alerts
      if (alert.priority === 'critical' && 
          voiceSettings.repeatCriticalAlerts && 
          alert.repeatCount < voiceSettings.maxRepeats) {
        setTimeout(() => {
          if (alert.repeatCount < voiceSettings.maxRepeats - 1) {
            setAlerts(prev => prev.map(a => 
              a.id === alert.id 
                ? { ...a, hasBeenPlayed: false }
                : a
            ));
          }
        }, 30000); // Repeat after 30 seconds
      }
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setCurrentlyPlaying(null);
      console.error('Speech synthesis error');
    };

    synthesisRef.current.speak(utterance);
  };

  const playAlertSound = (priority: string) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const frequencies = {
      critical: [800, 1000, 1200],
      high: [600, 800],
      medium: [400, 600],
      low: [300, 400]
    };

    const freqs = frequencies[priority as keyof typeof frequencies] || frequencies.medium;

    freqs.forEach((freq, index) => {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0, audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      }, index * 200);
    });
  };

  const testVoiceAlert = () => {
    if (!synthesisRef.current) {
      alert('Speech synthesis not supported in this browser');
      return;
    }

    const testAlert: VoiceAlert = {
      id: 'test',
      productName: 'Test Product',
      alertType: 'low_stock',
      message: testMessage,
      priority: 'medium',
      industry: 'Test',
      timestamp: new Date().toISOString(),
      hasBeenPlayed: false,
      repeatCount: 0,
      soundEffect: voiceSettings.soundEffects,
      voiceSettings: {
        voice: voiceSettings.voice,
        speed: voiceSettings.speed,
        pitch: voiceSettings.pitch,
        volume: voiceSettings.volume
      }
    };

    playAlert(testAlert);
  };

  const stopCurrentAlert = () => {
    if (synthesisRef.current) {
      synthesisRef.current.cancel();
      setIsPlaying(false);
      setCurrentlyPlaying(null);
    }
  };

  const markAllAsPlayed = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, hasBeenPlayed: true })));
  };

  const resetAlerts = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, hasBeenPlayed: false, repeatCount: 0 })));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case 'low_stock': return <Package className="w-4 h-4" />;
      case 'out_of_stock': return <AlertTriangle className="w-4 h-4" />;
      case 'expiring': return <Clock className="w-4 h-4" />;
      case 'reorder': return <RefreshCw className="w-4 h-4" />;
      case 'quality_issue': return <Target className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  const unplayedAlertsCount = alerts.filter(alert => !alert.hasBeenPlayed).length;
  const criticalAlertsCount = alerts.filter(alert => alert.priority === 'critical' && !alert.hasBeenPlayed).length;

  return (
    <div className="white-background min-h-screen">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate('/main')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={voiceSettings.enabled ? stopCurrentAlert : () => setVoiceSettings(prev => ({ ...prev, enabled: true }))}
              className={`text-white ${voiceSettings.enabled ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {voiceSettings.enabled ? (
                <>
                  <VolumeX className="w-4 h-4 mr-2" />
                  Stop Alerts
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 mr-2" />
                  Enable Alerts
                </>
              )}
            </Button>
            
            <div className="text-right text-gray-600">
              <div className="text-sm font-medium">
                {currentTime.toLocaleDateString()}
              </div>
              <div className="text-xs opacity-70">
                {currentTime.toLocaleTimeString()}
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            <Volume2 className="w-10 h-10 inline mr-3" style={{ color: '#6B46C1' }} />
            Advanced Voice Alert System
          </h1>
          <p className="text-gray-600">Revolutionary audio alerts with speech synthesis and intelligent notifications</p>
        </div>

        {/* Alert Status */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              <Bell className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{unplayedAlertsCount}</div>
              <div className="text-sm text-gray-600">Pending Alerts</div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-900">{criticalAlertsCount}</div>
              <div className="text-sm text-gray-600">Critical Alerts</div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              {voiceSettings.enabled ? (
                <Volume2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
              ) : (
                <VolumeX className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              )}
              <div className={`text-2xl font-bold ${voiceSettings.enabled ? 'text-green-600' : 'text-gray-600'}`}>
                {voiceSettings.enabled ? 'ON' : 'OFF'}
              </div>
              <div className="text-sm text-gray-600">Voice Alerts</div>
            </CardContent>
          </Card>
          <Card className="border-gray-200">
            <CardContent className="p-4 text-center">
              {isPlaying ? (
                <Play className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              ) : (
                <Pause className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              )}
              <div className={`text-2xl font-bold ${isPlaying ? 'text-orange-600' : 'text-gray-600'}`}>
                {isPlaying ? 'PLAYING' : 'IDLE'}
              </div>
              <div className="text-sm text-gray-600">Status</div>
            </CardContent>
          </Card>
        </div>

        {/* Voice Settings */}
        <Card className="mb-8 border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center space-x-2">
              <Settings className="w-5 h-5" style={{ color: '#6B46C1' }} />
              <span>Voice Configuration</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Voice Type</label>
                  <select
                    value={voiceSettings.voice}
                    onChange={(e) => setVoiceSettings(prev => ({ ...prev, voice: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-700"
                  >
                    <option value="female">Female Voice</option>
                    <option value="male">Male Voice</option>
                    {availableVoices.map((voice, index) => (
                      <option key={index} value={voice.name}>{voice.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Speech Speed: {voiceSettings.speed.toFixed(1)}x
                  </label>
                  <Slider
                    value={[voiceSettings.speed]}
                    onValueChange={([value]) => setVoiceSettings(prev => ({ ...prev, speed: value }))}
                    min={0.5}
                    max={2.0}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pitch: {voiceSettings.pitch.toFixed(1)}
                  </label>
                  <Slider
                    value={[voiceSettings.pitch]}
                    onValueChange={([value]) => setVoiceSettings(prev => ({ ...prev, pitch: value }))}
                    min={0.5}
                    max={2.0}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Volume: {Math.round(voiceSettings.volume * 100)}%
                  </label>
                  <Slider
                    value={[voiceSettings.volume]}
                    onValueChange={([value]) => setVoiceSettings(prev => ({ ...prev, volume: value }))}
                    min={0.1}
                    max={1.0}
                    step={0.1}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Test Message</label>
                  <textarea
                    value={testMessage}
                    onChange={(e) => setTestMessage(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
                    placeholder="Enter a test message to hear the voice settings..."
                  />
                </div>

                <Button
                  onClick={testVoiceAlert}
                  disabled={isPlaying}
                  className="w-full text-white"
                  style={{ background: 'linear-gradient(135deg, #4B0082, #6B46C1)' }}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Playing Test...
                    </>
                  ) : (
                    <>
                      <TestTube className="w-4 h-4 mr-2" />
                      Test Voice Alert
                    </>
                  )}
                </Button>

                <div className="space-y-3">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={voiceSettings.soundEffects}
                      onChange={(e) => setVoiceSettings(prev => ({ ...prev, soundEffects: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">Enable sound effects</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={voiceSettings.repeatCriticalAlerts}
                      onChange={(e) => setVoiceSettings(prev => ({ ...prev, repeatCriticalAlerts: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-sm text-gray-700">Repeat critical alerts</span>
                  </label>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alert Hours Start</label>
                    <input
                      type="time"
                      value={voiceSettings.playDuringHours.start}
                      onChange={(e) => setVoiceSettings(prev => ({ 
                        ...prev, 
                        playDuringHours: { ...prev.playDuringHours, start: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Alert Hours End</label>
                    <input
                      type="time"
                      value={voiceSettings.playDuringHours.end}
                      onChange={(e) => setVoiceSettings(prev => ({ 
                        ...prev, 
                        playDuringHours: { ...prev.playDuringHours, end: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Alerts */}
        <Card className="mb-8 border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-900 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-orange-600" />
                <span>Active Voice Alerts</span>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={resetAlerts}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset All
                </Button>
                <Button
                  onClick={markAllAsPlayed}
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark All Played
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.map((alert) => (
                <div 
                  key={alert.id} 
                  className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                    currentlyPlaying === alert.id ? 'border-green-400 bg-green-50' :
                    alert.hasBeenPlayed ? 'border-gray-200 bg-gray-50' :
                    'border-orange-300 bg-orange-50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className={`p-2 rounded-lg ${
                          alert.priority === 'critical' ? 'bg-red-100' :
                          alert.priority === 'high' ? 'bg-orange-100' :
                          alert.priority === 'medium' ? 'bg-yellow-100' :
                          'bg-blue-100'
                        }`}>
                          {getAlertTypeIcon(alert.alertType)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{alert.productName}</h4>
                          <div className="flex items-center space-x-2">
                            <Badge className={getPriorityColor(alert.priority)}>
                              {alert.priority.toUpperCase()}
                            </Badge>
                            <Badge className="bg-blue-100 text-blue-800">{alert.industry}</Badge>
                            {alert.hasBeenPlayed && (
                              <Badge className="bg-green-100 text-green-800">Played</Badge>
                            )}
                            {currentlyPlaying === alert.id && (
                              <Badge className="bg-orange-100 text-orange-800 animate-pulse">Playing</Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-3 mb-3 border border-gray-200">
                        <div className="text-sm font-medium text-gray-700 mb-1">Voice Message:</div>
                        <div className="text-sm text-gray-600 italic">"{alert.message}"</div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div>Alert Time: {new Date(alert.timestamp).toLocaleString()}</div>
                        <div>Repeat Count: {alert.repeatCount}</div>
                        <div>Voice: {alert.voiceSettings.voice}</div>
                      </div>
                    </div>

                    <div className="ml-6 flex flex-col space-y-2">
                      <Button
                        onClick={() => playAlert(alert)}
                        disabled={isPlaying}
                        size="sm"
                        className="text-white"
                        style={{ background: 'linear-gradient(135deg, #4B0082, #6B46C1)' }}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Play
                      </Button>
                      {alert.soundEffect && (
                        <Button
                          onClick={() => playAlertSound(alert.priority)}
                          size="sm"
                          variant="outline"
                          className="border-gray-300 text-gray-700"
                        >
                          <Speaker className="w-4 h-4 mr-1" />
                          Sound
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            onClick={() => navigate('/product-alerts')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #4B0082, #6B46C1)' }}
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">Product Alerts</div>
              <div className="text-xs opacity-80">Configure alert rules</div>
            </div>
          </Button>
          
          <Button
            onClick={() => navigate('/automated-ordering')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #4B0082, #6B46C1)' }}
          >
            <Zap className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">Auto-Ordering</div>
              <div className="text-xs opacity-80">Automated reordering</div>
            </div>
          </Button>
          
          <Button
            onClick={() => navigate('/inventory')}
            className="h-16 text-white"
            style={{ background: 'linear-gradient(135deg, #4B0082, #6B46C1)' }}
          >
            <Package className="w-5 h-5 mr-2" />
            <div className="text-left">
              <div className="font-semibold">Inventory</div>
              <div className="text-xs opacity-80">Manage products</div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}