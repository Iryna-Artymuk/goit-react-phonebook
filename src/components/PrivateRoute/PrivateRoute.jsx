import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsAuthorizated } from 'redux/selectors';

const PrivateRoute = ({ children, redirectTo = '/' }) => {
  const IsAuthorizated = useSelector(getIsAuthorizated);

  return IsAuthorizated ? <>{children}</> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
