import Link from 'next/link';
import { Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-card text-card-foreground py-8 border-t">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">
          &copy; {currentYear} OneTask MVP. All rights reserved.
        </p>
        <p className="text-xs mt-2">
          Win jobs through skill games — skip interviews.
        </p>
        <div className="mt-4">
          <a
            href="mailto:contact@onetask.example.com"
            className="inline-flex items-center text-sm text-primary hover:underline"
          >
            <Mail className="h-4 w-4 mr-1" />
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
