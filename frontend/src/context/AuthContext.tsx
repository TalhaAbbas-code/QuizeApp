import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthenticatedUser } from "../types/User";
import {CheckToken} from "../assets/utils/checkToken";



interface AuthContextType {
  user: AuthenticatedUser | null;
  setUser: (user: AuthenticatedUser | null) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  

  useEffect(() => {
    const fetchUser = async () => {
      CheckToken(setUser);
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook

