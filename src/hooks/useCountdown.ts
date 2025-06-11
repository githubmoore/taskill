'use client';

import { useState, useEffect, useCallback } from 'react';

export const useCountdown = (initialMinutes: number, onTimeout?: () => void) => {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isActive && !isPaused && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (totalSeconds === 0 && isActive) {
      setIsActive(false);
      if (onTimeout) {
        onTimeout();
      }
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, totalSeconds, onTimeout]);

  const start = useCallback(() => {
    setTotalSeconds(initialMinutes * 60); // Reset timer to initial value
    setIsActive(true);
    setIsPaused(false);
  }, [initialMinutes]);

  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  const reset = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
    setTotalSeconds(initialMinutes * 60);
  }, [initialMinutes]);
  
  const stop = useCallback(() => {
    setIsActive(false);
    setIsPaused(false);
  }, []);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const timeRemainingFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const timeElapsedMinutes = initialMinutes - (totalSeconds / 60);


  return { 
    timeRemainingFormatted, 
    totalSeconds, 
    isActive, 
    isPaused, 
    start, 
    pause, 
    resume, 
    reset,
    stop,
    timeElapsedMinutes
  };
};
