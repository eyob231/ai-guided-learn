
import { BookOpen, Brain, Zap, Users, Globe, Target } from 'lucide-react';

export const WelcomeScreen = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description: "Our AI searches the internet in real-time to create personalized lessons just for you"
    },
    {
      icon: Target,
      title: "Step-by-Step Guidance",
      description: "Break down complex topics into manageable, easy-to-follow steps"
    },
    {
      icon: Zap,
      title: "Instant Lessons",
      description: "Get customized learning content within seconds of your search"
    },
    {
      icon: Globe,
      title: "Any Topic, Anywhere",
      description: "From coding to cooking, from history to music - learn anything you want"
    }
  ];

  const popularTopics = [
    "JavaScript Programming",
    "Digital Marketing",
    "Guitar Basics",
    "Cooking Italian Food",
    "Machine Learning",
    "Photography",
    "Spanish Language",
    "Financial Planning"
  ];

  return (
    <div className="py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Learn Anything,{' '}
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Step by Step
          </span>
        </h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Powered by AI that searches the internet to create personalized learning experiences. 
          Just tell us what you want to learn, and we'll create a custom lesson plan just for you.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg w-12 h-12 flex items-center justify-center mb-4">
              <feature.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Popular Topics */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
        <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Popular Learning Topics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {popularTopics.map((topic, index) => (
            <div
              key={index}
              className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg px-4 py-3 text-center cursor-pointer hover:from-purple-200 hover:to-blue-200 transition-all duration-200 hover:scale-105"
            >
              <span className="text-sm font-medium text-gray-700">{topic}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-6">
          <p className="text-gray-600">
            <span className="font-semibold">Try searching:</span> "How to bake bread", "Learn Python basics", "Guitar chords for beginners"
          </p>
        </div>
      </div>
    </div>
  );
};
