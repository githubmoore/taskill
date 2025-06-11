import Link from 'next/link';
import type { Challenge } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, TimerIcon, Code2, Lightbulb, Palette, ChevronRight } from 'lucide-react';

interface ChallengeCardProps {
  challenge: Challenge;
}

const CategoryIcon = ({ category }: { category: Challenge['category'] }) => {
  switch (category) {
    case 'Coding':
      return <Code2 className="h-5 w-5 mr-2 text-primary" />;
    case 'Logic':
      return <Lightbulb className="h-5 w-5 mr-2 text-primary" />;
    case 'Design':
      return <Palette className="h-5 w-5 mr-2 text-primary" />;
    default:
      return null;
  }
};

const ChallengeCard: React.FC<ChallengeCardProps> = ({ challenge }) => {
  return (
    <Card className="flex flex-col h-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="font-headline text-xl mb-1">{challenge.title}</CardTitle>
          <Badge variant="secondary" className="flex items-center">
            <Star className="h-4 w-4 mr-1 text-yellow-500" /> {challenge.stars}
          </Badge>
        </div>
        <CardDescription className="flex items-center text-sm text-muted-foreground">
          <CategoryIcon category={challenge.category} /> {challenge.category}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm line-clamp-3">{challenge.description}</p>
        <div className="mt-3 flex items-center text-xs text-muted-foreground">
          <TimerIcon className="h-4 w-4 mr-1" /> {challenge.timeLimit} mins
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full group">
          <Link href={`/challenges/${challenge.id}`}>
            Start Challenge <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChallengeCard;
