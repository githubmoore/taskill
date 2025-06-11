
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle, Send } from 'lucide-react';
import type { Challenge } from '@/types'; // Assuming this type is appropriate

// Define the schema for the form
const challengeFormSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters.' }),
  description: z.string().min(20, { message: 'Description must be at least 20 characters.' }),
  category: z.enum(['Coding', 'Logic', 'Design', 'General', 'Other'], { required_error: "Please select a category."}),
  timeLimit: z.coerce.number().positive({ message: 'Time limit must be a positive number.' }).int(),
  stars: z.coerce.number().min(1, {message: "Stars must be at least 1."}).max(5, {message: "Stars cannot exceed 5."}).int(),
  details: z.string().optional(),
});

type ChallengeFormValues = z.infer<typeof challengeFormSchema>;

const PostChallengePage = () => {
  const { toast } = useToast();

  const form = useForm<ChallengeFormValues>({
    resolver: zodResolver(challengeFormSchema),
    defaultValues: {
      title: '',
      description: '',
      category: undefined, // No default category selected
      timeLimit: 15,
      stars: 3,
      details: '',
    },
  });

  const onSubmit = (data: ChallengeFormValues) => {
    // In a real application, you would send this data to your backend.
    console.log('Challenge Data Submitted:', data);
    toast({
      title: 'Challenge Posted (Mock)!',
      description: 'The new challenge has been logged to the console.',
    });
    form.reset(); // Reset form after submission
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-primary flex items-center">
            <PlusCircle className="h-6 w-6 mr-2" /> Post a New Challenge
          </CardTitle>
          <CardDescription>
            Define a new skill-based challenge for applicants. This will help you assess their capabilities effectively.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Challenge Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Advanced Algorithm Solver" {...field} />
                    </FormControl>
                    <FormDescription>
                      A concise and descriptive title for the challenge.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Challenge Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Provide a clear overview of what the applicant needs to do."
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a challenge category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Coding">Coding</SelectItem>
                        <SelectItem value="Logic">Logic</SelectItem>
                        <SelectItem value="Design">Design</SelectItem>
                        <SelectItem value="General">General Aptitude</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Choose the category that best fits this challenge.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="timeLimit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time Limit (minutes)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 30" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stars"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stars (Difficulty/Reward)</FormLabel>
                      <FormControl>
                        <Input type="number" min="1" max="5" placeholder="e.g., 3" {...field} />
                      </FormControl>
                       <FormDescription>
                        1 (easy) to 5 (very hard).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="details"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Details (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any specific instructions, examples, or constraints."
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                    'Submitting...'
                ) : (
                    <>
                        <Send className="mr-2 h-4 w-4" /> Post Challenge
                    </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostChallengePage;
