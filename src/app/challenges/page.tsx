'use client';

import { useState, useMemo, useEffect } from 'react';
import ChallengeCard from '@/components/challenge/ChallengeCard';
import ChallengeFilters from '@/components/challenge/ChallengeFilters';
import type { Challenge } from '@/types';
import challengesData from '@/data/challenges.json'; // Ensure this path is correct
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

const ChallengeHubPage = () => {
  const [allChallenges, setAllChallenges] = useState<Challenge[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTime, setSelectedTime] = useState<string | number>('all'); // Store as string to handle "all"

  useEffect(() => {
    // Simulate fetching data or directly use imported JSON
    setAllChallenges(challengesData as Challenge[]);
  }, []);
  
  const categories = useMemo(() => {
    if (!allChallenges) return [];
    return Array.from(new Set(allChallenges.map(c => c.category)));
  }, [allChallenges]);

  const times = useMemo(() => {
    if (!allChallenges) return [];
    return Array.from(new Set(allChallenges.map(c => c.timeLimit))).sort((a,b) => a-b);
  }, [allChallenges]);

  const filteredChallenges = useMemo(() => {
    if (!allChallenges) return [];
    return allChallenges.filter(challenge => {
      const matchesCategory = selectedCategory === 'all' || challenge.category === selectedCategory;
      const matchesTime = selectedTime === 'all' || challenge.timeLimit === Number(selectedTime);
      const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesTime && matchesSearch;
    });
  }, [allChallenges, selectedCategory, selectedTime, searchTerm]);

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedTime('all');
    setSearchTerm('');
  };

  if (!allChallenges) {
    return <div className="text-center py-10">Loading challenges...</div>;
  }

  return (
    <div className="space-y-8">
      <section className="text-center py-8 bg-card rounded-lg shadow-md">
        <h1 className="text-4xl font-headline font-bold mb-2">Challenge Hub</h1>
        <p className="text-lg text-muted-foreground">Test your skills, earn stars, and get noticed!</p>
      </section>
      
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input 
          type="text"
          placeholder="Search challenges by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 w-full"
        />
      </div>

      <ChallengeFilters
        categories={categories}
        times={times}
        selectedCategory={selectedCategory}
        selectedTime={selectedTime}
        onCategoryChange={setSelectedCategory}
        onTimeChange={setSelectedTime}
        onClearFilters={handleClearFilters}
      />

      {filteredChallenges.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl text-muted-foreground">No challenges match your criteria.</p>
          <Button onClick={handleClearFilters} variant="link" className="mt-2">
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default ChallengeHubPage;
