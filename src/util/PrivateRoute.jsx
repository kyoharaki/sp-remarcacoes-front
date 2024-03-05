import React from 'react';
import { Navigate } from 'react-router-dom';

export const PrivateRoute = ({children, auth}) => {
  	return auth === true ? children : <Navigate to="/login"/>;
}
