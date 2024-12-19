import React, { useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, TextInput } from "react-native";
import { useLocalSearchParams, router } from 'expo-router';
import { ChevronLeft, MoreVertical } from 'lucide-react-native';

interface WorkoutSetProps {
  previous: string;
  onSetComplete?: () => void;
}

const WorkoutSet = ({ previous, onSetComplete }: WorkoutSetProps) => {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const handleSetComplete = () => {
    setIsComplete(!isComplete);
    onSetComplete?.();
  };

  return (
    <View style={styles.setContainer}>
      <Text style={styles.previousText}>Last: {previous}</Text>
      <TextInput
        style={styles.input}
        value={weight}
        onChangeText={setWeight}
        placeholder="Weight"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        value={reps}
        onChangeText={setReps}
        placeholder="Reps"
        placeholderTextColor="#888"
      />
      <TouchableOpacity
        style={[
          styles.completionButton,
          isComplete && styles.completionButtonComplete
        ]}
        onPress={handleSetComplete}
        onLongPress={() => console.log("Long press detected")}
      >
        <Text style={[
          styles.completionButtonText,
          isComplete && styles.completionButtonTextComplete
        ]}>
          {isComplete ? "✓" : ""}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

interface ExerciseProps {
  name: string;
  sets: Array<{ previous: string }>;
}

const Exercise = ({ name, sets }: ExerciseProps) => {
  return (
    <View style={styles.exerciseContainer}>
      <View style={styles.exerciseHeader}>
        <Text style={styles.exerciseName}>{name}</Text>
        <TouchableOpacity 
          onPress={() => console.log("Settings pressed")}
          style={styles.headerButton}
        >
          <MoreVertical color='#ffd33d' size={20} />
        </TouchableOpacity>
      </View>
      {sets.map((set, index) => (
        <WorkoutSet
          key={index}
          previous={set.previous}
          onSetComplete={() => console.log(`Set ${index + 1} completed`)}
        />
      ))}
    </View>
  );
};

export default function WorkoutTracker() {
  const { id, title, description } = useLocalSearchParams();
  const [exercises] = useState([
    {
      name: "Exercise 1",
      sets: [
        { previous: "100lb × 8" },
        { previous: "100lb × 8" },
        { previous: "100lb × 8" },
      ]
    },
    {
      name: "Exercise 2",
      sets: [
        { previous: "50lb × 12" },
        { previous: "50lb × 12" },
        { previous: "50lb × 12" },
      ]
    }
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.headerBar}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.headerButton}
        >
          <ChevronLeft color="#fff" size={24} />
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => console.log('Settings pressed')}
          style={styles.headerButton}
        >
          <MoreVertical color="#fff" size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.titleSection}>
        <Text style={styles.header}>{title as string}</Text>
        <Text style={styles.description}>{description as string}</Text>
      </View>

      <ScrollView style={styles.exerciseList}>
        {exercises.map((exercise, index) => (
          <Exercise
            key={index}
            name={exercise.name}
            sets={exercise.sets}
          />
        ))}
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => console.log("Add another pressed")}
          >
            <Text style={styles.addButtonText}>Add another</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.finishButton}
            onPress={() => console.log("Finish pressed")}
          >
            <Text style={styles.finishButtonText}>Finish</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
  },
  headerBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#25292e",
    paddingTop: 60,
  },
  headerButton: {
    padding: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSection: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  description: {
    color: '#888',
    marginTop: 8,
    fontSize: 14,
  },
  timer: {
    color: "#888",
    fontSize: 14,
  },
  exerciseList: {
    flex: 1,
    marginBottom: 16,
  },
  exerciseContainer: {
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  exerciseName: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  settingsButton: {
    color: "#ffd33d",
  },
  setContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  previousText: {
    color: "#888",
    fontSize: 14,
    marginRight: 12,
    flex: 1,
  },
  input: {
    backgroundColor: "#444",
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
    color: "#fff",
    width: 80,
  },
  completionButton: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderColor: "#555",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  completionButtonComplete: {
    borderColor: "#ffd33d",
  },
  completionButtonText: {
    color: "#888",
    fontSize: 16,
  },
  completionButtonTextComplete: {
    color: "#ffd33d",
  },
  buttonContainer: {
    gap: 8,
    padding: 16,
    marginTop: 16,
  },
  addButton: {
    backgroundColor: "#333",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  finishButton: {
    backgroundColor: "#ffd33d",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  finishButtonText: {
    color: "#000",
    fontSize: 16,
  },
});