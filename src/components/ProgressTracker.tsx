
import { CheckCircle, Circle, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Lesson } from '@/pages/Index';

interface ProgressTrackerProps {
  lesson: Lesson;
  currentStep: number;
  onStepSelect: (stepIndex: number) => void;
}

export const ProgressTracker = ({ lesson, currentStep, onStepSelect }: ProgressTrackerProps) => {
  const progressPercentage = ((currentStep + 1) / lesson.steps.length) * 100;

  return (
    <div className="space-y-4">
      {/* Progress Overview */}
      <Card className="p-6 bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg w-10 h-10 flex items-center justify-center">
            <Clock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Progress</h3>
            <p className="text-sm text-gray-600">{lesson.estimatedTime}</p>
          </div>
        </div>
        
        <div className="mb-3">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Step {currentStep + 1} of {lesson.steps.length}</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        <p className="text-xs text-gray-500">
          Keep going! You're making great progress.
        </p>
      </Card>

      {/* Step List */}
      <Card className="p-4 bg-white/70 backdrop-blur-sm border border-white/20 shadow-lg">
        <h4 className="font-semibold text-gray-800 mb-4">Lesson Steps</h4>
        <div className="space-y-2">
          {lesson.steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => onStepSelect(index)}
              className={`w-full text-left p-3 rounded-lg transition-all duration-200 ${
                index === currentStep
                  ? 'bg-gradient-to-r from-purple-100 to-blue-100 border-2 border-purple-300'
                  : index < currentStep
                  ? 'bg-green-50 hover:bg-green-100'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  {index < currentStep ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : index === currentStep ? (
                    <div className="w-5 h-5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium truncate ${
                    index === currentStep ? 'text-purple-800' :
                    index < currentStep ? 'text-green-800' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      index === currentStep ? 'bg-purple-200 text-purple-700' :
                      index < currentStep ? 'bg-green-200 text-green-700' : 'bg-gray-200 text-gray-600'
                    }`}>
                      Step {index + 1}
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Learning Tips */}
      <Card className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 shadow-lg">
        <h4 className="font-semibold text-purple-800 mb-2">💡 Learning Tips</h4>
        <ul className="text-xs text-purple-700 space-y-1">
          <li>• Take notes as you progress</li>
          <li>• Practice each concept before moving on</li>
          <li>• Don't hesitate to revisit previous steps</li>
          <li>• Apply what you learn immediately</li>
        </ul>
      </Card>
    </div>
  );
};
