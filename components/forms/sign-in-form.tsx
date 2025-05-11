import React, { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import { PressableScale } from "../ui/pressable-scale";
import { Facebook } from "@/assets/icons/facebook";
import { Google } from "@/assets/icons/google";
import { router } from "expo-router";
import { loginUser } from "@/services/auth-service";
import { SymbolView } from "expo-symbols";
import { toast } from "sonner-native";

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleLogin = async () => {
    try {
      if (!email || !password) {

        
        toast.error("Please fill in both email and password.", {
          duration: 6000,
          position: "bottom-center",
        });
        return;
      }

      await loginUser(email, password);

      router.replace("/(root)/(tabs)/home");

      
      toast.success("Successfully logged in!", {
        duration: 6000,
        position: "bottom-center",
      });

    } catch (error) {
      console.error("Login error: ", error);

      toast.error("Invalid credentials. Please try again.", {
        duration: 6000,
        position: "bottom-center",
      });

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
              
              <View
                className={` rounded-xl h-[50px] px-4 mt-2 border ${
                  isEmailFocused ? "border-accent" : "border-dark-5"
                }`}
              >
                <TextInput
                  className="flex-1 text-base"
                  placeholder="john@gmail.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  value={email}
                  onChangeText={setEmail}
                  selectionColor={"#FF4040"}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                />
              </View>
            </View>

            <View className="gap-y-3">
              <View className="gap-y-2">
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

              <View>
                <Text className="text-accent font-medium">
                  Forgot password?
                </Text>
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
          <PressableScale className="flex-1 bg-white rounded-xl h-[50px] items-center justify-center px-2">
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
