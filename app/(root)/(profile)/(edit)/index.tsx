import { View, Text, Pressable, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { PressableScale } from "@/components/ui/pressable-scale";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Image } from "expo-image";
import { SymbolView } from "expo-symbols";
import { router } from "expo-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/FirebaseConfig";
import { updateEmail } from "firebase/auth";

const EditScreen = () => {
  const { top, bottom } = useSafeAreaInsets();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;
  
      setEmail(user.email ?? "");
  
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setUsername(data.username ?? "");
      }
    };
  
    fetchUserData();
  }, []);

  const updateProfile = async () => {
    const user = auth.currentUser;
    if (!user) return;
  
    try {
      let emailUpdated = false;
 
      if (email !== user.email) {
        await updateEmail(user, email); 
        emailUpdated = true;
      }
  
    
      await updateDoc(doc(db, "users", user.uid), {
        username: username,
        email: emailUpdated ? email : user.email, 
      });
  
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <View className="flex-1 bg-white">
    <View className="flex-1 ">
      <View className="w-full bg-[#1A202F] relative " style={{ height: 244 }}>
        <Image
          source={require("@/assets/images/profile-background.png")}
          style={{ width: "100%", height: "100%", position: "absolute" }}
          contentFit="cover"
        />

        <SafeAreaView
          className="flex-row justify-between items-center px-4 pt-4"
          style={{ position: "absolute", top: 0, left: 0, right: 0 }}
        >
          <Pressable onPress={() => router.back()}>
            <SymbolView name="arrow.left" tintColor={"#fff"} />
          </Pressable>
          <Text className="text-xl font-semibold text-white">
            Edit Profile
          </Text>
          <View className="w-6" />
        </SafeAreaView>
      </View>

      <View className="flex-row justify-center items-center px-6 -mt-[50px]">
        <Image
          source={{ uri: "https://picsum.photos/seed/696/3000/2000" }}
          style={{
            height: 100,
            width: 100,
            borderRadius: 50,
          }}
          contentFit="cover"
        />
      </View>

      <View className="px-6 gap-y-3">
   
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
      </View>
      <View style={{ paddingBottom: bottom}} className = "px-6">
        <PressableScale
        onPress={() => updateProfile()}
          className="bg-accent h-[50px] flex flex-row gap-[6px] justify-center items-center px-5 mx-auto w-full rounded-xl"
        >
          <Text className="text-white text-lg font-semibold">Save</Text>
        </PressableScale>
      </View>

    </View>
  );
};

export default EditScreen;
