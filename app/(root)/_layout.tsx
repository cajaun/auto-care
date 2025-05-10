import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { router, Stack } from 'expo-router'
import { useAuth } from '@/context/auth-context';

const RootLayout = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/(auth)/auth-screen");
    }
  }, [user, loading]);

  if (loading) return null;

  return (
    <Stack >
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="(details)/(services)/[id]" options={{ headerShown: false }} />
    <Stack.Screen name="(details)/(rent)/[id]" options={{ headerShown: false }} />
    <Stack.Screen name="(details)/(selling)/[id]" options={{ headerShown: false }} />
    <Stack.Screen name="(profile)" options={{ headerShown: false }} />
    </Stack>
  )
}

export default RootLayout