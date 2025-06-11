import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlayCircle, Eye, Zap, Users, ShieldCheck, TrendingUp } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="space-y-16 py-8">
      <section className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold mb-6">
          Win jobs through skill games
        </h1>
        <p className="text-2xl sm:text-3xl md:text-4xl font-headline text-primary mb-10">
          — skip interviews.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4">
          <Button size="lg" asChild className="group transition-transform hover:scale-105">
            <Link href="/challenges">
              <PlayCircle className="mr-2 h-5 w-5 group-hover:animate-pulse" /> Start Earning Stars
            </Link>
          </Button>
          <Button size="lg" variant="secondary" asChild className="group transition-transform hover:scale-105">
            <Link href="/challenges">
              <Eye className="mr-2 h-5 w-5 group-hover:animate-ping" /> See Sample Challenges
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-3xl font-headline font-semibold mb-4 text-primary">For Applicants</h2>
          <p className="text-lg text-foreground mb-6">
            Showcase your real-world skills by tackling fun challenges. Earn stars, build your profile, and get noticed by companies looking for talent like yours - no resume needed!
          </p>
          <ul className="space-y-3">
            <li className="flex items-center">
              <Zap className="h-5 w-5 text-accent mr-3" /> Prove your abilities with hands-on tasks.
            </li>
            <li className="flex items-center">
              <TrendingUp className="h-5 w-5 text-accent mr-3" /> Collect stars and build a skill-based reputation.
            </li>
            <li className="flex items-center">
              <ShieldCheck className="h-5 w-5 text-accent mr-3" /> Get discovered for what you can do, not just your CV.
            </li>
          </ul>
        </div>
        <div className="flex justify-center">
           <Image src="https://placehold.co/500x350.png" alt="Applicant illustration" width={500} height={350} className="rounded-lg shadow-xl" data-ai-hint="skills challenge" />
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-8 items-center">
         <div className="flex justify-center md:order-last">
           <Image src="https://placehold.co/500x350.png" alt="Company illustration" width={500} height={350} className="rounded-lg shadow-xl" data-ai-hint="talent hiring" />
        </div>
        <div className="md:order-first">
          <h2 className="text-3xl font-headline font-semibold mb-4 text-primary">For Companies</h2>
          <p className="text-lg text-foreground mb-6">
            Discover top talent based on proven skills, not just resumes. Post challenges, see candidates in action, and hire with confidence. It's fast, fair, and effective.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center">
              <Users className="h-5 w-5 text-accent mr-3" /> Access a pool of candidates verified by skill.
            </li>
            <li className="flex items-center">
              <Eye className="h-5 w-5 text-accent mr-3" /> Evaluate practical abilities relevant to your roles.
            </li>
            <li className="flex items-center">
              <TrendingUp className="h-5 w-5 text-accent mr-3" /> Streamline hiring and find the perfect fit faster.
            </li>
          </ul>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-headline font-semibold mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-center font-headline">
                <PlayCircle className="h-6 w-6 mr-2 text-primary" />
                1. Take Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Choose from various skill-based games in coding, logic, design, and more.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-center font-headline">
                <Zap className="h-6 w-6 mr-2 text-primary" />
                2. Earn Stars & Badges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Score points for speed, accuracy, and peer reviews. Unlock badges to verify your profile.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="shadow-lg hover:shadow-xl transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-center font-headline">
                <Users className="h-6 w-6 mr-2 text-primary" />
                3. Get Noticed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Build a compelling, skill-first profile that attracts companies looking for your talents.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
