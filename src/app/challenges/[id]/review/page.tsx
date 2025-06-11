'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Eye, Users } from 'lucide-react';
import type { Challenge } from '@/types';
import challengesData from '@/data/challenges.json';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const PEER_REVIEWS_REQUIRED = 3;

const MockPeerReviewPage = () => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const { awardBonusStars } = useUserProfile();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [reviewsCompleted, setReviewsCompleted] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const challengeId = params?.id as string;

  useEffect(() => {
    if (challengeId) {
      const foundChallenge = (challengesData as Challenge[]).find(c => c.id === challengeId);
      setChallenge(foundChallenge || null);
      setIsLoading(false);
    }
  }, [challengeId]);

  const handleReviewAction = () => {
    if (reviewsCompleted < PEER_REVIEWS_REQUIRED) {
      setReviewsCompleted(prev => prev + 1);
      toast({
        title: `Peer Review ${reviewsCompleted + 1}/${PEER_REVIEWS_REQUIRED} Submitted`,
        description: "Great job! Keep reviewing.",
      });
    }
  };

  useEffect(() => {
    if (reviewsCompleted === PEER_REVIEWS_REQUIRED) {
      const bonusForReview = 1; // Award 1 bonus star for completing reviews
      awardBonusStars(bonusForReview);
      toast({
        title: "Peer Reviews Complete!",
        description: `You've earned ${bonusForReview} bonus star! Now, let's get some AI feedback on your solution.`,
        duration: 5000,
      });
    }
  }, [reviewsCompleted, awardBonusStars, toast]);


  if (isLoading) {
    return <div className="text-center py-10">Loading review session...</div>;
  }

  if (!challenge) {
    return <div className="text-center py-10 text-destructive">Challenge not found for review.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary">Peer Review for: {challenge.title}</CardTitle>
          <CardDescription>
            Review {PEER_REVIEWS_REQUIRED} peer submissions to finalize your score and unlock AI feedback. This is a mock process for the MVP.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reviewsCompleted < PEER_REVIEWS_REQUIRED ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Imagine you are reviewing a peer's submission for the challenge: "{challenge.description}"
              </p>
              <div className="p-4 border rounded-md bg-secondary/50">
                <h3 className="font-semibold mb-2">Mock Peer Submission #{reviewsCompleted + 1}</h3>
                <p className="text-xs italic">This is a placeholder for a peer's solution. In a full version, you'd see their actual work here.</p>
              </div>
              <Button onClick={handleReviewAction} className="w-full">
                <Eye className="mr-2 h-4 w-4" /> Submit Review for Peer #{reviewsCompleted + 1}
              </Button>
              <p className="text-center text-sm font-medium">
                Reviews Completed: {reviewsCompleted} / {PEER_REVIEWS_REQUIRED}
              </p>
            </div>
          ) : (
            <div className="text-center space-y-4 py-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-headline font-semibold">All Peer Reviews Completed!</h2>
              <p className="text-muted-foreground">
                You've successfully reviewed {PEER_REVIEWS_REQUIRED} peer submissions.
              </p>
              <Button asChild size="lg" className="w-full">
                <Link href={`/challenges/${challenge.id}/feedback`}>
                  <Users className="mr-2 h-5 w-5" /> Get AI Feedback on Your Solution
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MockPeerReviewPage;
