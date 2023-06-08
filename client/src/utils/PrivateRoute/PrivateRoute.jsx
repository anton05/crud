import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext/AuthContext";

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/signin" replace />
  };

  return <>{children}</>
};

export default PrivateRoute;