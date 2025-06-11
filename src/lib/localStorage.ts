export type UserProfile = {
  stars: number;
  badges: {
    linkedInVerified: boolean;
    whatsAppVerified: boolean;
  };
  challengeHistory: Array<{
    id: string;
    title: string;
    starsEarned: number;
    completedAt: string;
    category: string;
    timeLimit: number;
  }>;
};

const PROFILE_KEY = 'oneTaskUserProfile';

export const getProfileFromLocalStorage = (): UserProfile | null => {
  if (typeof window === 'undefined') return null;
  const profileJson = localStorage.getItem(PROFILE_KEY);
  return profileJson ? JSON.parse(profileJson) : null;
};

export const saveProfileToLocalStorage = (profile: UserProfile) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const initializeUserProfile = (): UserProfile => {
  const existingProfile = getProfileFromLocalStorage();
  if (existingProfile) {
    return existingProfile;
  }
  const newProfile: UserProfile = {
    stars: 0,
    badges: {
      linkedInVerified: false,
      whatsAppVerified: false,
    },
    challengeHistory: [],
  };
  saveProfileToLocalStorage(newProfile);
  return newProfile;
};
