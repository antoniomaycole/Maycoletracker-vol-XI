/**
 * MaycoleTracker™ vol. XI Loading Screen
 * Professional loading screen with proper JSX structure and enterprise animations
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
  message?: string;
}

export default function LoadingScreen({ 
  onLoadingComplete, 
  message = "Loading MaycoleTracker™ vol. XI..." 
}: LoadingScreenProps) {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(message);

  useEffect(() => {
    const loadingSequence = async () => {
      try {
        // Step 1: Initialize System (0% -> 33%)
        setStep(1);
        setCurrentMessage("Initializing MaycoleTracker™ vol. XI System...");
        
        for (let i = 0; i <= 33; i++) {
          setProgress(i);
          await new Promise(resolve => setTimeout(resolve, 20));
        }

        // Step 2: Loading Components (33% -> 66%)
        setStep(2);
        setCurrentMessage("Loading Premium Enterprise Components...");
        
        for (let i = 33; i <= 66; i++) {
          setProgress(i);
          await new Promise(resolve => setTimeout(resolve, 25));
        }

        // Step 3: Finalizing (66% -> 100%)
        setStep(3);
        setCurrentMessage("Finalizing Enterprise System Launch...");
        
        for (let i = 66; i <= 100; i++) {
          setProgress(i);
          await new Promise(resolve => setTimeout(resolve, 30));
        }

        // Complete loading after short delay
        setTimeout(() => {
          if (onLoadingComplete) {
            onLoadingComplete();
          }
        }, 500);

      } catch (error) {
        console.error('❌ Loading sequence error:', error);
        setCurrentMessage("Error during loading. Please refresh the page.");
      }
    };

    loadingSequence();
  }, [onLoadingComplete]);



  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center z-50">
      <div className="text-center max-w-md mx-auto p-8">
        
        {/* Professional Logo Animation */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg"
        >
          <span className="drop-shadow-lg">M</span>
        </motion.div>

        {/* Professional Title with Enhanced Branding */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            MAYCOLETracker<span className="tm-medium">™</span>
          </h1>
          <h2 className="text-lg font-semibold text-white/90">
            vol. XI — Enterprise Edition
          </h2>
        </motion.div>

        {/* Enhanced Progress Bar */}
        <div className="w-full bg-gray-700/50 rounded-full h-4 mb-6 overflow-hidden border border-gray-600/30 backdrop-blur-sm">
          <motion.div
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 h-full rounded-full relative"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "easeOut" }}
          >
            {/* Progress bar shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          </motion.div>
        </div>

        {/* Professional Progress Information */}
        <div className="text-white mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-gray-300">
              Step {step} of 3
            </span>
            <span className="text-sm font-bold text-white">
              {progress}% Complete
            </span>
          </div>
          
          <motion.p
            key={currentMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-300 text-sm font-medium"
          >
            {currentMessage}
          </motion.p>
        </div>

        {/* Professional Step Indicators */}
        <div className="flex justify-center space-x-6 mb-8">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ 
                  scale: stepNum <= step ? 1.1 : 0.8,
                  opacity: stepNum <= step ? 1 : 0.5
                }}
                transition={{ duration: 0.3 }}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  stepNum <= step
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg'
                    : 'bg-gray-600/50'
                }`}
              />
              <span className={`text-xs mt-2 transition-colors duration-300 ${
                stepNum <= step ? 'text-white font-medium' : 'text-gray-500'
              }`}>
                {stepNum === 1 ? 'Init' : stepNum === 2 ? 'Load' : 'Launch'}
              </span>
            </div>
          ))}
        </div>

        {/* Professional Features Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="text-center"
        >
          <p className="text-gray-400 text-xs mb-2">
            Enterprise Features Loading...
          </p>
          <div className="flex justify-center space-x-4 text-gray-500 text-xs">
            <span className={progress >= 25 ? 'text-blue-400' : ''}>Analytics</span>
            <span className={progress >= 50 ? 'text-purple-400' : ''}>Scanner</span>
            <span className={progress >= 75 ? 'text-green-400' : ''}>AI Insights</span>
            <span className={progress >= 90 ? 'text-pink-400' : ''}>Voice Control</span>
          </div>
        </motion.div>

      </div>



      {/* Background Pattern Enhancement */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}