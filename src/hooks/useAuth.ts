import { useState, useEffect } from "react";

interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
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
        };
      } catch {
        return { isAuthenticated: false, user: null };
      }
    }
    return { isAuthenticated: false, user: null };
  });

  const login = (username: string, password: string): boolean => {
    // Simple authentication - in production, this should be server-side
    if (username === "admin" && password === "admin123") {
      const newAuthState = {
        isAuthenticated: true,
        user: username,
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
        if (parsed.isAuthenticated && parsed.user) {
          setAuthState({
            isAuthenticated: true,
            user: parsed.user,
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
    login,
    logout,
  };
};
