
import { useState, useEffect } from 'react';
import { SearchHeader } from '@/components/SearchHeader';
import { LessonViewer } from '@/components/LessonViewer';
import { ProgressTracker } from '@/components/ProgressTracker';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { APIKeyInput } from '@/components/APIKeyInput';
import { AILearningService } from '@/components/AIService';
import { useToast } from '@/hooks/use-toast';

export interface LessonStep {
  id: string;
  title: string;
  content: string;
  examples?: string[];
  keyPoints?: string[];
}

export interface Lesson {
  id: string;
  topic: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  steps: LessonStep[];
}

const Index = () => {
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [apiKey, setApiKey] = useState<string>('');
  const [aiService, setAiService] = useState<AILearningService | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check for stored API key
    const storedKey = localStorage.getItem('ai_api_key');
    if (storedKey) {
      setApiKey(storedKey);
      setAiService(new AILearningService(storedKey));
    }
  }, []);

  const handleApiKeySet = (key: string) => {
    setApiKey(key);
    setAiService(new AILearningService(key));
    toast({
      title: "API Key Set!",
      description: "AI-powered learning is now enabled.",
    });
  };

  const handleSearch = async (topic: string) => {
    if (!aiService) {
      toast({
        title: "API Key Required",
        description: "Please set your AI API key first to generate lessons.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      console.log('Generating AI lesson for:', topic);
      
      const aiResponse = await aiService.generateLesson({
        topic,
        difficulty: 'beginner'
      });

      // Convert AI response to our lesson format
      const lesson: Lesson = {
        id: `lesson-${Date.now()}`,
        topic,
        title: aiResponse.title,
        description: aiResponse.description,
        difficulty: aiResponse.difficulty,
        estimatedTime: aiResponse.estimatedTime,
        steps: aiResponse.steps.map((step, index) => ({
          id: `step-${index + 1}`,
          title: step.title,
          content: step.content,
          keyPoints: step.keyPoints,
          examples: step.examples
        }))
      };
      
      setCurrentLesson(lesson);
      setCurrentStep(0);
      
      toast({
        title: "Lesson Generated!",
        description: `Your AI-powered lesson on "${topic}" is ready.`,
      });
      
    } catch (error) {
      console.error('Error generating lesson:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate lesson. Please check your API key and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStepChange = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const handleNewSearch = () => {
    setCurrentLesson(null);
    setCurrentStep(0);
  };

  const showApiKeyInput = !apiKey && !currentLesson && !isLoading;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        <SearchHeader 
          onSearch={handleSearch} 
          isLoading={isLoading}
          onNewSearch={currentLesson ? handleNewSearch : undefined}
        />
        
        {showApiKeyInput && (
          <div className="mt-8">
            <APIKeyInput onApiKeySet={handleApiKeySet} isVisible={true} />
          </div>
        )}
        
        {!currentLesson && !isLoading && apiKey && <WelcomeScreen />}
        
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">AI is analyzing your topic and creating a personalized lesson...</p>
              <p className="text-sm text-gray-500 mt-2">This may take 10-30 seconds</p>
            </div>
          </div>
        )}
        
        {currentLesson && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <LessonViewer 
                lesson={currentLesson}
                currentStep={currentStep}
                onStepChange={handleStepChange}
              />
            </div>
            <div className="lg:col-span-1">
              <ProgressTracker 
                lesson={currentLesson}
                currentStep={currentStep}
                onStepSelect={handleStepChange}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
