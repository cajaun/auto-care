import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/FirebaseConfig";
import { PressableScale } from "../ui/pressable-scale";
import { Facebook } from "@/assets/icons/facebook";
import { Google } from "@/assets/icons/google";
import { signupUser } from "@/services/auth-service";
import { router } from "expo-router";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    if (!email || !password || !username) {
      Alert.alert("Missing Info", "Please fill in all fields.");
      return;
    }

    try {
      await signupUser(email, password, username);
      Alert.alert("Success", "Account created successfully!");
      
    
      router.replace("/(root)/(tabs)/home");  
    } catch (error: any) {
      Alert.alert("Sign Up Failed", error.message);
    }
  };
  return (
    <View className="w-full px-4">
      <View className="flex justify-between">
        <View className="w-full gap-y-3 py-8">
          <Text className="text-3xl font-bold text-center text-dark-90">Create an account</Text>
          <Text className="text-center text-dark-40">Create your new account and find more service</Text>
        </View>

        <View className="gap-y-5">
          <View className="gap-y-2">
            <Text className="text-dark-90 font-medium">Username</Text>
            <TextInput
              className="rounded-xl px-4 py-3 mt-2 h-[50px] bg-transparent border border-dark-5"
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View className="gap-y-2">
            <Text className="text-dark-90 font-medium">Email</Text>
            <TextInput
              className="rounded-xl px-4 py-3 mt-2 h-[50px] bg-transparent border border-dark-5"
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View className="gap-y-3">
            <Text className="text-dark-90 font-medium">Password</Text>
            <TextInput
              className="rounded-xl px-4 py-3 mt-2 h-[50px] bg-transparent border border-dark-5"
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        <View className="mt-12">
          <PressableScale
            onPress={handleSignUp}
            className="bg-accent h-[50px] flex flex-row gap-[6px] justify-center items-center px-5 mx-auto w-full rounded-2xl"
          >
            <Text className="text-white text-lg font-semibold">Sign up</Text>
          </PressableScale>
        </View>

        <View className="py-4 mx-auto">
          <Text className="font-bold text-lg">Or</Text>
        </View>

        <View className="flex-row gap-x-4">
          <PressableScale className="flex-1 bg-white rounded-xl h-[50px] items-center justify-center px-2">
            <Facebook width={24} height={24} />
          </PressableScale>

          <PressableScale className="flex-1 bg-white rounded-xl h-[50px] items-center justify-center px-2">
            <Google width={24} height={24} />
          </PressableScale>
        </View>

        <View className="text-center flex-row justify-center items-center gap-1 mt-4">
          <Text className="text-dark-40 text-center">Already Have an Account?</Text>
          <Pressable>
            <Text className="text-center text-accent font-medium">Sign In</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SignUpForm;
