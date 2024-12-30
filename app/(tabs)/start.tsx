import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput } from "react-native";
import { router } from "expo-router";

import { useWorkouts } from "../context/WorkoutContext";
import Button from "@/components/Button";

interface WorkoutItemProps {
  title: string;
  lastPerformed?: Date;
  onPress: () => void;
  onEdit: () => void;
}

const WorkoutItem = ({ title, lastPerformed, onPress, onEdit }: WorkoutItemProps) => (
  <TouchableOpacity style={styles.workoutItem} onPress={onPress}>
    <View style={styles.workoutHeader}>
      <Text style={styles.workoutTitle}>{title}</Text>
      <View style={styles.workoutActions}>
        <Text style={styles.lastDone}>
          {lastPerformed
            ? `Last done: ${new Date(lastPerformed).toLocaleDateString()}`
            : 'Never performed'
          }
        </Text>
        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

export default function StartScreen() {
  const {
    folders,
    currentFolder,
    setCurrentFolder,
    addFolder,
    addWorkout
  } = useWorkouts();

  const [isAddFolderModalVisible, setAddFolderModalVisible] = React.useState(false);
  const [newFolderName, setNewFolderName] = React.useState('');

  const handleAddFolder = async () => {
    if (newFolderName.trim()) {
      await addFolder(newFolderName);
      setNewFolderName('');
      setAddFolderModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Start a new workout</Text>

      <Button
        label="Freestyle workout"
        theme='boxed'
        onPress={() => router.push({
          pathname: "/workout/[id]",
          params: { 
            id: "freestyle",
            title: 'Freestyle Workout',
            description: 'Custom workout session'
          }
        })}
      />

      <View style={styles.folderSection}>
        <Text style={styles.folderText}>
          {currentFolder?.name || 'No folder selected'}
        </Text>
        <View style={styles.folderButtons}>
          <TouchableOpacity
            onPress={() => setAddFolderModalVisible(true)}
            style={styles.folderButton}
          >
            <Text style={styles.folderButtonText}>Add Folder</Text>
          </TouchableOpacity>
          {folders.length > 0 && (
            <TouchableOpacity
              onPress={() => router.push({
                pathname: "/folders",
                params: {
                  // TODO: add params
                }
              })}
              style={styles.folderButton}
            >
              <Text style={styles.folderButtonText}>Change Folder</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.workoutList}>
        {currentFolder?.workouts.map(workout => (
          <WorkoutItem
            key={workout.id}
            title={workout.name}
            lastPerformed={workout.lastPerformed}
            onPress={() => {alert("NAV TO WORKOUT START")}}
            onEdit={() => {alert("NAV TO WORKOUT EDIT")}}
          />
        ))}
        {currentFolder && currentFolder.workouts.length === 0 && (
          <Text style={styles.emptyText}>No workouts in this folder</Text>
        )}
      </ScrollView>

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
  );
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
    alignSelf: 'center'
  },
  folderSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  folderText: {
    color: '#fff',
    fontSize: 16,
  },
  folderButtons: {
    flexDirection: 'row',
  },
  folderButton: {
    marginLeft: 16,
  },
  folderButtonText: {
    color: '#ffd33d',
  },
  workoutList: {
    flex: 1,
  },
  workoutItem: {
    backgroundColor: '#333',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  workoutTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  workoutActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastDone: {
    color: '#888',
    marginRight: 16,
  },
  editButton: {
    color: '#ffd33d',
  },
  emptyText: {
    color: '#888',
    textAlign: 'center',
    marginTop: 32,
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
});