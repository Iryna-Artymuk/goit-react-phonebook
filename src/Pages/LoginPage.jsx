import LoginForm from 'components/Forms/LoginForm';

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { getAuthError, getIsAuthorizated } from 'redux/selectors';

export default function LoginPage() {
  const IsAuthorizated = useSelector(getIsAuthorizated);
  const error = useSelector(getAuthError);
  console.log(' error : ', error);
  if (IsAuthorizated) return <Navigate to="/contacts" />;

  return (
    <>
      {error && (
        <p className="error">{error}, please reload page and try again</p>
      )}
      <LoginForm />
    </>
  );
}
