import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("booked_user");
    return saved ? JSON.parse(saved) : null;
  });

  function getUsers() {
    const saved = localStorage.getItem("booked_users");
    return saved ? JSON.parse(saved) : [];
  }

  function register(username, password) {
    const users = getUsers();
    if (
      users.find((u) => u.username.toLowerCase() === username.toLowerCase())
    ) {
      return { error: "Username already taken." };
    }
    const newUser = { id: Date.now(), username };
    localStorage.setItem(
      "booked_users",
      JSON.stringify([...users, { ...newUser, password }]),
    );
    return { success: true };
  }

  function login(username, password) {
    const users = getUsers();
    const match = users.find(
      (u) =>
        u.username.toLowerCase() === username.toLowerCase() &&
        u.password === password,
    );
    if (!match) return { error: "Invalid username or password." };
    const user = { id: match.id, username: match.username };
    localStorage.setItem("booked_user", JSON.stringify(user));
    setCurrentUser(user);
    return { success: true };
  }

  function logout() {
    localStorage.removeItem("booked_user");
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
