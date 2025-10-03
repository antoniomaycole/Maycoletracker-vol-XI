/**
 * MaycoleTracker™ Volume XI - Service Worker
 * Progressive Web App functionality with offline support and caching
 */

const CACHE_NAME = 'maycoletracker-v11-0-1';
const RUNTIME_CACHE = 'maycoletracker-runtime';

// Essential files to cache for offline functionality
const PRECACHE_ASSETS = [
  '/',
  '/main',
  '/inventory',
  '/analytics',
  '/scanner',
  '/ai',
  '/voice-alerts',
  '/automated-ordering',
  '/business-analytics',
  '/spending-reports',
  '/subscription',
  '/investor-presentation',
  '/manifest.json',
  '/favicon.svg',
  '/icon-192.png',
  '/icon-512.png'
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  console.log('MaycoleTracker™ SW: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('MaycoleTracker™ SW: Caching app shell');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        console.log('MaycoleTracker™ SW: Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('MaycoleTracker™ SW: Installation failed:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('MaycoleTracker™ SW: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              console.log('MaycoleTracker™ SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('MaycoleTracker™ SW: Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-HTTP requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  // Handle navigation requests (SPA routing)
  if (request.mode === 'navigate') {
    event.respondWith(
      caches.match('/')
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return fetch('/').then((response) => {
            if (response.ok) {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put('/', responseClone);
              });
            }
            return response;
          });
        })
        .catch(() => {
          // Offline fallback
          return caches.match('/') || new Response(
            `<!DOCTYPE html>
            <html>
            <head>
              <title>MaycoleTracker™ - Offline</title>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <style>
                body { 
                  font-family: system-ui, sans-serif; 
                  text-align: center; 
                  padding: 2rem;
                  background: linear-gradient(135deg, #007BFF 0%, #0056b3 100%);
                  color: white;
                  min-height: 100vh;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  flex-direction: column;
                }
                .logo { font-size: 2rem; font-weight: bold; margin-bottom: 1rem; }
                .message { font-size: 1.25rem; margin-bottom: 2rem; }
                .retry { 
                  background: rgba(255,255,255,0.2); 
                  border: 2px solid white; 
                  color: white; 
                  padding: 1rem 2rem; 
                  border-radius: 8px; 
                  cursor: pointer;
                  font-size: 1rem;
                  font-weight: 600;
                }
                .retry:hover { background: rgba(255,255,255,0.3); }
              </style>
            </head>
            <body>
              <div class="logo">MaycoleTracker™ vol. XI</div>
              <div class="message">You're currently offline. Some features may be limited.</div>
              <button class="retry" onclick="window.location.reload()">Try Again</button>
            </body>
            </html>`,
            { headers: { 'Content-Type': 'text/html' } }
          );
        })
    );
    return;
  }

  // Cache-first strategy for assets
  if (request.destination === 'script' || 
      request.destination === 'style' || 
      request.destination === 'image' ||
      request.destination === 'font') {
    
    event.respondWith(
      caches.match(request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(request).then((networkResponse) => {
            if (networkResponse.ok) {
              const responseClone = networkResponse.clone();
              caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return networkResponse;
          });
        })
        .catch(() => {
          // Return a fallback for images
          if (request.destination === 'image') {
            return new Response(
              '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#007BFF"/><text x="100" y="100" text-anchor="middle" fill="white" font-family="system-ui" font-size="14">MaycoleTracker™</text></svg>',
              { headers: { 'Content-Type': 'image/svg+xml' } }
            );
          }
        })
    );
    return;
  }

  // Network-first strategy for API calls and dynamic content
  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse.ok) {
          const responseClone = networkResponse.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(request);
      })
  );
});

// Handle push notifications
self.addEventListener('push', (event) => {
  console.log('MaycoleTracker™ SW: Push received');
  
  const options = {
    body: event.data ? event.data.text() : 'New inventory alert from MaycoleTracker™',
    icon: '/icon-192.png',
    badge: '/icon-72.png',
    vibrate: [200, 100, 200],
    data: {
      timestamp: Date.now(),
      url: '/'
    },
    actions: [
      {
        action: 'view',
        title: 'View Details',
        icon: '/icons/view-action.png'
      },
      {
        action: 'dismiss',
        title: 'Dismiss',
        icon: '/icons/dismiss-action.png'
      }
    ],
    requireInteraction: true,
    silent: false
  };

  event.waitUntil(
    self.registration.showNotification('MaycoleTracker™ Alert', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('MaycoleTracker™ SW: Notification clicked');
  
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    );
  } else if (event.action === 'dismiss') {
    // Just close the notification
    return;
  } else {
    // Default action - open the app
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        for (const client of clientList) {
          if (client.url === self.registration.scope && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
    );
  }
});

// Handle background sync
self.addEventListener('sync', (event) => {
  console.log('MaycoleTracker™ SW: Background sync triggered');
  
  if (event.tag === 'inventory-sync') {
    event.waitUntil(
      // Sync inventory data when back online
      syncInventoryData()
    );
  }
});

// Background sync function
async function syncInventoryData() {
  try {
    console.log('MaycoleTracker™ SW: Syncing inventory data...');
    
    // Get pending data from IndexedDB
    const pendingData = await getPendingInventoryData();
    
    if (pendingData.length > 0) {
      // Send to server
      for (const data of pendingData) {
        try {
          await fetch('/api/inventory/sync', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          
          // Remove from pending queue
          await removePendingData(data.id);
        } catch (error) {
          console.error('MaycoleTracker™ SW: Sync failed for item:', data.id, error);
        }
      }
      
      console.log('MaycoleTracker™ SW: Inventory sync complete');
    }
  } catch (error) {
    console.error('MaycoleTracker™ SW: Background sync failed:', error);
  }
}

// IndexedDB helper functions (simplified for demo)
async function getPendingInventoryData() {
  // In a real implementation, this would retrieve from IndexedDB
  return [];
}

async function removePendingData(id) {
  // In a real implementation, this would remove from IndexedDB
  console.log('MaycoleTracker™ SW: Removed synced data:', id);
}

// Log service worker version
console.log('MaycoleTracker™ vol. XI Service Worker v11.0.1 loaded');

// Handle periodic background sync (if supported)
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'inventory-check') {
    event.waitUntil(
      performPeriodicInventoryCheck()
    );
  }
});

async function performPeriodicInventoryCheck() {
  try {
    console.log('MaycoleTracker™ SW: Performing periodic inventory check...');
    
    // Check for low stock items
    const response = await fetch('/api/inventory/check-low-stock');
    if (response.ok) {
      const lowStockItems = await response.json();
      
      if (lowStockItems.length > 0) {
        // Show notification for low stock
        await self.registration.showNotification('MaycoleTracker™ Low Stock Alert', {
          body: `${lowStockItems.length} items are running low`,
          icon: '/icon-192.png',
          badge: '/icon-72.png',
          data: { url: '/inventory' },
          requireInteraction: true
        });
      }
    }
  } catch (error) {
    console.error('MaycoleTracker™ SW: Periodic check failed:', error);
  }
}