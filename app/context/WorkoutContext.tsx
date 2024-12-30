import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserWorkouts, WorkoutFolder, Workout, Exercise } from '../types/workout';

interface WorkoutContextType {
    folders: WorkoutFolder[];
    currentFolder: WorkoutFolder | null;
    setCurrentFolder: (folder: WorkoutFolder | null) => void;
    addFolder: (name: string) => Promise<void>;
    deleteFolder: (id: string) => Promise<void>;
    addWorkout: (
        folderId: string,
        workout: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>
    ) => Promise<void>;
    deleteWorkout: ( folderId: string, workoutId: string) => Promise<void>;
    updateWorkout: ( folderId: string, workout: Workout) => Promise<void>;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export function WorkoutProvider({ children }: { children: React.ReactNode }) {
    const [folders, setFolders] = useState<WorkoutFolder[]>([]);
    const [currentFolder, setCurrentFolder] = useState<WorkoutFolder | null>(null);

    useEffect(() => {
        loadWorkouts();
    }, []);

    const loadWorkouts = async () => {
        try {
            const stored = await AsyncStorage.getItem('userWorkouts');
            if(stored) {
                const data: UserWorkouts = JSON.parse(stored);
                setFolders(data.folders);
                if(data.folders.length > 0) { 
                    setCurrentFolder(data.folders[0]); 
                }
            }
        } catch (error) {
            console.error('Error loading workouts:', error);
        }
    };

    const saveWorkouts = async (newFolders: WorkoutFolder[]) => {
        try {
            await AsyncStorage.setItem('userWorkouts', JSON.stringify({ folders: newFolders }));
            setFolders(newFolders);
        } catch (error) {
            console.error('Error saving workouts:', error)
        }
    };

    const addFolder = async (name: string) => {
        const newFolder: WorkoutFolder = {
            id: Date.now().toString(),
            name,
            workouts: [],
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        const newFolders = [...folders, newFolder];
        await saveWorkouts(newFolders);
        if (!currentFolder) {
            setCurrentFolder(newFolder);
        }
    };

    const deleteFolder = async (id: string) => {
        const newFolders = folders.filter(folder => folder.id !== id);
        await saveWorkouts(newFolders);
        if (currentFolder?.id === id) {
            setCurrentFolder(newFolders[0] || null);
        }
    };

    const addWorkout = async (
        folderId: string,
        workoutData: Omit<Workout, 'id' | 'createdAt' | 'updatedAt'>
    ) => {
        const newWorkout: Workout = {
            ...workoutData,
            id: Date.now().toString(),
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const newFolders = folders.map(folder => {
            if (folder.id === folderId) {
                return {
                    ...folder,
                    workouts: [...folder.workouts, newWorkout],
                    updatedAt: new Date(),
                };
            }
            return folder;
        });

        await saveWorkouts(newFolders);
    };

    const deleteWorkout = async (folderId: string, workoutId: string)  => {
        const newFolders = folders.map(folder => {
            if (folder.id === folderId) {
                return {
                    ...folder,
                    workouts: folder.workouts.filter(w => w.id !== workoutId),
                    updatedAt: new Date(),
                };
            }
            return folder;
        })

        await saveWorkouts(newFolders);
    };

    const updateWorkout = async (folderId: string, updatedWorkout: Workout) => {
        const newFolders = folders.map(folder => {
            if (folder.id === folderId) {
                return {
                    ...folder,
                    workouts: folder.workouts.map(w =>
                        w.id === updatedWorkout.id ? { ...updatedWorkout, updatedAt: new Date() } : w
                    ),
                    updatedAt: new Date(),
                };
            }
            return folder;
        });

        await saveWorkouts(newFolders);
    };

    return (
        <WorkoutContext.Provider value ={{
            folders,
            currentFolder,
            setCurrentFolder,
            addFolder,
            deleteFolder,
            addWorkout,
            deleteWorkout,
            updateWorkout,
        }}>
            {children}
        </WorkoutContext.Provider>
    );
}

export function useWorkouts() {
    const context = useContext(WorkoutContext);
    if (context === undefined) {
        throw new Error('useWorkouts must be used within a WorkoutProvider');
    }
    return context;
}