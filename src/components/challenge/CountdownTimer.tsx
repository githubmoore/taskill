
'use client';

import { useEffect } from 'react';
import type { useCountdown } from '@/hooks/useCountdown'; // Import the type
import { Card, CardContent } from '@/components/ui/card';
import { TimerIcon } from 'lucide-react';

interface CountdownTimerProps {
  onTimeout?: () => void;
  countdownControl: ReturnType<typeof useCountdown>;
  autoStart?: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  countdownControl,
  autoStart = false, // Default autoStart to false, parent will control start
}) => {
  const { timeRemainingFormatted, isActive, totalSeconds, start } = countdownControl;

  useEffect(() => {
    // This effect handles auto-starting if the autoStart prop is true AND timer isn't already active.
    // However, in the enhanced ChallengeDetailPage, start() is called manually.
    if (autoStart && !isActive && totalSeconds > 0) { 
      start();
    }
  }, [autoStart, isActive, start, totalSeconds]);

  const urgencyClass = totalSeconds <= 60 ? 'text-destructive' : totalSeconds <= 300 ? 'text-yellow-500' : 'text-green-600';

  // Only render the timer if it's active or has been started (totalSeconds might be initial value if not started yet)
  // This prevents showing 00:00 before the challenge actually starts if autoStart is false.
  // The parent component (ChallengeDetailPage) now controls when this component is rendered based on challengeStarted state.

  return (
    <Card className="mb-6 shadow-md">
      <CardContent className="p-4 flex items-center justify-center space-x-2">
        <TimerIcon className={`h-6 w-6 ${urgencyClass}`} />
        <span className={`text-2xl font-mono font-bold ${urgencyClass}`}>
          {timeRemainingFormatted}
        </span>
        <span className="text-sm text-muted-foreground">remaining</span>
      </CardContent>
    </Card>
  );
};

export default CountdownTimer;
