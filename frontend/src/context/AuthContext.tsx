import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { logoutUser } from '@/lib/api'; // Import the new logout API function

interface AuthContextType {
  token: string | null;
  user: any; // You might want to define a more specific user interface
  login: (token: string, user: any) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean; // Add loading state
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true); // Initialize as true

  // Load token and user from localStorage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    // In a real app, you'd also fetch user details here using the token
    // For simplicity now, we'll just check if a token exists
    if (storedToken) {
      setToken(storedToken);
      // TODO: Fetch user details from backend using the token
      // For now, assume a token means authenticated, user details will be null
      // setUser(fetchedUserDetails);
    }
    setIsLoading(false); // Loading is complete
  }, []);

  const login = (newToken: string, newUser: any) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(newUser); // Set user details upon login
  };

  const logout = async () => {
    try {
      await logoutUser(); // Make API call to backend logout route
    } catch (error) {
      console.error('Error during backend logout:', error); // Log error but proceed with client-side logout
    }
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token; // Check if token exists

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 