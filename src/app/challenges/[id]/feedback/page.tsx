'use client';

import { useState, useEffect, FormEvent } from 'react';
import { useParams } from 'next/navigation';
import { getSolutionFeedback, SolutionFeedbackInput } from '@/ai/flows/solution-improver';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Sparkles, Lightbulb, Loader2 } from 'lucide-react';
import type { Challenge } from '@/types';
import challengesData from '@/data/challenges.json';

const AIFeedbackPage = () => {
  const params = useParams();
  const challengeId = params?.id as string;

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [userSubmission, setUserSubmission] = useState('');
  const [peerReview1, setPeerReview1] = useState('');
  const [peerReview2, setPeerReview2] = useState('');
  const [aiFeedback, setAiFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(() => {
    if (challengeId) {
      const foundChallenge = (challengesData as Challenge[]).find(c => c.id === challengeId);
      setChallenge(foundChallenge || null);
      
      if (typeof window !== 'undefined') {
        const storedSubmission = sessionStorage.getItem(`submission_${challengeId}`);
        if (storedSubmission) {
          setUserSubmission(storedSubmission);
        }
      }
      setPageLoading(false);
    }
  }, [challengeId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!challenge || !userSubmission) {
      setError("Challenge details or your submission is missing.");
      return;
    }

    setIsLoading(true);
    setAiFeedback(null);
    setError(null);

    const input: SolutionFeedbackInput = {
      submission: userSubmission,
      peerReviews: [peerReview1, peerReview2].filter(review => review.trim() !== ''),
      challengeDescription: challenge.description + (challenge.details ? `\n\nDetails: ${challenge.details}` : ''),
    };

    try {
      const result = await getSolutionFeedback(input);
      setAiFeedback(result.feedback);
    } catch (err) {
      console.error("Error getting AI feedback:", err);
      setError("Failed to get AI feedback. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (pageLoading) {
    return <div className="text-center py-10">Loading feedback session...</div>;
  }

  if (!challenge) {
    return <div className="text-center py-10 text-destructive">Challenge not found for feedback.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary flex items-center">
            <Sparkles className="h-6 w-6 mr-2" /> AI Feedback for: {challenge.title}
          </CardTitle>
          <CardDescription>
            Get AI-powered insights on your solution based on your submission and peer reviews.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="userSubmission" className="text-lg font-semibold">Your Submission</Label>
              <Textarea
                id="userSubmission"
                value={userSubmission}
                onChange={(e) => setUserSubmission(e.target.value)}
                rows={8}
                className="mt-1"
                required
                readOnly={!!sessionStorage.getItem(`submission_${challengeId}`)} // Make read-only if pre-filled
              />
              {!sessionStorage.getItem(`submission_${challengeId}`) && (
                 <p className="text-xs text-muted-foreground mt-1">If your submission is not pre-filled, please paste it here.</p>
              )}
            </div>

            <div>
              <Label htmlFor="peerReview1" className="text-lg font-semibold">Mock Peer Review #1 (Optional)</Label>
              <Textarea
                id="peerReview1"
                placeholder="Enter first mock peer review here..."
                value={peerReview1}
                onChange={(e) => setPeerReview1(e.target.value)}
                rows={3}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="peerReview2" className="text-lg font-semibold">Mock Peer Review #2 (Optional)</Label>
              <Textarea
                id="peerReview2"
                placeholder="Enter second mock peer review here..."
                value={peerReview2}
                onChange={(e) => setPeerReview2(e.target.value)}
                rows={3}
                className="mt-1"
              />
            </div>
            
            <p className="text-sm text-muted-foreground">
              For this MVP, you can type in 1-2 examples of feedback you might receive from peers. In a full version, these would come from actual peer reviews.
            </p>

            <Button type="submit" className="w-full" disabled={isLoading || !userSubmission.trim()}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Lightbulb className="mr-2 h-4 w-4" />
              )}
              Get AI Feedback
            </Button>
          </form>

          {error && (
            <Alert variant="destructive" className="mt-6">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {aiFeedback && (
            <Card className="mt-8 bg-secondary/30">
              <CardHeader>
                <CardTitle className="font-headline text-xl text-primary flex items-center">
                  <Sparkles className="h-5 w-5 mr-2" /> AI-Powered Feedback
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none text-foreground">
                  {aiFeedback.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIFeedbackPage;
