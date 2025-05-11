import {
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "@/FirebaseConfig";
import { doc, Firestore, setDoc, Timestamp } from "firebase/firestore";
import { toast } from "sonner-native";
// import {sha256} from "react-native-sha256"
// import { AuthenticationToken, LoginManager} from "react-native-fbsdk-next"
// import oAuth from "@react-native-firebase/auth";

export const loginUser = async (email: string, password: string) => {
  try {
    // sign in the user with email and password using Firebase Auth
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Login error", error);
    throw new Error("Invalid credentials.");
  }
};

export const logoutUser = async () => {
  try {
    // sign out the user
    await signOut(auth);
    toast.success("Successfully logged out!", {
      duration: 6000,
      position: "bottom-center",
    });
  } catch (error) {
    console.error("Logout error", error);
    throw new Error("Failed to log out.");
  }
};

export const signupUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // update the user's profile to include the username
    await updateProfile(userCredential.user, { displayName: username });

    // create a reference to the user's document in the "users" collection in Firestore
    const userRef = doc(db, "users", userCredential.user.uid);

    // set the user's data in Firestore
    await setDoc(userRef, {
      email: email,
      username: username,
      uid: userCredential.user.uid,
      createdAt: Timestamp.fromDate(new Date()),
    });
  } catch (error) {
    console.error("Signup error", error);
    throw new Error("Failed to sign up. Please try again.");
  }
};

function generateNonce(length = 16) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let nonce = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    nonce += characters[randomIndex];
  }
  return nonce;
}

// export async function onFacebookButtonPressIOS() {
//   // Create a nonce and the corresponding
//   // sha256 hash of the nonce
//   const nonce = generateNonce();
//   const nonceSha256 = await sha256(nonce);
//   // Attempt login with permissions and limited login
//   const result = await LoginManager.logInWithPermissions(
//     ['public_profile', 'email'],
//     'limited',
//     nonceSha256,
//   );

//   if (result.isCancelled) {
//     throw 'User cancelled the login process';
//   }

//   // Once signed in, get the users AuthenticationToken
//   const data = await AuthenticationToken.getAuthenticationTokenIOS();

//   if (!data) {
//     throw 'Something went wrong obtaining authentication token';
//   }

//   // Create a Firebase credential with the AuthenticationToken
//   // and the nonce (Firebase will validates the hash against the nonce)
//   const facebookCredential = oAuth.FacebookAuthProvider.credential(data.authenticationToken, nonce);

//   // Sign-in the user with the credential
//   return oAuth().signInWithCredential(facebookCredential);
// }
