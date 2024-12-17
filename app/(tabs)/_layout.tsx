import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';

interface CustomTabBarIconProps {
  name: keyof typeof Ionicons.glyphMap;
  color: string;
  size: number;
  isCenterButton?: boolean;
  focused?: boolean;
}

const CustomTabBarIcon = ({ name, color, size, isCenterButton = false, focused = false }: CustomTabBarIconProps) => {
  if (isCenterButton) {
    return (
      <View style={styles.centerButtonContainer}>
        <View style={[
          styles.centerButton, 
          { backgroundColor: focused ? '#ffd33d' : '#888' }
        ]}>
          <Ionicons name={name} color="#25292e" size={size} />
        </View>
      </View>
    );
  }
  return <Ionicons name={name} color={color} size={size} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ffd33d',
        headerStyle: {
          backgroundColor: '#25292e',
        },
        headerShown: true,
        headerTintColor: '#fff',
        tabBarStyle: {
          backgroundColor: '#1a1a1a', // Darker background for tab bar
          borderTopWidth: 0,
          height: 60,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="workouts"
        options={{
          title: 'Workouts',
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              name={focused ? 'barbell' : 'barbell-outline'}
              color={focused ? '#ffd33d' : '#888'}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              name={focused ? 'book' : 'book-outline'}
              color={focused ? '#ffd33d' : '#888'}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="start"
        options={{
          title: 'Start',
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              name={focused ? 'add' : 'add-outline'}
              color={focused ? '#ffd33d' : '#888'}
              size={40}
              isCenterButton={true}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              name={focused ? 'person' : 'person-outline'}
              color={focused ? '#ffd33d' : '#888'}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          tabBarIcon: ({ focused }) => (
            <CustomTabBarIcon
              name={focused ? 'menu' : 'menu-outline'}
              color={focused ? '#ffd33d' : '#888'}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
  
const styles = StyleSheet.create({
  centerButtonContainer: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});