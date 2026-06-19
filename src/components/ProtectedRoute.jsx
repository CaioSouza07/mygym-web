import { Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Spinner from "./ui/Spinner";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Spinner />;

  if (!isAuthenticated) {
    return (
      <Navigate to={"/login"} state={{ from: location.pathname }} replace />
    );
  }
  return children;
}

export default ProtectedRoute;
