
import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle, Circle, BookOpen, Lightbulb, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lesson } from '@/pages/Index';

interface LessonViewerProps {
  lesson: Lesson;
  currentStep: number;
  onStepChange: (stepIndex: number) => void;
}

export const LessonViewer = ({ lesson, currentStep, onStepChange }: LessonViewerProps) => {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const currentStepData = lesson.steps[currentStep];
  const isLastStep = currentStep === lesson.steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (!isLastStep) {
      setCompletedSteps(prev => new Set([...prev, currentStep]));
      onStepChange(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      onStepChange(currentStep - 1);
    }
  };

  const markStepComplete = () => {
    setCompletedSteps(prev => new Set([...prev, currentStep]));
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Lesson Header */}
      <Card className="p-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white border-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="w-5 h-5" />
              <span className="text-sm opacity-90">Learning Topic</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{lesson.title}</h1>
            <p className="text-purple-100 mb-4">{lesson.description}</p>
            <div className="flex flex-wrap gap-2">
              <Badge className={`${getDifficultyColor(lesson.difficulty)} border-0`}>
                {lesson.difficulty}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                {lesson.estimatedTime}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                {lesson.steps.length} steps
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Step Content */}
      <Card className="p-8 bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-white font-bold text-sm">
                {currentStep + 1}
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                {currentStepData.title}
              </h2>
            </div>
            <button
              onClick={markStepComplete}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors"
            >
              {completedSteps.has(currentStep) ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <Circle className="w-5 h-5" />
              )}
              Mark Complete
            </button>
          </div>
          
          <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-1 mb-6">
            <div className="flex">
              {lesson.steps.map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-2 rounded-full mx-0.5 transition-all duration-300 ${
                    index <= currentStep
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600'
                      : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed text-lg mb-6">
            {currentStepData.content}
          </p>

          {currentStepData.keyPoints && (
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-800">Key Points</h3>
              </div>
              <ul className="space-y-2">
                {currentStepData.keyPoints.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {currentStepData.examples && (
            <div className="bg-green-50 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-5 h-5 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">Examples</h3>
              </div>
              <div className="space-y-3">
                {currentStepData.examples.map((example, index) => (
                  <div key={index} className="bg-white rounded-md p-3 border-l-4 border-green-500">
                    <span className="text-gray-700">{example}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={isFirstStep}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          <span className="text-sm text-gray-500">
            Step {currentStep + 1} of {lesson.steps.length}
          </span>

          <Button
            onClick={handleNext}
            disabled={isLastStep}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
          >
            {isLastStep ? 'Complete' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
};
