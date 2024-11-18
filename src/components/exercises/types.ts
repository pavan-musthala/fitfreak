// Create a shared types file
interface ExerciseMedia {
  image: string;
  videoUrl: string;
  thumbnailUrl: string;
}

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  type: 'compound' | 'isolation';
  primary: string[];
  secondary?: string[];
  focus: string;
  equipment: string[];
  tips?: string[];
  media: ExerciseMedia;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  instructions: string[];
  commonMistakes?: string[];
} 