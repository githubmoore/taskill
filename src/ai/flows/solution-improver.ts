'use server';

/**
 * @fileOverview A solution feedback AI agent.
 *
 * - getSolutionFeedback - A function that provides feedback on a solution.
 * - SolutionFeedbackInput - The input type for the getSolutionFeedback function.
 * - SolutionFeedbackOutput - The return type for the getSolutionFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SolutionFeedbackInputSchema = z.object({
  submission: z.string().describe('The user submission to the challenge.'),
  peerReviews: z.string().array().describe('An array of peer reviews for the submission.'),
  challengeDescription: z.string().describe('The description of the challenge.'),
});
export type SolutionFeedbackInput = z.infer<typeof SolutionFeedbackInputSchema>;

const SolutionFeedbackOutputSchema = z.object({
  feedback: z.string().describe('AI-powered feedback highlighting areas for improvement.'),
});
export type SolutionFeedbackOutput = z.infer<typeof SolutionFeedbackOutputSchema>;

export async function getSolutionFeedback(input: SolutionFeedbackInput): Promise<SolutionFeedbackOutput> {
  return solutionFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'solutionFeedbackPrompt',
  input: {schema: SolutionFeedbackInputSchema},
  output: {schema: SolutionFeedbackOutputSchema},
  prompt: `You are an AI-powered feedback system designed to provide constructive criticism on user submissions to skill-based challenges.

  Based on the challenge description, the user's submission, and peer reviews, identify areas where the user can improve.

  Challenge Description: {{{challengeDescription}}}

  User Submission: {{{submission}}}

  Peer Reviews:
  {{#each peerReviews}}
  - {{{this}}}
  {{/each}}

  Provide clear, actionable feedback to help the user refine their skills and increase their chances of success in future challenges.
`,
});

const solutionFeedbackFlow = ai.defineFlow(
  {
    name: 'solutionFeedbackFlow',
    inputSchema: SolutionFeedbackInputSchema,
    outputSchema: SolutionFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
