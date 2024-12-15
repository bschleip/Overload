import React from "react";
import { Text, View, StyleSheet } from "react-native";

import Button from '@/components/Button'

export default function Index() {
  return (
    <View style={styles.container}>
      <Button 
        label='Create a workout'
        onPress={()=>alert('button pressed')}
      />
      <Text style={styles.text}>Create workout above</Text>
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