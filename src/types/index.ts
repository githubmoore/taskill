
export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'Coding' | 'Logic' | 'Design' | 'General' | 'Other' | string; // Allow string for future expansion
  timeLimit: 5 | 15 | 30 | number; // Allow number for future expansion
  stars: number; // Typically 1-5
  details?: string;
}
