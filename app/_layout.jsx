import { Stack } from "expo-router/stack";
import {
  NativeScreenNavigationContainer,
  DarkTheme,
} from "react-native-screens";

export default function AppLayout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
