import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const RootLayout = () => {
  return (
    <Stack >
    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    <Stack.Screen name="(details)/(services)/[id]" options={{ headerShown: false }} />
    <Stack.Screen name="(details)/(rent)/[id]" options={{ headerShown: false }} />
    <Stack.Screen name="(details)/(selling)/[id]" options={{ headerShown: false }} />
    </Stack>
  )
}

export default RootLayout