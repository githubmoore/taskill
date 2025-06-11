'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Linkedin, MessageSquare, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface VerificationModalProps {
  type: 'linkedin' | 'whatsapp';
  onVerify: (verified: boolean) => void;
  isVerified: boolean;
}

const VerificationModal: React.FC<VerificationModalProps> = ({ type, onVerify, isVerified }) => {
  const { toast } = useToast();
  const [otp, setOtp] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppVerify = () => {
    // Mock OTP verification
    if (otp === '123456') { // Mock OTP
      onVerify(true);
      toast({ title: "WhatsApp Verified!", description: "Your WhatsApp has been (mock) verified." });
      setIsOpen(false);
    } else {
      toast({ title: "Invalid OTP", description: "Please enter the mock OTP '123456'.", variant: "destructive" });
    }
  };

  const handleLinkedInVerify = () => {
    // Mock LinkedIn OAuth
    onVerify(true);
    toast({ title: "LinkedIn Connected!", description: "Your LinkedIn has been (mock) connected." });
    setIsOpen(false);
  };

  const title = type === 'linkedin' ? 'LinkedIn Verification' : 'WhatsApp Verification';
  const description = type === 'linkedin' 
    ? 'Connect your LinkedIn account to display a verified badge on your profile. (This is a mock verification for MVP)'
    : 'Verify your WhatsApp number to earn a badge. Enter the mock OTP "123456". (This is a mock verification for MVP)';
  const Icon = type === 'linkedin' ? Linkedin : MessageSquare;
  const buttonText = type === 'linkedin' ? 'Connect LinkedIn' : 'Verify WhatsApp';

  if (isVerified) {
    return (
      <Button variant="outline" disabled className="w-full justify-start text-left">
        <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
        {type === 'linkedin' ? 'LinkedIn Verified' : 'WhatsApp Verified'}
      </Button>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full justify-start text-left">
          <Icon className="h-5 w-5 mr-2" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        {type === 'whatsapp' && (
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="otp" className="text-right">
                OTP
              </Label>
              <Input
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="col-span-3"
              />
            </div>
          </div>
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
          <Button onClick={type === 'linkedin' ? handleLinkedInVerify : handleWhatsAppVerify}>
            {type === 'linkedin' ? 'Mock Connect' : 'Mock Verify'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationModal;
