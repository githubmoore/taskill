'use client';

import { useEffect } from 'react';
import type { useCountdown } from '@/hooks/useCountdown'; // Import the type
import { Card, CardContent } from '@/components/ui/card';
import { TimerIcon } from 'lucide-react';

interface CountdownTimerProps {
  initialMinutes: number;
  onTimeout?: () => void;
  countdownControl: ReturnType<typeof useCountdown>; // Use the imported type
  autoStart?: boolean;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ 
  countdownControl,
  autoStart = true,
}) => {
  const { timeRemainingFormatted, isActive, totalSeconds, start } = countdownControl;

  useEffect(() => {
    if (autoStart && !isActive && totalSeconds > 0) { // Only autostart if not already active and has time
      start();
    }
  }, [autoStart, isActive, start, totalSeconds]);

  const urgencyClass = totalSeconds <= 60 ? 'text-destructive' : totalSeconds <= 300 ? 'text-yellow-500' : 'text-green-600';

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
