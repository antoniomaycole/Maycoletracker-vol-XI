/**
 * MaycoleTracker™ Loading State Manager
 * Centralized loading state management to prevent 33% issues
 */

import { useState, useEffect, useCallback } from 'react';

export interface LoadingState {
  isLoading: boolean;
  step: number;
  progress: number;
  message: string;
  error?: string;
}

export function useLoadingState(initialMessage = "Loading...") {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
    step: 0,
    progress: 0,
    message: initialMessage,
  });

  const updateStep = useCallback((step: number, message?: string) => {
    setLoadingState(prev => ({
      ...prev,
      step,
      progress: Math.min((step / 3) * 100, 100),
      message: message || prev.message
    }));
  }, []);

  const updateProgress = useCallback((progress: number, message?: string) => {
    setLoadingState(prev => ({
      ...prev,
      progress: Math.min(Math.max(progress, 0), 100),
      message: message || prev.message
    }));
  }, []);

  const completeLoading = useCallback(() => {
    setLoadingState(prev => ({
      ...prev,
      isLoading: false,
      step: 3,
      progress: 100,
      message: "Loading complete!"
    }));
  }, []);

  const setError = useCallback((error: string) => {
    setLoadingState(prev => ({
      ...prev,
      error,
      message: `Error: ${error}`
    }));
  }, []);

  const resetLoading = useCallback((message = "Loading...") => {
    setLoadingState({
      isLoading: true,
      step: 0,
      progress: 0,
      message,
    });
  }, []);

  return {
    loadingState,
    updateStep,
    updateProgress,
    completeLoading,
    setError,
    resetLoading,
    // Convenience getters
    isLoading: loadingState.isLoading,
    step: loadingState.step,
    progress: loadingState.progress,
    message: loadingState.message,
    error: loadingState.error
  };
}

export default useLoadingState;