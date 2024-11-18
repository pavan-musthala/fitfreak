interface ExerciseProgress {
  exerciseId: string;
  date: Date;
  weight: number;
  reps: number;
  sets: number;
  notes?: string;
}

export function ProgressTracker({ exerciseId }: { exerciseId: string }) {
  const [progress, setProgress] = useState<ExerciseProgress[]>([]);

  const addProgress = (newProgress: ExerciseProgress) => {
    setProgress([...progress, newProgress]);
    // Save to database
  };

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Progress Tracker</h3>
      {/* Progress form and history */}
    </div>
  );
} 