
// AI Service for generating real lessons
export interface AILessonRequest {
  topic: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  learningStyle?: 'visual' | 'practical' | 'theoretical';
}

export interface AILessonResponse {
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  steps: {
    title: string;
    content: string;
    keyPoints?: string[];
    examples?: string[];
  }[];
}

export class AILearningService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateLesson(request: AILessonRequest): Promise<AILessonResponse> {
    console.log('Generating lesson for:', request.topic);
    
    const prompt = this.createLessonPrompt(request);
    
    try {
      // Using OpenAI API as an example - you can replace this with DeepSeek or any other AI service
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert teacher who creates comprehensive, step-by-step learning lessons. Always respond with valid JSON in the exact format specified.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 4000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`AI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Parse the AI response
      const lesson = JSON.parse(content);
      
      return this.formatLesson(lesson, request);
    } catch (error) {
      console.error('Error generating lesson:', error);
      throw new Error('Failed to generate lesson. Please try again.');
    }
  }

  private createLessonPrompt(request: AILessonRequest): string {
    return `Create a comprehensive step-by-step learning lesson about "${request.topic}" for ${request.difficulty || 'beginner'} level.

Structure the response as JSON with this exact format:
{
  "title": "Complete Guide to [Topic]",
  "description": "Brief description of what they'll learn",
  "difficulty": "${request.difficulty || 'beginner'}",
  "estimatedTime": "X-Y minutes",
  "steps": [
    {
      "title": "Step title",
      "content": "Detailed explanation (2-3 paragraphs)",
      "keyPoints": ["Key point 1", "Key point 2", "Key point 3"],
      "examples": ["Example 1", "Example 2"]
    }
  ]
}

Requirements:
- Create 4-6 logical learning steps
- Each step should build upon the previous one
- Include practical examples and key takeaways
- Make it engaging and easy to understand
- Focus on practical application
- Provide real-world context

Topic: ${request.topic}
Difficulty: ${request.difficulty || 'beginner'}`;
  }

  private formatLesson(aiResponse: any, request: AILessonRequest): AILessonResponse {
    return {
      title: aiResponse.title || `Learn ${request.topic}`,
      description: aiResponse.description || `Master ${request.topic} with this AI-generated lesson`,
      difficulty: aiResponse.difficulty || request.difficulty || 'beginner',
      estimatedTime: aiResponse.estimatedTime || '15-20 minutes',
      steps: aiResponse.steps?.map((step: any, index: number) => ({
        title: step.title || `Step ${index + 1}`,
        content: step.content || 'Content will be generated...',
        keyPoints: step.keyPoints || [],
        examples: step.examples || []
      })) || []
    };
  }
}
