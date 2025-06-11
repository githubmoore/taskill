'use client';

import { Badge } from '@/components/ui/badge';
import { Linkedin, MessageSquare, ShieldCheck } from 'lucide-react'; // Using MessageSquare for WhatsApp mock

interface ProfileBadgesProps {
  linkedInVerified: boolean;
  whatsAppVerified: boolean;
}

const ProfileBadges: React.FC<ProfileBadgesProps> = ({ linkedInVerified, whatsAppVerified }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {linkedInVerified && (
        <Badge variant="default" className="bg-blue-600 hover:bg-blue-700 text-white">
          <Linkedin className="h-4 w-4 mr-1.5" /> LinkedIn Verified
        </Badge>
      )}
      {whatsAppVerified && (
        <Badge variant="default" className="bg-green-500 hover:bg-green-600 text-white">
          <MessageSquare className="h-4 w-4 mr-1.5" /> WhatsApp Verified
        </Badge>
      )}
      {(!linkedInVerified && !whatsAppVerified) && (
        <Badge variant="outline">
           <ShieldCheck className="h-4 w-4 mr-1.5 text-muted-foreground" /> No badges yet
        </Badge>
      )}
    </div>
  );
};

export default ProfileBadges;
