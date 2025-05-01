
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AuthState, User, UserRole } from '@/types/auth';
import { useToast } from "@/components/ui/use-toast";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Depot Staff User',
    email: 'staff@ksrtc.com',
    role: 'depot-staff',
    depotId: 'depot-1',
    depotName: 'Thiruvananthapuram Depot'
  },
  {
    id: '2',
    name: 'Depot Admin User',
    email: 'admin@ksrtc.com',
    role: 'depot-admin',
    depotId: 'depot-1',
    depotName: 'Thiruvananthapuram Depot'
  },
  {
    id: '3',
    name: 'Super Admin User',
    email: 'superadmin@ksrtc.com',
    role: 'super-admin'
  }
];

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null
  });
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    setState({ ...state, loading: true, error: null });
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simple mock authentication
      const user = mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
      
      if (user && password === 'password') { // In a real app, you'd verify hashed passwords
        setState({
          isAuthenticated: true,
          user,
          loading: false,
          error: null
        });
        
        // Store user information in localStorage (in a real app, store JWT token)
        localStorage.setItem('ksrtcUser', JSON.stringify(user));
        
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        });
      } else {
        throw new Error('Invalid email or password');
      }
    } catch (error) {
      setState({
        isAuthenticated: false,
        user: null,
        loading: false,
        error: error instanceof Error ? error.message : 'Login failed'
      });
      
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: "Invalid email or password. Please try again.",
      });
    }
  };

  const logout = () => {
    // Remove user info from localStorage
    localStorage.removeItem('ksrtcUser');
    
    // Update state
    setState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null
    });
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
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
