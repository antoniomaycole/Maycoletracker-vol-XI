/**
 * MaycoleTracker™ Volume XI - Floating Action Menu
 * Quick access to common operations from any page
 */

import React, { useState } from 'react';
import { Plus, Package, Scan, Camera, Mic, X, Upload, Download } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function FloatingActionMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // PROTECTED: Never show on logo page - keeps logo page completely untouched
  if (location.pathname === '/') {
    return null;
  }

  const actions = [
    { 
      icon: Package, 
      label: 'Add Inventory', 
      path: '/inventory',
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Quick add items'
    },
    { 
      icon: Scan, 
      label: 'Scan Item', 
      path: '/scanner',
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'Barcode scanner'
    },
    { 
      icon: Camera, 
      label: 'Photo Capture', 
      path: '/camera',
      color: 'bg-green-500 hover:bg-green-600',
      description: 'Take photos'
    },
    { 
      icon: Mic, 
      label: 'Voice Command', 
      path: '/voice',
      color: 'bg-orange-500 hover:bg-orange-600',
      description: 'Voice control'
    }
  ];

  const handleAction = (path: string) => {
    navigate(path);
    setIsOpen(false);
    
    // Voice feedback
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(`Opening ${path.replace('/', '').replace('-', ' ')}`);
      utterance.volume = 0.3;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,.csv,.xlsx';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log('Importing file:', file.name);
        if ('speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(`Importing file: ${file.name}`);
          utterance.volume = 0.3;
          window.speechSynthesis.speak(utterance);
        }
      }
    };
    input.click();
    setIsOpen(false);
  };

  const handleExport = () => {
    const data = { 
      timestamp: new Date().toISOString(),
      system: 'MaycoleTracker™ Volume XI',
      version: 'Enterprise Edition'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `maycoletracker-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setIsOpen(false);
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance('Data exported successfully');
      utterance.volume = 0.3;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* Action Menu Items */}
      {isOpen && (
        <div className="mb-4 space-y-3">
          {/* File Operations */}
          <div className="flex flex-col space-y-2">
            <button
              onClick={handleImport}
              className="flex items-center space-x-3 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 group"
            >
              <Upload className="w-5 h-5" />
              <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Import Data
              </span>
            </button>
            
            <button
              onClick={handleExport}
              className="flex items-center space-x-3 bg-teal-500 hover:bg-teal-600 text-white px-4 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 group"
            >
              <Download className="w-5 h-5" />
              <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                Export Data
              </span>
            </button>
          </div>

          {/* Main Actions */}
          {actions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleAction(action.path)}
              className={`flex items-center space-x-3 ${action.color} text-white px-4 py-3 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200 group`}
              style={{ animationDelay: `${index * 50}ms` }}
              title={action.description}
            >
              <action.icon className="w-5 h-5" />
              <span className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Main FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600 rotate-45' 
            : 'bg-blue-500 hover:bg-blue-600'
        }`}
        style={{ background: isOpen ? '#ef4444' : 'linear-gradient(135deg, #4A9BFF, #3B82F6)' }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur-sm -z-10"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}