import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

export const PrivateRoute = ({children, auth}) => {
  	return auth === true ? children : <Navigate to="/login"/>;
}
