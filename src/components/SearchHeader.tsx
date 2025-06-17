
import { useState } from 'react';
import { Search, Sparkles, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchHeaderProps {
  onSearch: (topic: string) => void;
  isLoading: boolean;
  onNewSearch?: () => void;
}

export const SearchHeader = ({ onSearch, isLoading, onNewSearch }: SearchHeaderProps) => {
  const [searchTopic, setSearchTopic] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTopic.trim() && !isLoading) {
      onSearch(searchTopic.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSubmit(e);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {onNewSearch && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onNewSearch}
              className="text-gray-600 hover:text-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              New Search
            </Button>
          )}
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI Learning Platform
            </h1>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="What would you like to learn today? (e.g., Python programming, cooking pasta, guitar basics...)"
            value={searchTopic}
            onChange={(e) => setSearchTopic(e.target.value)}
            onKeyPress={handleKeyPress}
            className="pl-10 h-12 text-lg border-gray-200 focus:border-purple-400 focus:ring-purple-400"
            disabled={isLoading}
          />
        </div>
        <Button
          type="submit"
          disabled={!searchTopic.trim() || isLoading}
          className="h-12 px-8 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Learning...
            </div>
          ) : (
            'Start Learning'
          )}
        </Button>
      </form>
    </div>
  );
};
