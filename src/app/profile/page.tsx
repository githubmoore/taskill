
'use client';

import { useUserProfile } from '@/hooks/useUserProfile';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Award, CheckCircle, ListChecks, TimerIcon, BarChart3, Mail, Share2 } from 'lucide-react';
import ProfileBadges from '@/components/profile/ProfileBadges';
import VerificationModal from '@/components/profile/VerificationModal';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import Link from 'next/link';

const ProfilePage = () => {
  const { profile, loading, setLinkedInVerified, setWhatsAppVerified } = useUserProfile();
  const { toast } = useToast();

  const handleShareProfile = () => {
    if (typeof window !== 'undefined' && profile) {
      // For MVP, this is a mock. A real implementation might generate a unique URL or copy data.
      const shareableLink = `${window.location.origin}/profile?data=${btoa(JSON.stringify(profile))}`; // Example, not secure for real data
      navigator.clipboard.writeText(`Check out my OneTask profile! I have ${profile.stars} stars. (Mock link for MVP)`);
      toast({
        title: "Profile Link Copied (Mock)",
        description: "A mock shareable link has been copied to your clipboard.",
      });
    }
  };


  if (loading) {
    return <div className="text-center py-10">Loading profile...</div>;
  }

  if (!profile) {
    return <div className="text-center py-10 text-destructive">Could not load profile.</div>;
  }

  const averageStars = profile.challengeHistory.length > 0
    ? (profile.challengeHistory.reduce((acc, curr) => acc + curr.starsEarned, 0) / profile.challengeHistory.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-8">
      <Card className="shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-accent h-32 md:h-40 relative">
          <Image 
            src="https://placehold.co/1200x200.png" 
            alt="Profile banner" 
            layout="fill" 
            objectFit="cover" 
            className="opacity-30" 
            data-ai-hint="abstract geometric" 
          />
        </div>
        <CardHeader className="text-center -mt-16 relative z-10">
          <Avatar className="w-24 h-24 mx-auto mb-2 border-4 border-background shadow-lg">
            <AvatarImage src={`https://placehold.co/100x100.png`} alt="User Avatar" data-ai-hint="abstract avatar" />
            <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
              {/* Fallback with initials, if name was available */}
              U
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-headline">Your Developer Profile</CardTitle>
          <CardDescription className="text-md">Showcase your skills and achievements.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <Card className="pt-4 pb-2 bg-secondary/30">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-1" />
              <p className="text-3xl font-bold">{profile.stars}</p>
              <p className="text-sm text-muted-foreground">Total Stars</p>
            </Card>
            <Card className="pt-4 pb-2 bg-secondary/30">
              <ListChecks className="h-8 w-8 text-primary mx-auto mb-1" />
              <p className="text-3xl font-bold">{profile.challengeHistory.length}</p>
              <p className="text-sm text-muted-foreground">Challenges Completed</p>
            </Card>
             <Card className="pt-4 pb-2 bg-secondary/30">
              <BarChart3 className="h-8 w-8 text-accent mx-auto mb-1" />
              <p className="text-3xl font-bold">{averageStars}</p>
              <p className="text-sm text-muted-foreground">Avg. Stars</p>
            </Card>
          </div>

          <Separator />

          <div>
            <h3 className="text-xl font-semibold mb-3 font-headline flex items-center">
              <Award className="h-5 w-5 mr-2 text-primary" /> Verification Badges
            </h3>
            <ProfileBadges 
              linkedInVerified={profile.badges.linkedInVerified} 
              whatsAppVerified={profile.badges.whatsAppVerified} 
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <VerificationModal 
                type="linkedin" 
                onVerify={setLinkedInVerified} 
                isVerified={profile.badges.linkedInVerified} 
              />
              <VerificationModal 
                type="whatsapp" 
                onVerify={setWhatsAppVerified} 
                isVerified={profile.badges.whatsAppVerified} 
              />
            </div>
          </div>
          
          <Separator />

          <div>
            <h3 className="text-xl font-semibold mb-3 font-headline flex items-center">
              <ListChecks className="h-5 w-5 mr-2 text-primary" /> Challenge History
            </h3>
            {profile.challengeHistory.length > 0 ? (
              <ScrollArea className="h-64 border rounded-md p-2 bg-background">
                <ul className="space-y-3">
                  {profile.challengeHistory.slice().reverse().map((item) => (
                    <li key={item.id + item.completedAt} className="p-3 bg-card rounded-md shadow-sm hover:bg-secondary/50 transition-colors">
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary text-primary-foreground flex items-center">
                          <Star className="h-3 w-3 mr-1" /> {item.starsEarned}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Completed: {new Date(item.completedAt).toLocaleDateString()}
                      </p>
                      <div className="text-xs text-muted-foreground mt-1 flex items-center justify-between">
                        <span>Category: {item.category}</span>
                        <span className="flex items-center"><TimerIcon className="h-3 w-3 mr-1" />{item.timeLimit} mins</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            ) : (
              <p className="text-muted-foreground text-center py-4">No challenges completed yet. <Button variant="link" asChild><Link href="/challenges">Start a challenge!</Link></Button></p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-center gap-3 border-t pt-6">
            <Button onClick={handleShareProfile} variant="outline">
                <Share2 className="h-4 w-4 mr-2" /> Share Profile (Mock)
            </Button>
            <a href="mailto:support@onetask.example.com?subject=Profile%20Inquiry">
              <Button variant="outline">
                  <Mail className="h-4 w-4 mr-2" /> Contact Support
              </Button>
            </a>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfilePage;
