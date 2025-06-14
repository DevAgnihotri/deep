// Course data structure and content
export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'anxiety' | 'depression' | 'mindfulness' | 'stress' | 'wellness';
  duration: string;
  modules: Module[];
  thumbnail: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructor: string;
  rating: number;
  enrolledCount: number;
}

export interface Module {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'exercise';
  content: VideoContent | ReadingContent | ExerciseContent;
  duration: string;
  order: number;
  isCompleted?: boolean;
}

export interface VideoContent {
  type: 'video';
  videoId: string; // YouTube video ID
  videoUrl: string;
  transcript?: string;
  keyPoints: string[];
}

export interface ReadingContent {
  type: 'reading';
  content: string;
  keyPoints: string[];
  resources?: string[];
}

export interface ExerciseContent {
  type: 'exercise';
  instructions: string;
  steps: string[];
  duration: string;
}

// Sample courses data
export const coursesData: Course[] = [
  {
    id: 'anxiety-management-101',
    title: 'Anxiety Management Fundamentals',
    description: 'Learn evidence-based techniques to understand and manage anxiety in daily life.',
    category: 'anxiety',
    duration: '2.5 hours',
    difficulty: 'beginner',    instructor: 'Dr. Sarah Johnson',
    rating: 4.8,
    enrolledCount: 78,
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    modules: [
      {
        id: 'anxiety-intro',
        title: 'Understanding Anxiety',
        type: 'video',
        duration: '15 min',
        order: 1,
        content: {
          type: 'video',
          videoId: 'WWloIAQpMcQ',
          videoUrl: 'https://www.youtube.com/watch?v=WWloIAQpMcQ',
          keyPoints: [
            'Anxiety is a normal human emotion',
            'Understanding fight-or-flight response',
            'Recognizing anxiety symptoms',
            'When anxiety becomes problematic'
          ]
        }
      },
      {
        id: 'breathing-techniques',
        title: 'Breathing Techniques for Calm',
        type: 'video',
        duration: '12 min',
        order: 2,
        content: {
          type: 'video',
          videoId: 'tybOi4hjZFQ',
          videoUrl: 'https://www.youtube.com/watch?v=tybOi4hjZFQ',
          keyPoints: [
            '4-7-8 breathing technique',
            'Box breathing method',
            'When to use breathing exercises',
            'Creating a daily practice'
          ]
        }
      },
      {
        id: 'anxiety-thoughts',
        title: 'Managing Anxious Thoughts',
        type: 'reading',
        duration: '20 min',
        order: 3,
        content: {
          type: 'reading',
          keyPoints: [
            'Identifying thought patterns',
            'Challenging negative thoughts',
            'Grounding techniques',
            'Present moment awareness'
          ],
          content: `
# Managing Anxious Thoughts

## Understanding Thought Patterns

Anxiety often stems from our thought patterns. Learning to recognize and manage these thoughts is crucial for anxiety management.

### Common Anxious Thought Patterns:

1. **Catastrophizing**: Imagining the worst-case scenario
2. **All-or-Nothing Thinking**: Seeing things in black and white
3. **Mind Reading**: Assuming you know what others think
4. **Fortune Telling**: Predicting negative outcomes

### Techniques to Challenge Anxious Thoughts:

#### 1. The 5-4-3-2-1 Grounding Technique
- 5 things you can see
- 4 things you can touch
- 3 things you can hear
- 2 things you can smell
- 1 thing you can taste

#### 2. Thought Challenging Questions
- Is this thought realistic?
- What evidence supports this thought?
- What would I tell a friend in this situation?
- What's the worst that could realistically happen?

#### 3. Present Moment Awareness
Focus on what's happening right now, not what might happen in the future.

### Building Daily Practice

Start with 5-10 minutes daily of mindful awareness. Notice your thoughts without judgment, and practice the techniques that work best for you.
          `,
          resources: [
            'Anxiety and Depression Association of America',
            'National Institute of Mental Health',
            'Mindfulness-Based Stress Reduction resources'
          ]
        }
      },
      {
        id: 'progressive-muscle-relaxation',
        title: 'Progressive Muscle Relaxation',
        type: 'exercise',
        duration: '25 min',
        order: 4,
        content: {
          type: 'exercise',
          instructions: 'Progressive Muscle Relaxation (PMR) helps reduce physical tension associated with anxiety.',
          duration: '20-25 minutes',
          steps: [
            'Find a quiet, comfortable space to lie down',
            'Start with your toes - tense for 5 seconds, then relax',
            'Move to your calves - tense and relax',
            'Continue with thighs, abdomen, hands, arms, shoulders',
            'Tense and relax your face muscles',
            'End with full-body tension, then complete relaxation',
            'Lie still for 5 minutes, noticing the relaxation'
          ]
        }
      }
    ]
  },
  {
    id: 'mindfulness-meditation',
    title: 'Mindfulness Meditation for Beginners',
    description: 'Discover the power of mindfulness meditation to reduce stress and increase well-being.',
    category: 'mindfulness',
    duration: '3 hours',
    difficulty: 'beginner',
    instructor: 'Dr. Michael Chen',    rating: 4.9,
    enrolledCount: 92,
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    modules: [
      {
        id: 'mindfulness-intro',
        title: 'What is Mindfulness?',
        type: 'video',
        duration: '18 min',
        order: 1,
        content: {
          type: 'video',
          videoId: 'HmEo6RI4Wvs',
          videoUrl: 'https://www.youtube.com/watch?v=HmEo6RI4Wvs',
          keyPoints: [
            'Definition of mindfulness',
            'Benefits of regular practice',
            'Common misconceptions',
            'Scientific research backing'
          ]
        }
      },
      {
        id: 'basic-meditation',
        title: 'Your First Meditation',
        type: 'video',
        duration: '20 min',
        order: 2,
        content: {
          type: 'video',
          videoId: 'jPpUNAFHgxM',
          videoUrl: 'https://www.youtube.com/watch?v=jPpUNAFHgxM',
          keyPoints: [
            'Setting up your meditation space',
            'Basic posture guidelines',
            'Focusing on the breath',
            'Dealing with wandering thoughts'
          ]
        }
      }
    ]
  },
  {
    id: 'depression-support',
    title: 'Understanding and Coping with Depression',
    description: 'Learn about depression and develop healthy coping strategies.',
    category: 'depression',
    duration: '4 hours',
    difficulty: 'intermediate',
    instructor: 'Dr. Emily Rodriguez',    rating: 4.7,
    enrolledCount: 56,
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    modules: [
      {
        id: 'depression-understanding',
        title: 'Understanding Depression',
        type: 'video',
        duration: '22 min',
        order: 1,
        content: {
          type: 'video',
          videoId: 'z-IR48Mb3W0',
          videoUrl: 'https://www.youtube.com/watch?v=z-IR48Mb3W0',
          keyPoints: [
            'Types of depression',
            'Symptoms and warning signs',
            'Brain chemistry and depression',
            'When to seek professional help'
          ]
        }
      }
    ]
  },
  {
    id: 'stress-management',
    title: 'Effective Stress Management',
    description: 'Master practical techniques to manage stress in work and personal life.',
    category: 'stress',
    duration: '2 hours',
    difficulty: 'beginner',
    instructor: 'Dr. Alex Thompson',    rating: 4.6,
    enrolledCount: 73,
    thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    modules: [
      {
        id: 'stress-basics',
        title: 'Understanding Stress',
        type: 'video',
        duration: '16 min',
        order: 1,
        content: {
          type: 'video',
          videoId: 'hnpQrMqDoqE',
          videoUrl: 'https://www.youtube.com/watch?v=hnpQrMqDoqE',
          keyPoints: [
            'Types of stress: acute vs chronic',
            'Physical effects of stress',
            'Stress triggers identification',
            'Positive vs negative stress'
          ]
        }
      }
    ]
  }
];
