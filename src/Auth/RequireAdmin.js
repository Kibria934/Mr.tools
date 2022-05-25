import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../firebase.init";
import UseAdmin from "../Hook/UseAdmin";
import Loading from "../SharedPage/Loading";

const RequireAdmin = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  let location = useLocation();
  const [admin, adminLoading] = UseAdmin(user);

    if (loading || adminLoading) {
      return <Loading />;
    }
    if (!admin) {
      signOut(auth);
      return <Navigate to="/" />;
    }

  return children;
};

export default RequireAdmin;
