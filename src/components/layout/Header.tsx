
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Briefcase, User, ListChecks, Target, PlusCircle } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Target className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-headline font-bold text-primary">OneTask</h1>
        </Link>
        <nav className="flex items-center space-x-1 sm:space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/challenges" className="flex items-center space-x-1">
              <ListChecks className="h-5 w-5" />
              <span className="hidden sm:inline">Challenges</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/profile" className="flex items-center space-x-1">
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">Profile</span>
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/hr/post-challenge" className="flex items-center space-x-1">
              <PlusCircle className="h-5 w-5" />
              <span className="hidden sm:inline">Post Challenge</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
