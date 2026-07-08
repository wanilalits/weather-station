import { Navigate } from "react-router-dom";


interface Props {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: Props) {
  
  const loginToken = localStorage.getItem("loginToken");

  if (!loginToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export default ProtectedRoute;