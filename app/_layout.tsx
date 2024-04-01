import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Redirect, Stack, useLocalSearchParams, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { baseAPI } from "../apis/axios/config";
import { PaperProvider } from "react-native-paper";
import { theme } from "../components/UI/reactNativePaperTheme";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.

export default function AppLayout() {
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  // useEffect(() => {
  //     if (error) throw error;
  // }, [error]);

  // useEffect(() => {
  //     if (loaded) {
  //         SplashScreen.hideAsync();
  //     }
  // }, [loaded]);

  // if (!loaded) {
  //     return null;
  // }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <RootLayoutNav />
      </PaperProvider>
    </SafeAreaProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const params = useLocalSearchParams();

  return (
    <ThemeProvider value={DarkTheme}>
      <Stack screenOptions={{ contentStyle: { backgroundColor: "black" } }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="details"
          options={{
            headerShown: false,
            title: params.name as string,
            presentation: "modal",
            animation: "fade_from_bottom",
          }}
        />
        <Stack.Screen
          name="actor"
          options={{
            headerShown: false,
            title: params.name as string,
            presentation: "modal",
            animation: "slide_from_left",
          }}
        />
        <Stack.Screen
          name="sign-in"
          options={{
            headerShown: false,
            title: params.name as string,
            presentation: "modal",
            animation: "slide_from_left",
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
