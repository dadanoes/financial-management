import { useState, useEffect } from "react";

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  level: "admin" | "admintoko" | null;
  userStore?: string; // Toko yang dikelola oleh admin toko
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>(() => {
    // Check if user is already logged in from localStorage
    const savedAuth = localStorage.getItem("financial-app-auth");
    if (savedAuth) {
      try {
        const parsed = JSON.parse(savedAuth);
        return {
          isAuthenticated: parsed.isAuthenticated || false,
          user: parsed.user || null,
          level: parsed.level || null,
          userStore: parsed.userStore || null,
        };
      } catch {
        return { isAuthenticated: false, user: null, level: null };
      }
    }
    return { isAuthenticated: false, user: null, level: null };
  });

  const login = (username: string, password: string): boolean => {
    // Admin utama - akses penuh
    if (username === "admin" && password === "admin123") {
      const newAuthState = {
        isAuthenticated: true,
        user: username,
        level: "admin" as const,
        userStore: undefined,
      };
      setAuthState(newAuthState);

      // Save to localStorage
      localStorage.setItem("financial-app-auth", JSON.stringify(newAuthState));

      return true;
    }

    // Admin toko - akses terbatas
    if (username === "admintoko" && password === "admintoko") {
      const newAuthState = {
        isAuthenticated: true,
        user: username,
        level: "admintoko" as const,
        userStore: "Toko Admin", // Default store untuk admin toko
      };
      setAuthState(newAuthState);

      // Save to localStorage
      localStorage.setItem("financial-app-auth", JSON.stringify(newAuthState));

      return true;
    }

    return false;
  };

  const logout = () => {
    const newAuthState = {
      isAuthenticated: false,
      user: null,
      level: null,
      userStore: undefined,
    };
    setAuthState(newAuthState);

    // Remove from localStorage
    localStorage.removeItem("financial-app-auth");
  };

  // Check authentication status on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("financial-app-auth");
    if (savedAuth) {
      try {
        const parsed = JSON.parse(savedAuth);
        if (parsed.isAuthenticated && parsed.user && parsed.level) {
          setAuthState({
            isAuthenticated: true,
            user: parsed.user,
            level: parsed.level,
            userStore: parsed.userStore || null,
          });
        }
      } catch {
        // Invalid data in localStorage, clear it
        localStorage.removeItem("financial-app-auth");
      }
    }
  }, []);

  return {
    isAuthenticated: authState.isAuthenticated,
    user: authState.user,
    level: authState.level,
    userStore: authState.userStore,
    login,
    logout,
  };
};
