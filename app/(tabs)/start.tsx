import React from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { router } from "expo-router";

import Button from '@/components/Button';

interface WorkoutItemProps {
  title: string;
  onPress: () => void;
  onEdit: () => void;
};

const WorkoutItem = ({ title, onPress, onEdit }: WorkoutItemProps) => (
  <TouchableOpacity style={styles.workoutItem} onPress={onPress}>
    <View style={styles.workoutHeader}>
      <Text style={styles.workoutTitle}>{title}</Text>
      <View style={styles.workoutActions}>
        <Text style={styles.lastDone}>Last done</Text>
        <TouchableOpacity onPress={onEdit}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
    <Text style={styles.exerciseList}>- List of exercises</Text>
  </TouchableOpacity>
);

export default function StartScreen() {
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
        <Text style={styles.folderText}>Folder name</Text>
        <TouchableOpacity onPress={() => alert('Select folder')}>
          <Text style={styles.folderButton}>Select another folder</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.workoutList}>
        <WorkoutItem 
          title="Workout 1"
          onPress={() => router.push({
            pathname: "/workout/[id]",
            params: { 
              id: "workout1",
              title: 'Workout 1',
              description: 'First workout session'
            }
          })}
          onEdit={() => alert('Editing Workout 1')}
        />
        <WorkoutItem 
          title="Workout 2"
          onPress={() => alert('Starting Workout 2')}
          onEdit={() => alert('Editing Workout 2')}
        />
        <WorkoutItem
          title="Workout 3"
          onPress={() => alert('Starting Workout 3')}
          onEdit={() => alert('Editing Workout 3')}
        />
      </ScrollView>
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
  },
  folderButton: {
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
    marginBottom: 8,
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
  exerciseList: {
    color: '#888',
  },
});