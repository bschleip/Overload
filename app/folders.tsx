import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
import React from 'react';

import { useWorkouts } from "./context/WorkoutContext"

interface FolderItemProps {
    title: string;
    onPress: () => void;
    onEdit: () => void;
}

const FolderItem = ({ title, onPress, onEdit }: FolderItemProps) => (
    <TouchableOpacity style={styles.folderItem} onPress={onPress}>
        <View style={styles.folderHeader}>
          <Text style={styles.folderTitle}>{title}</Text>
          <View style={styles.folderActions}>
            <TouchableOpacity onPress={onEdit}>
              <Text style={styles.editButton}>Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.workoutList}>- List of workouts</Text>
      </TouchableOpacity>
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

  const handleAddFolder = async () => {
    if (newFolderName.trim()) {
      await addFolder(newFolderName);
      setNewFolderName('');
      setAddFolderModalVisible(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Edit folders</Text>

      <ScrollView style={styles.folderList}>
        {folders?.map(folder => (
            <FolderItem
            key={folder.id}
            title={folder.name}
            onPress={() => alert("PRESS")}
            onEdit={() => alert("EDIT")}
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
      color: '#888'
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
});