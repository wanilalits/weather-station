import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { tokenVerification} from '../services/tokenVerification'

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