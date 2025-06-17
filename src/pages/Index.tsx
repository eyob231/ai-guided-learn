
import { useState } from 'react';
import { SearchHeader } from '@/components/SearchHeader';
import { LessonViewer } from '@/components/LessonViewer';
import { ProgressTracker } from '@/components/ProgressTracker';
import { WelcomeScreen } from '@/components/WelcomeScreen';

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

  const handleSearch = async (topic: string) => {
    setIsLoading(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock AI-generated lesson
    const mockLesson: Lesson = {
      id: `lesson-${Date.now()}`,
      topic,
      title: `Complete Guide to ${topic}`,
      description: `Master ${topic} with this comprehensive step-by-step guide tailored just for you.`,
      difficulty: 'beginner',
      estimatedTime: '15-20 minutes',
      steps: [
        {
          id: 'step-1',
          title: `What is ${topic}?`,
          content: `${topic} is a fundamental concept that we'll explore together. Let's start with the basics and build your understanding step by step.`,
          keyPoints: [
            `Core definition of ${topic}`,
            'Why it matters in today\'s world',
            'Real-world applications'
          ]
        },
        {
          id: 'step-2',
          title: 'Key Concepts',
          content: `Now that you understand what ${topic} is, let's dive into the essential concepts you need to know.`,
          keyPoints: [
            'Fundamental principles',
            'Common terminology',
            'How different parts connect'
          ]
        },
        {
          id: 'step-3',
          title: 'Practical Examples',
          content: `Let's see ${topic} in action with real examples that you can relate to.`,
          examples: [
            `Example 1: Basic ${topic} application`,
            `Example 2: Advanced ${topic} use case`,
            `Example 3: Creative ${topic} implementation`
          ]
        },
        {
          id: 'step-4',
          title: 'Practice & Next Steps',
          content: `Great job! You've learned the fundamentals of ${topic}. Here's how to continue your learning journey.`,
          keyPoints: [
            'Practice exercises you can try',
            'Additional resources to explore',
            'Next topics to learn'
          ]
        }
      ]
    };
    
    setCurrentLesson(mockLesson);
    setCurrentStep(0);
    setIsLoading(false);
  };

  const handleStepChange = (stepIndex: number) => {
    setCurrentStep(stepIndex);
  };

  const handleNewSearch = () => {
    setCurrentLesson(null);
    setCurrentStep(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        <SearchHeader 
          onSearch={handleSearch} 
          isLoading={isLoading}
          onNewSearch={currentLesson ? handleNewSearch : undefined}
        />
        
        {!currentLesson && !isLoading && <WelcomeScreen />}
        
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-lg text-gray-600">AI is searching and preparing your personalized lesson...</p>
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
