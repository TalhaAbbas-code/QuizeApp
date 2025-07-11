import { Navigate } from "react-router-dom";
import { AuthenticatedUser } from "../types/User";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";


interface ProtectedRouteProps {
  
  children: React.ReactNode;
}
 
const ProtectedRoute = ({  children }: ProtectedRouteProps) => {
   const useAuth = useContext(AuthContext);
    if (!useAuth) {
      return (
        <div>
          Error: AuthContext not found. Make sure you're inside AuthProvider.
        </div>
      );
    }
    const { user, setUser } = useAuth;
  if (!user) {
    return <Navigate to="/login"  />;
  }
  return children;
};

export default ProtectedRoute;
