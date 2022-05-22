import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import auth from '../firebase.init';

const RequireAuth = ({children}) => {
    // const [user, loading, error] = useAuthState(auth);
  const  user=true;
    const location = useLocation()
    if(!user){
        // <Navigate to='/login' from={state:location}></Navigate>
    }
    return (
        [children]
    );
};

export default RequireAuth;