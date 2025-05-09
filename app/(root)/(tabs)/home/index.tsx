import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { auth } from '@/FirebaseConfig';
import TabBarButton from '@/components/ui/tab-bar-buttons';
import { Configs } from '@/types/button-config';
import { SafeAreaView } from 'react-native-safe-area-context';



const HomeScreen = () => {


    const handleSignOut = async () => {
      try {
        await signOut(auth);
        router.replace("/(auth)/auth-screen"); 
      } catch (error) {
        console.error("Error signing out: ", error);
      }
    };


  return (
 <SafeAreaView>
<Pressable onPress={handleSignOut}><Text>Sign out</Text></Pressable>
 </SafeAreaView>
  )
}


export default HomeScreen