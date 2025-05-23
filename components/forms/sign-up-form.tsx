import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/FirebaseConfig";
import { PressableScale } from "../ui/pressable-scale";
import { Facebook } from "@/assets/icons/facebook";
import { Google } from "@/assets/icons/google";
import { signupUser } from "@/services/auth-service";
import { router } from "expo-router";
import { SymbolView } from "expo-symbols";
import { toast } from "sonner-native";

const SignUpForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !username) {
      toast.error("Please fill in all fields.", {
        duration: 6000,
        position: "bottom-center",
      });
      return;
    }

    try {
      await signupUser(email, password, username);

      toast.success("Account created successfully!", {
        duration: 6000,
        position: "bottom-center",
      });

      router.replace("/(root)/(tabs)/home");
    } catch (error: any) {
      toast.error("Unable to create account, please try again", {
        duration: 6000,
        position: "bottom-center",
      });
    }
  };
  return (
    <View className="w-full px-4">
      <View className="flex justify-between">
        <View className="w-full gap-y-3 py-8">
          <Text className="text-3xl font-bold text-center text-dark-90">
            Create an account
          </Text>
          <Text className="text-center text-dark-40">
            Create your new account and find more service
          </Text>
        </View>

        <View className="gap-y-5">
          <View className="gap-y-2">
            <Text className="text-dark-90 font-medium">Username</Text>
            <View
              className={`rounded-xl h-[50px] px-4 mt-2 border ${
                isUsernameFocused ? "border-accent" : "border-dark-5"
              }`}
            >
              <TextInput
                className="flex-1 text-base"
                placeholder="Username"
                value={username}
                
                onChangeText={setUsername}
                selectionColor={"#FF4040"}
                onFocus={() => setIsUsernameFocused(true)}
                onBlur={() => setIsUsernameFocused(false)}
              />
            </View>
          </View>

          <View className="gap-y-2">
            <Text className="text-dark-90 font-medium">Email</Text>
            <View
              className={`rounded-xl h-[50px] px-4 mt-2 border ${
                isEmailFocused ? "border-accent" : "border-dark-5"
              }`}
            >
            <TextInput
                  className="flex-1 text-base"
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              selectionColor={"#FF4040"}
              onFocus={() => setIsEmailFocused(true)}
              onBlur={() => setIsEmailFocused(false)}
            />
            </View>
          </View>

          <View className="gap-y-3">
            <Text className="text-dark-90 font-medium">Password</Text>
            <View
                  className={`flex-row items-center rounded-xl h-[50px] px-4 mt-2 border ${
                    isPasswordFocused ? "border-accent" : "border-dark-5"
                  }`}
                >
                  <TextInput
                    className="flex-1 text-base"
                    placeholder="••••••••"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoComplete="password"
                    value={password}
                    onChangeText={setPassword}
                    selectionColor={"#FF4040"}
                    onFocus={() => setIsPasswordFocused(true)}
                    onBlur={() => setIsPasswordFocused(false)}
                  />
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <SymbolView
                      name={showPassword ? "eye.slash.fill" : "eye.fill"}
                      tintColor={"#767982"}
                    />
                  </Pressable>
                </View>
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
          <Text className="text-dark-40 text-center">
            Already Have an Account?
          </Text>
          <Pressable>
            <Text className="text-center text-accent font-medium">Sign In</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default SignUpForm;
