export interface Exercise {
    id: string;
    name: string;
    sets: number;
    reps: number;
    weight?: number;
    notes?: string;
}

export interface Workout {
    id: string;
    name: string;
    exercises: Exercise[];
    lastPerformed?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface WorkoutFolder {
    id: string;
    name: string;
    workouts: Workout[];
    createdAt: Date;
    updatedAt: Date;
}

export interface UserWorkouts {
    folders: WorkoutFolder[];
}