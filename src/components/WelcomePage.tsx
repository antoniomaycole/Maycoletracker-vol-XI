/**
 * WelcomePage Component - Enhanced Welcome Experience
 * Crafted by UI/UX Engineer Antonio G M
 * Powered by the MAYCOLE Method™ - Modular. Teachable. Scalable.
 */

import React from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MaycoleTrackerLogo } from './MaycoleTrackerLogo';
import { MaycoleMethodBranding } from './MaycoleMethodBranding';
import { 
  Sparkles, 
  Code, 
  Layers, 
  ArrowRight,
  Star,
  Award,
  Zap
} from 'lucide-react';

interface WelcomePageProps {
  onGetStarted?: () => void;
  onExploreFeatures?: () => void;
  className?: string;
}

export default function WelcomePage({ 
  onGetStarted, 
  onExploreFeatures, 
  className = '' 
}: WelcomePageProps) {
  return (
    <div className={`welcome-page min-h-screen ${className}`}>
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-purple-600/5 to-pink-600/10"></div>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8"
            >
              <MaycoleTrackerLogo size="hero" />
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Welcome to
              </span>
              <br />
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                MAYCOLETracker<span className="tm-large">™</span> Vol XI
              </span>
            </motion.h1>

            {/* Credits Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="mb-8 space-y-4"
            >
              {/* Engineer Credit */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg backdrop-blur-sm border border-white/10">
                  <Code className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-lg md:text-xl text-gray-200 font-medium">
                  Crafted by{' '}
                  <span className="font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    UI/UX Engineer Antonio G M
                  </span>
                </p>
                <Badge variant="outline" className="text-blue-400 border-blue-400/50">
                  <Star className="w-3 h-3 mr-1" />
                  Creator
                </Badge>
              </div>

              {/* MAYCOLE Method Branding */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="mb-6"
              >
                <MaycoleMethodBranding 
                  variant="hero" 
                  size="large" 
                  showDescription={false}
                  showPulse={true}
                />
              </motion.div>

              {/* Core Values */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0, duration: 0.6 }}
                className="flex flex-wrap justify-center gap-4 mb-8"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-sm border border-blue-400/20 rounded-full">
                  <Layers className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-100 font-medium">Modular</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-purple-600/10 backdrop-blur-sm border border-purple-400/20 rounded-full">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span className="text-purple-100 font-medium">Teachable</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/10 to-pink-600/10 backdrop-blur-sm border border-pink-400/20 rounded-full">
                  <Zap className="w-4 h-4 text-pink-400" />
                  <span className="text-pink-100 font-medium">Scalable</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                onClick={onGetStarted}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button
                onClick={onExploreFeatures}
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 rounded-full transition-all duration-300"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Explore Features
              </Button>
            </motion.div>

            {/* Feature Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-blue-500/20 rounded-lg w-fit mx-auto mb-4">
                    <Layers className="w-6 h-6 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Enterprise Ready</h3>
                  <p className="text-gray-300 text-sm">
                    Production-grade inventory management with multi-industry support
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-purple-500/20 rounded-lg w-fit mx-auto mb-4">
                    <Award className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">AI Powered</h3>
                  <p className="text-gray-300 text-sm">
                    Advanced analytics and insights driven by the MAYCOLE Method™
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="p-3 bg-pink-500/20 rounded-lg w-fit mx-auto mb-4">
                    <Zap className="w-6 h-6 text-pink-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">Lightning Fast</h3>
                  <p className="text-gray-300 text-sm">
                    Progressive Web App with offline support and real-time sync
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>

        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              initial={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
              }}
              animate={{
                y: [null, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Named export for consistency with other components
export { WelcomePage };