import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { PressableScale } from "../ui/pressable-scale";
import { Facebook } from "@/assets/icons/facebook";
import { Google } from "@/assets/icons/google";
import { signInWithEmailAndPassword } from "firebase/auth";
import { router } from "expo-router";
import { auth } from "@/FirebaseConfig";
import { loginUser } from "@/services/auth-service";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async () => {
    try {
  
      if (!email || !password) {
        Alert.alert("Error", "Please fill in both email and password.");
        return;
      }

    
      await loginUser(email, password);

   
      router.replace("/(root)/(tabs)/home");
    } catch (error) {
      console.error("Login error: ", error);
      Alert.alert("Error", "Invalid credentials. Please try again.");
    }
  };


  return (
    <View className="w-full px-4">
      <View className="flex justify-between">
        <View>
          <View className="w-full gap-y-3 py-8">
            <Text className="text-3xl font-bold text-center text-dark-90">
              Let's log you in
            </Text>
            <Text className="text-center text-dark-40">
              Welcome back! You've been missed!
            </Text>
          </View>

          <View className="gap-y-5">
            <View className="gap-y-2">
              <Text className="text-dark-90 font-medium">Email</Text>
              <TextInput
                className="rounded-xl px-4 py-3 mt-2 h-[50px] bg-transparent border border-dark-5"
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View className="gap-y-3">
              <View className="gap-y-2">
                <Text className="text-dark-90 font-medium">Password</Text>
                <TextInput
                  className="rounded-xl px-4 py-3 mt-2 h-[50px] bg-transparent border border-dark-5"
                  placeholder="Password"
                  secureTextEntry
                  autoCapitalize="none"
                  autoComplete="password"
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              <View>
                <Text className="text-accent font-medium">Forgot password?</Text>
              </View>
            </View>
          </View>
        </View>

    
        <View className="mt-12">
          <PressableScale
            onPress={handleLogin}
            className="bg-accent h-[50px] flex flex-row gap-[6px] justify-center items-center px-5 mx-auto w-full rounded-2xl"
          >
            <Text className="text-white text-lg font-semibold">Login</Text>
          </PressableScale>
        </View>

        <View className="py-4 mx-auto">
          <Text className="font-bold text-lg">Or</Text>
        </View>

        <View className="flex-row gap-x-4">

          <PressableScale  className="flex-1 bg-white rounded-xl h-[50px] items-center justify-center px-2">
            <View>
              <Facebook width={24} height={24} />
            </View>
          </PressableScale>

          <PressableScale className="flex-1 bg-white rounded-xl h-[50px] items-center justify-center px-2">
            <View>
              <Google width={24} height={24} />
            </View>
          </PressableScale>
        </View>

        <View className="text-center flex-row justify-center items-center gap-1 mt-4">
          <Text className="text-dark-40 text-center">
            Don't have an account?
          </Text>

          <Pressable className="text-center">
            <Text className="text-center text-accent font-medium">Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SignInForm;
