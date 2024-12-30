import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import Button from "@/components/Button"

export default function MenuScreen() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Menu screen</Text> */}
      <Button
        label="Reset App Data"
        theme='boxed'
        onPress={async () => {
          await AsyncStorage.clear();
          alert('Storage cleared');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
});