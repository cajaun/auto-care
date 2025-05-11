
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/FirebaseConfig"; 
import { onAuthStateChanged, User } from "firebase/auth";
import { loginUser, logoutUser } from "@/services/auth-service";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// provide authentication state and functions to the rest of the app
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // login handler
  const login = async (email: string, password: string) => {
    try {
      await loginUser(email, password);

    } catch (error) {
      console.error("Login error", error);
    }
  };

  // logout handler
  const logout = async () => {
    try {
      await logoutUser();
      console.log("logged out")
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    // provide the auth context with user, loading, login, and logout values
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook to to access the authentication context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
