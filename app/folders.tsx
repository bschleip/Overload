import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import React from 'react';

import { useWorkouts } from "./context/WorkoutContext"
import { UserWorkouts, WorkoutFolder, Workout, Exercise } from './types/workout';
import { router } from 'expo-router';

interface FolderItemProps {
  id: string;
  title: string;
  workouts: Workout[];
  isExpanded: boolean;
  onPress: () => void;
  onEdit: () => void;
  onWorkoutPress: (workoutId: string) => void;
}

const FolderItem = ({ 
  id,
  title, 
  workouts, 
  isExpanded,
  onPress, 
  onEdit 
}: FolderItemProps) => (
  <View style={styles.folderItem}>
    <TouchableOpacity 
      style={styles.folderHeader} 
      onPress={onPress}
    >
      <View style={styles.folderTitleRow}>
        <Text style={styles.folderTitle}>{title}</Text>
        <Text style={styles.workoutCount}>
          {workouts.length} workout{workouts.length !== 1 ? 's' : ''}
        </Text>
      </View>
      <View style={styles.folderActions}>
        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>

    <View style={styles.workoutList}>
      {workouts.length > 0 ? (
        workouts.map(workout => (
          <WorkoutItem 
            workout={workout} 
            isParentExpanded={isExpanded} 
          />
        ))
      ) : (
        <Text style={styles.emptyWorkouts}>No workouts in this folder</Text>
      )}
    </View>

  </View>
);

const WorkoutItem = ({ workout, isParentExpanded }: { 
  workout: Workout; 
  isParentExpanded: boolean 
}) => (
  <View style={styles.workoutContainer}>
    <TouchableOpacity 
      style={styles.workoutHeader} 
      onPress={() => router.push({
        pathname: "./(tabs)/start",
        params: { workoutId: workout.id }
      })}
    >
      <Text style={styles.workoutName}>{workout.name}</Text>
      <Text style={styles.workoutMeta}>
        {workout.exercises.length} exercises
      </Text>
    </TouchableOpacity>

    {isParentExpanded && (
      <View style={styles.exerciseList}>
        {workout.exercises.map((exercise) => (
          <Text key={exercise.id} style={styles.exerciseItem}>
            • {exercise.name} - {exercise.sets}x{exercise.reps}
            {exercise.weight ? ` @ ${exercise.weight}lb` : ''}
          </Text>
        ))}
      </View>
    )}
  </View>
);

export default function FolderScreen() {
  const {
    folders,
    currentFolder,
    setCurrentFolder,
    addFolder,
    deleteFolder,
    addWorkout
  } = useWorkouts();

  const [isAddFolderModalVisible, setAddFolderModalVisible] = React.useState(false);
  const [newFolderName, setNewFolderName] = React.useState('');
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(new Set());

  const handleAddFolder = async () => {
    if (newFolderName.trim()) {
      await addFolder(newFolderName);
      setNewFolderName('');
      setAddFolderModalVisible(false);
    }
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit folders</Text>

      <ScrollView style={styles.folderList}>
        {folders?.map(folder => (
          <FolderItem
            key={folder.id}
            id={folder.id}
            title={folder.name}
            workouts={folder.workouts}
            isExpanded={expandedFolders.has(folder.id)}
            onPress={() => alert("PRESS")}
            onEdit={() => alert("EDIT")}
            onWorkoutPress={(workoutId) => alert("WORKOUT PRESS"+workoutId)}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addFolderButton}
        onPress={() => setAddFolderModalVisible(true)}
      >
        <Text style={styles.addFolderButtonText}>Add new folder</Text>
      </TouchableOpacity>

      <Modal
        visible={isAddFolderModalVisible}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Folder</Text>
            <TextInput
              style={styles.input}
              value={newFolderName}
              onChangeText={setNewFolderName}
              placeholder="Folder name"
              placeholderTextColor="#888"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={styles.modalButton} 
                onPress={() => setAddFolderModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.modalButtonPrimary]} 
                onPress={handleAddFolder}
              >
                <Text style={[styles.modalButtonText, styles.modalButtonTextPrimary]}>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#25292e',
      padding: 16,
    },
    header: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 16,
    },
    folderList: {
      flex: 1,
    },
    folderItem: {
      backgroundColor: '#333',
      padding: 16,
      borderRadius: 8,
      marginBottom: 8,
      minHeight: 80,
    },
    folderHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    folderTitle: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    folderActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    editButton: {
      color: '#ffd33d',
    },
    workoutList: {
      marginTop: 8,
    },
    workoutItem: {
      color: '#888',
      fontSize: 14,
      marginVertical: 2,
    },
    emptyWorkouts: {
      color: '#666',
      fontSize: 14,
      fontStyle: 'italic',
    },
    addFolderButton: {
      backgroundColor: "#333",
      padding: 16,
      borderRadius: 8,
      alignItems: "center",
    },
    addFolderButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#333',
      padding: 24,
      borderRadius: 8,
      width: '80%',
    },
    modalTitle: {
      color: '#fff',
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    input: {
      backgroundColor: '#444',
      color: '#fff',
      padding: 12,
      borderRadius: 4,
      marginBottom: 16,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 16,
    },
    modalButton: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 4,
      backgroundColor: '#444',
    },
    modalButtonPrimary: {
      backgroundColor: '#ffd33d',
    },
    modalButtonText: {
      color: '#fff',
      fontSize: 16,
    },
    modalButtonTextPrimary: {
      color: '#25292e',
    },
    folderTitleRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    workoutCount: {
        color: '#888',
        fontSize: 14,
    },
    workoutContainer: {
        marginVertical: 4,
    },
    workoutHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        backgroundColor: '#3a3a3a',
        borderRadius: 6,
    },
    workoutName: {
        color: '#fff',
        fontSize: 15,
    },
    workoutMeta: {
        color: '#888',
        fontSize: 13,
    },
    exerciseList: {
        marginLeft: 24,
        marginTop: 4,
    },
    exerciseItem: {
        color: '#888',
        fontSize: 13,
        marginVertical: 2,
    },
});