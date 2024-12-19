import Button from '@/components/Button';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

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
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Edit folders</Text>

            <ScrollView style={styles.folderList}>
              <FolderItem
                title="Folder 1"
                onPress={() => alert('Folder 1 pressed')}
                onEdit={() => alert('Editing Folder 1')}
              />
              <FolderItem
                title="Folder 2"
                onPress={() => alert('Folder 2 pressed')}
                onEdit={() => alert('Editing Folder 2')}
              />
            </ScrollView>

            <TouchableOpacity
              style={styles.addFolderButton}
              onPress={() => alert('Add folder pressed')}
            >
              <Text style={styles.addFolderButtonText}>Add new folder</Text>
            </TouchableOpacity>
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
});