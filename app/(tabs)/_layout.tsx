import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
      <Tabs
          screenOptions={{
              tabBarActiveTintColor: '#ffd33d',
              headerStyle: {
                  backgroundColor: '#25292e',
              },
              headerShown: false,
              headerTintColor: '#fff',
              tabBarStyle: {
                  backgroundColor: '#25292e',
              },
          }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Start',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'add' : 'add-outline'} color={color} size={24} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} color={color} size={24}/>
            ),
          }}
        />
        <Tabs.Screen
            name='menu'
            options={{
                title: 'Menu'
            }}
        />
      </Tabs>
    );
  }
  