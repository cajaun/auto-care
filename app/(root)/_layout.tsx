import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { router, Stack } from 'expo-router'
import { useAuth } from '@/context/auth-context';

const RootLayout = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
     // redirect to auth screen if user is not authenticated and auth has finished loading
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
    <Stack.Screen name="(details)/(rent)/(booking)" options={{ headerShown: false }} />
    <Stack.Screen name="(details)/(selling)/[id]" options={{ headerShown: false }} />
    <Stack.Screen name="(payments)/(system)" options={{ headerShown: false }} />
    <Stack.Screen name="(payments)/(confirm)" options={{ headerShown: false }} />
    <Stack.Screen name="(payments)/(method)" options={{ headerShown: false }} />
    <Stack.Screen name="(profile)" options={{ headerShown: false }} />

    </Stack>
  )
}

export default RootLayout