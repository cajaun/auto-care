import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SegmentedControl } from '@/components/ui/segmented-tab';
import SignInForm from '@/components/forms/sign-in-form';
import SignUpForm from '@/components/forms/sign-up-form';
import { Stack } from 'expo-router';

const AuthScreen = () => {
  const [selectedIndex, setSelectedIndex] = useState(0); 

  return (
    <View className = "flex-1">

    <SafeAreaView className="w-full h-full">

      <View className = "bg-dark-5 px-4">
      <SegmentedControl
        values={['Login', 'Sign up']}
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      />
      </View>


      <View className="w-full">
        {selectedIndex === 0 ? <SignInForm/> : <SignUpForm/>}
      </View>
    </SafeAreaView>
  </View>
  );
};

export default AuthScreen;
