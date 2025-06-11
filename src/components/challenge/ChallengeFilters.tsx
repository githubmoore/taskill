'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Filter, X } from 'lucide-react';

interface ChallengeFiltersProps {
  categories: string[];
  times: number[];
  selectedCategory: string;
  selectedTime: number | string; // Allow string for "All"
  onCategoryChange: (category: string) => void;
  onTimeChange: (time: string) => void; // string to handle "all"
  onClearFilters: () => void;
}

const ChallengeFilters: React.FC<ChallengeFiltersProps> = ({
  categories,
  times,
  selectedCategory,
  selectedTime,
  onCategoryChange,
  onTimeChange,
  onClearFilters,
}) => {
  return (
    <div className="mb-8 p-4 bg-card rounded-lg shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-end">
        <div>
          <label htmlFor="category-filter" className="block text-sm font-medium text-foreground mb-1">Category</label>
          <Select value={selectedCategory} onValueChange={onCategoryChange}>
            <SelectTrigger id="category-filter" className="w-full">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="time-filter" className="block text-sm font-medium text-foreground mb-1">Time Limit (mins)</label>
          <Select value={selectedTime.toString()} onValueChange={onTimeChange}>
            <SelectTrigger id="time-filter" className="w-full">
              <SelectValue placeholder="Any Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Time</SelectItem>
              {times.map((time) => (
                <SelectItem key={time} value={time.toString()}>
                  {time} mins
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button onClick={onClearFilters} variant="outline" className="w-full sm:w-auto mt-4 sm:mt-0">
          <X className="h-4 w-4 mr-2" /> Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default ChallengeFilters;
