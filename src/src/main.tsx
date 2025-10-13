/**
 * MaycoleTracker™ Volume XI - PWA Entry Point
 * Complete Progressive Web Application with offline support
 * Enterprise inventory management with service worker integration
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Import styles first
import '../styles/globals.css'

// Import main app
import App from '../App'

// Service Worker Registration for PWA
async function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    try {
      console.log('🚀 Registering MaycoleTracker™ Service Worker...');
      
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      
      console.log('✅ Service Worker registered successfully:', registration);
      
      // Handle service worker updates
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          console.log('🔄 New Service Worker found, installing...');
          
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('✨ New Service Worker installed, ready for activation');
              
                      // Notify user about update
              if (window.confirm('MAYCOLETracker™ Vol XI - New version available! Click OK to update.')) {
                newWorker.postMessage({ type: 'SKIP_WAITING' });
                window.location.reload();
              }
            }
          });
        }
      });
      
      // Listen for messages from service worker
      navigator.serviceWorker.addEventListener('message', (event) => {
        console.log('📨 Message from Service Worker:', event.data);
        
        if (event.data.type === 'NOTIFICATION_CLICK') {
          // Handle notification clicks
          handleNotificationAction(event.data);
        }
      });
      
      return registration;
    } catch (error) {
      console.error('❌ Service Worker registration failed:', error);
    }
  } else {
    console.warn('⚠️ Service Workers not supported in this browser');
  }
}

// Handle notification actions
function handleNotificationAction(data: any) {
  console.log('🔔 Handling notification action:', data);
  
  // You can dispatch custom events here to communicate with your React app
  window.dispatchEvent(new CustomEvent('notification-action', { detail: data }));
}

// PWA Install Prompt Handler
let deferredPrompt: any;

window.addEventListener('beforeinstallprompt', (event) => {
  console.log('📱 PWA install prompt available');
  
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault();
  
  // Save the event so it can be triggered later
  deferredPrompt = event;
  
  // Show custom install button or notification
  window.dispatchEvent(new CustomEvent('pwa-installable'));
});

// PWA Install Function (can be called from your React components)
(window as any).installPWA = async () => {
  if (deferredPrompt) {
    console.log('🚀 Triggering PWA install...');
    
    deferredPrompt.prompt();
    
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`PWA install outcome: ${outcome}`);
    
    deferredPrompt = null;
    
    return outcome === 'accepted';
  }
  
  return false;
};

// Handle PWA install success
window.addEventListener('appinstalled', () => {
  console.log('✅ MAYCOLETracker™ Vol XI PWA installed successfully');
  
  // Hide install button
  window.dispatchEvent(new CustomEvent('pwa-installed'));
  
  // Track installation (you can add analytics here)
  console.log('📊 MAYCOLETracker™ Vol XI installation tracked - Powered by MAYCOLE Method™');
});

// Offline/Online Status Handling
function handleOnlineStatus() {
  const updateOnlineStatus = () => {
    const isOnline = navigator.onLine;
    console.log(`🌐 Network status: ${isOnline ? 'Online' : 'Offline'}`);
    
    // Dispatch custom event for React components to listen to
    window.dispatchEvent(new CustomEvent('network-status', { 
      detail: { isOnline } 
    }));
    
    if (isOnline) {
      // Request background sync when coming back online
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'REQUEST_SYNC',
          tag: 'inventory-sync'
        });
      }
    }
  };
  
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  
  // Initial status check
  updateOnlineStatus();
}

// Background Sync Registration
function registerBackgroundSync() {
  if ('serviceWorker' in navigator && 'sync' in window.ServiceWorkerRegistration.prototype) {
    console.log('🔄 Background Sync supported');
    
    // Function to request sync (can be called from React components)
    (window as any).requestSync = (tag: string = 'inventory-sync') => {
      if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
          type: 'REQUEST_SYNC',
          tag
        });
      }
    };
  } else {
    console.warn('⚠️ Background Sync not supported');
  }
}

// Push Notifications Setup
async function setupPushNotifications() {
  if ('Notification' in window && 'serviceWorker' in navigator) {
    console.log('🔔 Setting up push notifications...');
    
    // Function to request notification permission (can be called from React components)
    (window as any).requestNotificationPermission = async () => {
      const permission = await Notification.requestPermission();
      console.log(`🔔 Notification permission: ${permission}`);
      
      if (permission === 'granted') {
        console.log('✅ Notifications enabled');
        
        // You can subscribe to push notifications here
        // This would typically involve your backend for push subscriptions
        
        return true;
      }
      
      return false;
    };
    
    // Check current permission
    console.log(`🔔 Current notification permission: ${Notification.permission}`);
  } else {
    console.warn('⚠️ Push notifications not supported');
  }
}

// App Cache Management
function setupCacheManagement() {
  // Function to clear app cache (can be called from React components)
  (window as any).clearAppCache = async () => {
    if ('caches' in window) {
      try {
        const cacheNames = await caches.keys();
        const deletePromises = cacheNames.map(name => caches.delete(name));
        await Promise.all(deletePromises);
        
        console.log('🗑️ App cache cleared');
        return true;
      } catch (error) {
        console.error('❌ Failed to clear cache:', error);
        return false;
      }
    }
    return false;
  };
  
  // Function to get cache size (can be called from React components)
  (window as any).getCacheSize = async () => {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      try {
        const estimate = await navigator.storage.estimate();
        return {
          used: estimate.usage || 0,
          quota: estimate.quota || 0,
          usedMB: Math.round((estimate.usage || 0) / 1024 / 1024 * 100) / 100,
          quotaMB: Math.round((estimate.quota || 0) / 1024 / 1024 * 100) / 100
        };
      } catch (error) {
        console.error('❌ Failed to get cache size:', error);
        return null;
      }
    }
    return null;
  };
}

// Initialize PWA features
async function initializePWA() {
  console.log('🚀 Initializing MaycoleTracker™ PWA features...');
  
  await registerServiceWorker();
  handleOnlineStatus();
  registerBackgroundSync();
  await setupPushNotifications();
  setupCacheManagement();
  
  console.log('✅ PWA initialization complete');
}

// Initialize everything
initializePWA();

// Render React App
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)