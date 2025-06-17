
import { useState } from 'react';
import { Key, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface APIKeyInputProps {
  onApiKeySet: (apiKey: string) => void;
  isVisible: boolean;
}

export const APIKeyInput = ({ onApiKeySet, isVisible }: APIKeyInputProps) => {
  const [apiKey, setApiKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onApiKeySet(apiKey.trim());
      // Store in localStorage for convenience (not recommended for production)
      localStorage.setItem('ai_api_key', apiKey.trim());
    }
  };

  if (!isVisible) return null;

  return (
    <Card className="p-6 bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg w-10 h-10 flex items-center justify-center">
          <Key className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">AI API Configuration</h3>
          <p className="text-sm text-gray-600">Enter your AI API key to enable real AI-powered lessons</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type={showKey ? 'text' : 'password'}
            placeholder="Enter your OpenAI API key (sk-...)"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            className="pr-12"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2"
            onClick={() => setShowKey(!showKey)}
          >
            {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>
        
        <Button
          type="submit"
          disabled={!apiKey.trim()}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        >
          Enable AI Learning
        </Button>
      </form>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-800">
          <strong>Note:</strong> You can use OpenAI, DeepSeek, or any compatible API. Your key is stored locally and only used for generating lessons.
        </p>
      </div>
    </Card>
  );
};
