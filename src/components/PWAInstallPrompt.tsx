/**
 * PWA Install Prompt Component
 * Enhanced installation experience for MaycoleTracker™ Volume XI
 */

import React, { useState, useEffect } from 'react';
import { Download, X, Smartphone, Monitor } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export default function PWAInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check if running as standalone PWA
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);

    // Check if iOS
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
      
      // Show prompt after a delay if not already installed
      setTimeout(() => {
        if (!isStandalone) {
          setShowPrompt(true);
        }
      }, 5000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Hide prompt if app gets installed
    const handleAppInstalled = () => {
      setShowPrompt(false);
      setInstallPrompt(null);
      console.log('🎉 MaycoleTracker™ PWA installed successfully!');
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isStandalone]);

  const handleInstall = async () => {
    if (!installPrompt) return;

    // Show install prompt
    await installPrompt.prompt();
    
    // Wait for user choice
    const { outcome } = await installPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('✅ User accepted MaycoleTracker™ PWA install');
    } else {
      console.log('❌ User dismissed MaycoleTracker™ PWA install');
    }
    
    setInstallPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // Don't show again for this session
    sessionStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already dismissed this session or running standalone
  if (isStandalone || sessionStorage.getItem('pwa-install-dismissed')) {
    return null;
  }

  // iOS install instructions
  if (isIOS && showPrompt) {
    return (
      <div className="pwa-install-banner show">
        <div className="pwa-install-content">
          <div className="pwa-install-title">Install MaycoleTracker™</div>
          <div className="pwa-install-text">
            Tap <strong>Share</strong> → <strong>Add to Home Screen</strong> for the best experience
          </div>
        </div>
        <div className="pwa-install-buttons">
          <button onClick={handleDismiss} className="pwa-install-btn">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Standard install prompt
  if (installPrompt && showPrompt) {
    return (
      <div className="pwa-install-banner show">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <Smartphone className="w-5 h-5" />
          </div>
          <div className="pwa-install-content">
            <div className="pwa-install-title">Install MaycoleTracker™</div>
            <div className="pwa-install-text">
              Get the full app experience with offline access and push notifications
            </div>
          </div>
        </div>
        <div className="pwa-install-buttons">
          <button onClick={handleInstall} className="pwa-install-btn primary">
            <Download className="w-4 h-4 mr-2" />
            Install
          </button>
          <button onClick={handleDismiss} className="pwa-install-btn">
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return null;
}

// PWA Update Available Component
export function PWAUpdatePrompt() {
  const [updateAvailable, setUpdateAvailable] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        setUpdateAvailable(true);
      });
    }
  }, []);

  const handleUpdate = () => {
    window.location.reload();
  };

  if (!updateAvailable) return null;

  return (
    <div className="pwa-install-banner show">
      <div className="pwa-install-content">
        <div className="pwa-install-title">Update Available</div>
        <div className="pwa-install-text">
          A new version of MaycoleTracker™ is ready
        </div>
      </div>
      <div className="pwa-install-buttons">
        <button onClick={handleUpdate} className="pwa-install-btn primary">
          Update
        </button>
        <button onClick={() => setUpdateAvailable(false)} className="pwa-install-btn">
          Later
        </button>
      </div>
    </div>
  );
}

// Offline Status Component
export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className="offline-indicator show">
      📡 You're offline - Some features may be limited
    </div>
  );
}