import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on mount
    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const getUsers = () => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  const signup = (username, email, password) => {
    const users = getUsers();

    // Check if user already exists
    if (users.find((u) => u.email === email)) {
      return { success: false, error: "Email already registered" };
    }

    if (users.find((u) => u.username === username)) {
      return { success: false, error: "Username already taken" };
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password, // In production, this should be hashed
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    saveUsers(users);

    // Auto-login after signup
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));

    return { success: true };
  };

  const login = (email, password) => {
    const users = getUsers();
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!foundUser) {
      return { success: false, error: "Invalid email or password" };
    }

    const { password: _, ...userWithoutPassword } = foundUser;
    setUser(userWithoutPassword);
    localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        signup,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
