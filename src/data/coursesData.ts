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
  },  {
    id: 'stress-management',
    title: 'Effective Stress Management',
    description: 'Master practical techniques to manage stress in work and personal life.',
    category: 'stress',
    duration: '2 hours',
    difficulty: 'beginner',
    instructor: 'Dr. Alex Thompson',
    rating: 4.6,
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
  },
  {
    id: 'sleep-wellness',
    title: 'Sleep Hygiene & Mental Health',
    description: 'Improve your sleep quality and understand its impact on mental wellness.',
    category: 'wellness',
    duration: '1.5 hours',
    difficulty: 'beginner',
    instructor: 'Dr. Lisa Park',
    rating: 4.8,
    enrolledCount: 89,
    thumbnail: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=300&fit=crop',
    modules: [
      {
        id: 'sleep-basics',
        title: 'The Science of Sleep',
        type: 'video',
        duration: '18 min',
        order: 1,
        content: {
          type: 'video',
          videoId: 'VwuLbTRthRs',
          videoUrl: 'https://www.youtube.com/watch?v=VwuLbTRthRs',
          keyPoints: [
            'Sleep cycles and stages',
            'How sleep affects mental health',
            'Signs of sleep disorders',
            'Creating optimal sleep environment'
          ]
        }
      },
      {
        id: 'sleep-hygiene',
        title: 'Building Better Sleep Habits',
        type: 'reading',
        duration: '15 min',
        order: 2,
        content: {
          type: 'reading',
          keyPoints: [
            'Consistent sleep schedule',
            'Pre-sleep routines',
            'Managing screen time',
            'Diet and sleep connection'
          ],
          content: `
# Building Better Sleep Habits

## The Foundation of Good Sleep

Quality sleep is essential for mental health, emotional regulation, and cognitive function. Poor sleep can worsen anxiety, depression, and stress levels.

### Essential Sleep Hygiene Practices:

#### 1. Maintain a Consistent Schedule
- Go to bed and wake up at the same time daily
- Aim for 7-9 hours of sleep per night
- Avoid sleeping in on weekends

#### 2. Create a Relaxing Bedtime Routine
- Start winding down 1 hour before bed
- Try reading, gentle stretching, or meditation
- Avoid stimulating activities before sleep

#### 3. Optimize Your Sleep Environment
- Keep bedroom cool (60-67°F)
- Minimize noise and light
- Invest in comfortable bedding
- Remove electronic devices

#### 4. Mind Your Diet
- Avoid large meals close to bedtime
- Limit caffeine after 2 PM
- Avoid alcohol before sleep
- Stay hydrated throughout the day

### Common Sleep Disruptors
- Stress and anxiety
- Irregular schedules
- Too much screen time
- Uncomfortable sleep environment
- Caffeine and alcohol consumption

Remember: Good sleep habits take time to develop. Be patient and consistent with your new routine.
          `,
          resources: [
            'National Sleep Foundation',
            'American Academy of Sleep Medicine',
            'Sleep hygiene guidelines from NIH'
          ]
        }
      }
    ]
  },
  {
    id: 'emotional-intelligence',
    title: 'Developing Emotional Intelligence',
    description: 'Build emotional awareness and regulation skills for better relationships and mental health.',
    category: 'wellness',
    duration: '3.5 hours',
    difficulty: 'intermediate',
    instructor: 'Dr. Maria Santos',
    rating: 4.7,
    enrolledCount: 64,
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
    modules: [
      {
        id: 'emotional-awareness',
        title: 'Understanding Your Emotions',
        type: 'video',
        duration: '20 min',
        order: 1,
        content: {
          type: 'video',
          videoId: 'h-rGgpVbost',
          videoUrl: 'https://www.youtube.com/watch?v=h-rGgpVbost',
          keyPoints: [
            'What is emotional intelligence?',
            'The four domains of EQ',
            'Recognizing emotional patterns',
            'Benefits of high emotional intelligence'
          ]
        }
      },
      {
        id: 'emotion-regulation',
        title: 'Emotion Regulation Techniques',
        type: 'exercise',
        duration: '30 min',
        order: 2,
        content: {
          type: 'exercise',
          instructions: 'Practice techniques to manage intense emotions effectively.',
          duration: '30 minutes',
          steps: [
            'Identify the emotion you\'re experiencing',
            'Rate its intensity on a scale of 1-10',
            'Practice the STOP technique: Stop, Take a breath, Observe, Proceed',
            'Use the 6-second rule: wait 6 seconds before reacting',
            'Apply appropriate coping strategy (breathing, grounding, etc.)',
            'Reassess the emotion\'s intensity',
            'Reflect on what worked best for you'
          ]
        }
      }
    ]
  },
  {
    id: 'cognitive-behavioral-techniques',
    title: 'Cognitive Behavioral Techniques (CBT)',
    description: 'Learn evidence-based CBT strategies to change negative thought patterns.',
    category: 'anxiety',
    duration: '4 hours',
    difficulty: 'intermediate',
    instructor: 'Dr. Robert Kim',
    rating: 4.9,
    enrolledCount: 107,
    thumbnail: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=300&fit=crop',
    modules: [
      {
        id: 'cbt-introduction',
        title: 'Introduction to CBT',
        type: 'video',
        duration: '25 min',
        order: 1,
        content: {
          type: 'video',
          videoId: '0ViaCs0n4dU',
          videoUrl: 'https://www.youtube.com/watch?v=0ViaCs0n4dU',
          keyPoints: [
            'CBT principles and approach',
            'The thought-feeling-behavior triangle',
            'How CBT differs from other therapies',
            'What to expect in CBT practice'
          ]
        }
      },
      {
        id: 'thought-records',
        title: 'Thought Record Worksheets',
        type: 'reading',
        duration: '35 min',
        order: 2,
        content: {
          type: 'reading',
          keyPoints: [
            'Identifying automatic thoughts',
            'Examining evidence for and against',
            'Developing balanced thoughts',
            'Practice with real situations'
          ],
          content: `
# Thought Record Worksheets

## Understanding Automatic Thoughts

Automatic thoughts are the immediate thoughts that pop into our minds in response to situations. They often happen so quickly we don't notice them, but they significantly impact our emotions and behaviors.

### The Thought Record Process:

#### Step 1: Identify the Situation
- What happened?
- When and where did it occur?
- Who was involved?

#### Step 2: Notice Your Emotions
- What emotions did you feel?
- Rate their intensity (0-100)
- Identify physical sensations

#### Step 3: Catch Automatic Thoughts
- What went through your mind?
- What does this mean about me/others/the future?
- What am I afraid might happen?

#### Step 4: Examine the Evidence
**Evidence FOR the thought:**
- What facts support this thought?
- What experiences back this up?

**Evidence AGAINST the thought:**
- What facts contradict this thought?
- What would I tell a friend in this situation?
- Are there alternative explanations?

#### Step 5: Develop a Balanced Thought
- What's a more realistic way to think about this?
- What would be most helpful to believe?
- How can I be more compassionate to myself?

#### Step 6: Re-rate Your Emotions
- How do you feel now (0-100)?
- What changes do you notice?

### Example Thought Record:

**Situation:** Didn't get a response to my text message after 3 hours

**Emotion:** Anxiety (80/100), Hurt (60/100)

**Automatic Thought:** "They're ignoring me because they don't like me anymore"

**Evidence For:** They usually respond quickly

**Evidence Against:** They might be busy, phone could be dead, they might not have seen it

**Balanced Thought:** "There are many reasons they might not have responded yet. I'll give it more time before assuming anything negative."

**New Emotion Rating:** Anxiety (30/100), Hurt (20/100)

Practice this technique daily with minor situations to build the skill for more challenging moments.
          `,
          resources: [
            'Beck Institute for Cognitive Behavior Therapy',
            'Association for Behavioral and Cognitive Therapies',
            'Free CBT worksheets and resources'
          ]
        }
      }
    ]
  },
  {
    id: 'self-compassion',
    title: 'Building Self-Compassion',
    description: 'Develop a kinder relationship with yourself through self-compassion practices.',
    category: 'wellness',
    duration: '2.5 hours',
    difficulty: 'beginner',
    instructor: 'Dr. Jennifer Walsh',
    rating: 4.8,
    enrolledCount: 95,
    thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
    modules: [
      {
        id: 'self-compassion-intro',
        title: 'What is Self-Compassion?',
        type: 'video',
        duration: '16 min',
        order: 1,
        content: {
          type: 'video',
          videoId: 'IvtZBUSplr4',
          videoUrl: 'https://www.youtube.com/watch?v=IvtZBUSplr4',
          keyPoints: [
            'Three components of self-compassion',
            'Self-compassion vs self-esteem',
            'Common myths about self-compassion',
            'Research on self-compassion benefits'
          ]
        }
      },
      {
        id: 'self-compassion-break',
        title: 'The Self-Compassion Break',
        type: 'exercise',
        duration: '20 min',
        order: 2,
        content: {
          type: 'exercise',
          instructions: 'Learn to use the self-compassion break during difficult moments.',
          duration: '20 minutes',
          steps: [
            'Think of a current struggle or difficult situation',
            'Place your hand on your heart and acknowledge: "This is a moment of suffering"',
            'Remind yourself: "Suffering is part of the human experience"',
            'Offer yourself kindness: "May I be kind to myself in this moment"',
            'Take three deep breaths and notice any changes',
            'Practice with smaller difficulties throughout the day',
            'Use this technique whenever you notice self-criticism'
          ]
        }
      }
    ]
  },
  {
    id: 'advanced-mindfulness',
    title: 'Advanced Mindfulness Practices',
    description: 'Deepen your mindfulness practice with advanced techniques and longer meditations.',
    category: 'mindfulness',
    duration: '5 hours',
    difficulty: 'advanced',
    instructor: 'Dr. Michael Chen',
    rating: 4.9,
    enrolledCount: 42,
    thumbnail: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=400&h=300&fit=crop',
    modules: [
      {
        id: 'body-scan-meditation',
        title: 'Body Scan Meditation',
        type: 'video',
        duration: '45 min',
        order: 1,
        content: {
          type: 'video',
          videoId: 'ihO02wUzgkc',
          videoUrl: 'https://www.youtube.com/watch?v=ihO02wUzgkc',
          keyPoints: [
            'Systematic body awareness',
            'Working with physical sensations',
            'Accepting what arises without judgment',
            'Integrating body awareness into daily life'
          ]
        }
      },
      {
        id: 'loving-kindness',
        title: 'Loving-Kindness Meditation',
        type: 'video',
        duration: '30 min',
        order: 2,
        content: {
          type: 'video',
          videoId: 'sz7cpV7ERsM',
          videoUrl: 'https://www.youtube.com/watch?v=sz7cpV7ERsM',
          keyPoints: [
            'Cultivating loving-kindness for self',
            'Extending compassion to loved ones',
            'Including difficult people',
            'Universal loving-kindness practice'
          ]
        }
      }
    ]
  },
  {
    id: 'workplace-stress',
    title: 'Managing Workplace Stress',
    description: 'Strategies for maintaining mental health in challenging work environments.',
    category: 'stress',
    duration: '3 hours',
    difficulty: 'intermediate',
    instructor: 'Dr. Alex Thompson',
    rating: 4.7,
    enrolledCount: 118,
    thumbnail: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=300&fit=crop',
    modules: [
      {
        id: 'workplace-stressors',
        title: 'Identifying Workplace Stressors',
        type: 'video',
        duration: '18 min',
        order: 1,
        content: {
          type: 'video',
          videoId: 'yQq1-_ujXrM',
          videoUrl: 'https://www.youtube.com/watch?v=yQq1-_ujXrM',
          keyPoints: [
            'Common workplace stress triggers',
            'Signs of workplace burnout',
            'Impact on mental and physical health',
            'When to seek support'
          ]
        }
      },
      {
        id: 'workplace-boundaries',
        title: 'Setting Healthy Boundaries',
        type: 'reading',
        duration: '25 min',
        order: 2,
        content: {
          type: 'reading',
          keyPoints: [
            'Work-life balance strategies',
            'Saying no effectively',
            'Managing email and communication',
            'Creating physical and mental boundaries'
          ],
          content: `
# Setting Healthy Workplace Boundaries

## Why Boundaries Matter

Healthy boundaries protect your mental health, prevent burnout, and actually improve your work performance. They help you maintain energy and focus for what matters most.

### Types of Workplace Boundaries:

#### 1. Time Boundaries
- Set specific work hours and stick to them
- Avoid checking emails outside work hours
- Take regular breaks during the day
- Use all your vacation time

#### 2. Communication Boundaries
- Respond to emails within reasonable timeframes
- Set expectations about availability
- Use "do not disturb" settings when focusing
- Separate work and personal phone numbers

#### 3. Physical Boundaries
- Create a dedicated workspace if working from home
- Maintain good posture and ergonomics
- Take walking meetings when possible
- Step away from your desk for lunch

#### 4. Emotional Boundaries
- Don't take work conflicts personally
- Practice emotional detachment from office drama
- Seek support when feeling overwhelmed
- Separate your identity from your job performance

### Strategies for Boundary Setting:

#### Learn to Say No
- "I'd like to help, but I'm at capacity right now"
- "Let me check my schedule and get back to you"
- "I can do X or Y, but not both. Which is the priority?"

#### Communicate Proactively
- Set expectations early in projects
- Update colleagues on your availability
- Use auto-reply messages when needed
- Schedule "no meeting" blocks for focused work

#### Protect Your Energy
- Limit time with energy-draining colleagues
- Take micro-breaks throughout the day
- Practice stress-reduction techniques at work
- Create transition rituals between work and home

Remember: Setting boundaries isn't selfish—it helps you be more effective and present in all areas of your life.
          `,
          resources: [
            'American Psychological Association workplace resources',
            'Occupational Safety and Health Administration',
            'Harvard Business Review on workplace wellness'
          ]
        }
      }
    ]
  },
  {
    id: 'depression-recovery',
    title: 'Depression Recovery Toolkit',
    description: 'Comprehensive strategies for managing depression and building resilience.',
    category: 'depression',
    duration: '6 hours',
    difficulty: 'intermediate',
    instructor: 'Dr. Emily Rodriguez',
    rating: 4.8,
    enrolledCount: 76,
    thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    modules: [
      {
        id: 'depression-myths',
        title: 'Myths and Facts About Depression',
        type: 'video',
        duration: '20 min',
        order: 1,
        content: {
          type: 'video',
          videoId: 'z-IR48Mb3W0',
          videoUrl: 'https://www.youtube.com/watch?v=z-IR48Mb3W0',
          keyPoints: [
            'Debunking common depression myths',
            'Understanding depression as a medical condition',
            'The role of brain chemistry',
            'Treatment options and effectiveness'
          ]
        }
      },
      {
        id: 'behavioral-activation',
        title: 'Behavioral Activation Techniques',
        type: 'reading',
        duration: '30 min',
        order: 2,
        content: {
          type: 'reading',
          keyPoints: [
            'Activity scheduling and planning',
            'Graded task assignment',
            'Pleasant activity scheduling',
            'Building momentum through action'
          ],
          content: `
# Behavioral Activation Techniques

## Understanding Behavioral Activation

Behavioral activation is a highly effective treatment for depression that focuses on increasing engagement in meaningful, rewarding activities. It's based on the idea that our actions influence our emotions.

### Core Principles:

#### 1. Activity and Mood Connection
- Our activities directly impact how we feel
- Depression often leads to activity withdrawal
- Increasing positive activities improves mood
- Small steps lead to bigger changes

#### 2. Scheduling Pleasant Activities
Start with activities that used to bring you joy:
- Social connections (coffee with a friend)
- Creative pursuits (drawing, writing, music)
- Physical activities (walking, stretching)
- Nature activities (gardening, hiking)
- Self-care activities (bath, reading)

#### 3. Graded Task Assignment
Break large tasks into smaller, manageable steps:
- **Large task:** Clean the entire house
- **Smaller steps:** Make the bed → Clear one surface → Wash one load of dishes

#### 4. Activity Monitoring
Track your activities and mood:
- Rate activities on pleasure (0-10) and mastery (0-10)
- Notice patterns between activities and mood
- Identify which activities are most helpful

### Weekly Activity Planning:

#### Monday-Friday Focus Areas:
- **Morning:** One self-care activity
- **Afternoon:** One productive task
- **Evening:** One pleasant/social activity

#### Weekend Structure:
- Plan at least one meaningful activity
- Balance rest with engagement
- Include social connection if possible

### Getting Started:
1. Choose 2-3 small, achievable activities for this week
2. Schedule them at specific times
3. Start with 10-15 minutes if that's all you can manage
4. Celebrate small victories
5. Gradually increase activity level

Remember: The goal isn't to feel motivated before doing activities—often motivation follows action, not the other way around.
          `,
          resources: [
            'Behavioral Activation for Depression',
            'Centre for Clinical Interventions resources',
            'National Institute of Mental Health depression resources'
          ]
        }
      }
    ]
  }
];
