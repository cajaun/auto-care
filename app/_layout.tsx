import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Stack } from "expo-router";
import "./global.css";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { AuthProvider } from "@/context/auth-context";
import { StatusBar, useColorScheme } from "react-native";
import { Toaster } from "sonner-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaProvider>
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar
          barStyle={colorScheme === "dark" ? "light-content" : "dark-content"}
        />

        <BottomSheetModalProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(root)" options={{ headerShown: false }} />
          </Stack>
        </BottomSheetModalProvider>
        
        <Toaster />
      </GestureHandlerRootView>
    </AuthProvider>
    </SafeAreaProvider>
  );
}
