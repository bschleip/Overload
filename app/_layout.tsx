import { Stack } from "expo-router";
import { WorkoutProvider } from "./context/WorkoutContext";

export default function RootLayout() {
  return (
    <WorkoutProvider>
      <Stack>
        <Stack.Screen name='(tabs)' options={{ headerShown: false}} />
        <Stack.Screen name='workout' options={{ headerShown: false }} />
        <Stack.Screen name='+not-found'/>
      </Stack>
    </WorkoutProvider>
  );
}