import type { User } from "./types";

// Mock users for authentication
export const users: User[] = [
  {
    id: "u1",
    email: "admin@gmail.com",
    password: "123456",
    name: "Admin User",
    phone: "0123456789",
    avatar:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    role: "admin",
  },
  {
    id: "u2",
    email: "user@gmail.com",
    password: "123456",
    name: "Nguyen Van A",
    phone: "0987654321",
    avatar:
      "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    role: "user",
  },
  {
    id: "u3",
    email: "test@gmail.com",
    password: "password",
    name: "Test User",
    phone: "0555123456",
    role: "user",
  },
];

// Authentication helper functions
export const authenticateUser = (
  email: string,
  password: string
): User | null => {
  const user = users.find((u) => u.email === email && u.password === password);
  return user || null;
};

export const generateToken = (user: User): string => {
  // Generate a simple mock token
  return btoa(
    JSON.stringify({
      id: user.id,
      email: user.email,
      role: user.role,
      timestamp: Date.now(),
    })
  );
};

export const verifyToken = (token: string): User | null => {
  try {
    const decoded = JSON.parse(atob(token));
    const user = users.find((u) => u.id === decoded.id);
    return user || null;
  } catch {
    return null;
  }
};
