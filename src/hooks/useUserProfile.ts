'use client';

import { useState, useEffect, useCallback } from 'react';
import type { UserProfile } from '@/lib/localStorage';
import { getProfileFromLocalStorage, saveProfileToLocalStorage, initializeUserProfile } from '@/lib/localStorage';
import type { Challenge } from '@/data/challenges'; // Assuming Challenge type definition

export const useUserProfile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userProfile = initializeUserProfile();
    setProfile(userProfile);
    setLoading(false);
  }, []);

  const updateProfile = useCallback((updatedProfileData: Partial<UserProfile>) => {
    if (profile) {
      const newProfile = { ...profile, ...updatedProfileData };
      setProfile(newProfile);
      saveProfileToLocalStorage(newProfile);
    }
  }, [profile]);

  const completeChallenge = useCallback((challenge: Challenge, timeTakenMinutes: number) => {
    if (!profile) return;

    let starsEarned = challenge.stars;
    // Bonus for speed: if time taken < 50% of challenge time limit
    if (challenge.timeLimit && timeTakenMinutes < challenge.timeLimit * 0.5) {
      starsEarned += 1; // Example: 1 bonus star for speed
    }
    // Bonus for review quality (mocked - let's assume completing review gives 1 star)
    // This part might be better handled after the review/feedback step
    // starsEarned += 1; 

    const newHistoryEntry = {
      id: challenge.id,
      title: challenge.title,
      starsEarned,
      completedAt: new Date().toISOString(),
      category: challenge.category,
      timeLimit: challenge.timeLimit,
    };

    const updatedHistory = [...profile.challengeHistory, newHistoryEntry];
    const newTotalStars = profile.stars + starsEarned;

    updateProfile({
      stars: newTotalStars,
      challengeHistory: updatedHistory,
    });

    return starsEarned;
  }, [profile, updateProfile]);
  
  const awardBonusStars = useCallback((stars: number) => {
    if (!profile) return;
    updateProfile({ stars: profile.stars + stars });
  }, [profile, updateProfile]);

  const setLinkedInVerified = useCallback((verified: boolean) => {
    if (!profile) return;
    updateProfile({
      badges: { ...profile.badges, linkedInVerified: verified },
    });
  }, [profile, updateProfile]);

  const setWhatsAppVerified = useCallback((verified: boolean) => {
    if (!profile) return;
    updateProfile({
      badges: { ...profile.badges, whatsAppVerified: verified },
    });
  }, [profile, updateProfile]);

  return { profile, loading, updateProfile, completeChallenge, setLinkedInVerified, setWhatsAppVerified, awardBonusStars };
};
