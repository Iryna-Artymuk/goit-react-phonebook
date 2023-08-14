import LoginForm from 'components/Forms/LoginForm';

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { getAuthLoginError, getIsAuthorizated } from 'redux/selectors';

export default function LoginPage() {
  const IsAuthorizated = useSelector(getIsAuthorizated);
  const loginError = useSelector(getAuthLoginError);

  if (IsAuthorizated) return <Navigate to="/contacts" />;

  return (
    <>
      {loginError && (
        <p className="error ">
          {loginError === 'Request failed with status code 400'
            ? 'looks like your password or email is not correct  or you have not  register your account yet   please,  try again '
            : loginError}
        </p>
      )}
      <LoginForm />
    </>
  );
}
