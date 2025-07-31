import { useState, useEffect } from "react";
import {
  User,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

interface UserWithRole extends User {
  role?: "admin" | "admintoko";
  userStore?: string | null;
}

interface AuthState {
  user: UserWithRole | null;
  loading: boolean;
  error: string | null;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true,
    error: null,
  });

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      async (user) => {
        if (user) {
          try {
            // Get user document from Firestore
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (userDoc.exists()) {
              const userData = userDoc.data();
              const userWithRole: UserWithRole = {
                ...user,
                role: userData.role || "admintoko",
                userStore: userData.userStore || null,
              };

              setAuthState({
                user: userWithRole,
                loading: false,
                error: null,
              });
            } else {
              // User document doesn't exist, create default role
              const userWithRole: UserWithRole = {
                ...user,
                role: "admintoko",
                userStore: null,
              };

              setAuthState({
                user: userWithRole,
                loading: false,
                error: null,
              });
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
            setAuthState({
              user: null,
              loading: false,
              error: "Failed to fetch user data",
            });
          }
        } else {
          setAuthState({
            user: null,
            loading: false,
            error: null,
          });
        }
      },
      (error) => {
        console.error("Auth state change error:", error);
        setAuthState({
          user: null,
          loading: false,
          error: error.message,
        });
      }
    );

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // The onAuthStateChanged listener will handle the rest
      return { success: true };
    } catch (error: any) {
      let errorMessage = "Login failed";

      switch (error.code) {
        case "auth/user-not-found":
          errorMessage = "Email tidak ditemukan";
          break;
        case "auth/wrong-password":
          errorMessage = "Password salah";
          break;
        case "auth/invalid-email":
          errorMessage = "Format email tidak valid";
          break;
        case "auth/too-many-requests":
          errorMessage = "Terlalu banyak percobaan login. Coba lagi nanti";
          break;
        default:
          errorMessage = error.message || "Terjadi kesalahan saat login";
      }

      setAuthState((prev) => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));

      return { success: false, error: errorMessage };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // The onAuthStateChanged listener will handle the state update
    } catch (error: any) {
      console.error("Logout error:", error);
      setAuthState((prev) => ({
        ...prev,
        error: "Gagal logout",
      }));
    }
  };

  return {
    user: authState.user,
    loading: authState.loading,
    error: authState.error,
    login,
    logout,
    isAuthenticated: !!authState.user,
    role: authState.user?.role,
    userStore: authState.user?.userStore,
  };
};
