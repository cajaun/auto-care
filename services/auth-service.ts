import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "@/FirebaseConfig"; 


export const loginUser = async (email: string, password: string) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Login error", error);
    throw new Error("Invalid credentials.");
  }
};


export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout error", error);
    throw new Error("Failed to log out.");
  }
};

export const signupUser = async (email: string, password: string, username: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  
    await updateProfile(userCredential.user, { displayName: username });
  } catch (error) {
    console.error("Signup error", error);
    throw new Error("Failed to sign up. Please try again.");
  }
};