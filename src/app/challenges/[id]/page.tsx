
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import challengesData from '@/data/challenges.json';
import type { Challenge } from '@/types';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import CountdownTimer from '@/components/challenge/CountdownTimer';
import { useCountdown } from '@/hooks/useCountdown';
import { useUserProfile } from '@/hooks/useUserProfile';
import { CheckCircle, Info, Star, TimerIcon, ChevronRight, Rocket, SendHorizonal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const ChallengeDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [submission, setSubmission] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [challengeStarted, setChallengeStarted] = useState(false);
  
  const { completeChallenge } = useUserProfile();

  useEffect(() => {
    if (params?.id) {
      const foundChallenge = (challengesData as Challenge[]).find(c => c.id === params.id);
      if (foundChallenge) {
        setChallenge(foundChallenge);
      }
      setIsLoading(false);
    }
  }, [params]);

  const countdownControl = useCountdown(challenge?.timeLimit || 0, () => {
    toast({
      title: "Time's up!",
      description: "The challenge time has expired. You can still submit, but no speed bonus will be awarded.",
      variant: "destructive",
    });
  });

  const handleSubmit = () => {
    if (!challenge) return;

    countdownControl.stop();
    const timeElapsed = countdownControl.timeElapsedMinutes;
    
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(`submission_${challenge.id}`, submission);
      sessionStorage.setItem(`challenge_desc_${challenge.id}`, challenge.description);
    }

    const starsEarned = completeChallenge(challenge, timeElapsed);
    
    setIsSubmitted(true);
    toast({
      title: "Submission Successful!",
      description: `You earned a base of ${starsEarned} star(s) for this challenge. Review peers to finalize.`,
      action: (
        <Button asChild variant="outline" size="sm">
          <Link href={`/challenges/${challenge.id}/review`}>Review Peers</Link>
        </Button>
      ),
    });
  };

  const handleStartChallenge = () => {
    if (!challenge) return;
    setChallengeStarted(true);
    countdownControl.start();
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading challenge...</div>;
  }

  if (!challenge) {
    return <div className="text-center py-10 text-destructive">Challenge not found.</div>;
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">{challenge.title}</CardTitle>
          <CardDescription className="flex items-center space-x-4 text-md">
            <span className="flex items-center"><Star className="h-4 w-4 mr-1 text-yellow-500" /> {challenge.stars} Stars</span>
            <span className="flex items-center"><TimerIcon className="h-4 w-4 mr-1" /> {challenge.timeLimit} mins</span>
            <span>Category: {challenge.category}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-foreground">{challenge.description}</p>
          {challenge.details && (
            <Alert variant="default" className="mb-6 bg-secondary">
              <Info className="h-4 w-4" />
              <AlertTitle className="font-semibold">Challenge Details</AlertTitle>
              <AlertDescription>
                {challenge.details}
              </AlertDescription>
            </Alert>
          )}

          {isSubmitted ? (
            <Alert variant="default" className="bg-green-50 border-green-300 text-green-700">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <AlertTitle className="font-semibold">Challenge Submitted!</AlertTitle>
              <AlertDescription>
                Your solution has been recorded. Next, review 3 peer submissions to unlock your full score and AI feedback.
                <Button asChild className="mt-4 w-full group">
                  <Link href={`/challenges/${challenge.id}/review`}>
                    Proceed to Peer Review <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </AlertDescription>
            </Alert>
          ) : !challengeStarted ? (
            <div className="text-center py-6 space-y-4">
              <Alert variant="default" className="bg-secondary/30 text-left">
                <Info className="h-4 w-4" />
                <AlertTitle className="font-semibold">Ready to Begin?</AlertTitle>
                <AlertDescription>
                  You have <strong>{challenge.timeLimit} minutes</strong> to complete this challenge. Once you click "Start Challenge", the timer will begin. Good luck!
                </AlertDescription>
              </Alert>
              <Button onClick={handleStartChallenge} size="lg" className="w-full group">
                <Rocket className="mr-2 h-5 w-5 group-hover:animate-bounce" /> Start Challenge
              </Button>
            </div>
          ) : (
            <>
              <CountdownTimer 
                countdownControl={countdownControl}
                autoStart={false} 
              />
              <Textarea
                placeholder="Enter your solution here..."
                value={submission}
                onChange={(e) => setSubmission(e.target.value)}
                rows={10}
                className="mb-4 focus:ring-primary focus:border-primary text-base"
                disabled={!countdownControl.isActive && countdownControl.totalSeconds === 0}
              />
              <Button onClick={handleSubmit} size="lg" className="w-full group" disabled={!submission.trim() || (!countdownControl.isActive && countdownControl.totalSeconds === 0)}>
                <SendHorizonal className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" /> Submit Solution
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChallengeDetailPage;
