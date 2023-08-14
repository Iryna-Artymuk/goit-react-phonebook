import RegisterForm from 'components/Forms/RegisterForm';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { getAuthRegisterError, getIsAuthorizated } from 'redux/selectors';

export default function RegisterPage() {
  const IsAuthorizated = useSelector(getIsAuthorizated);

  const registerError = useSelector(getAuthRegisterError);

  if (IsAuthorizated) return <Navigate to="/contacts" />;
  return (
    <>
      { registerError  && (
        <p className="error ">
          {/* { registerError } */}
          { registerError  === 'Request failed with status code 400'
            ? ' probably this user already exist try another email address'
            :  registerError }
        </p>
      )}
      <RegisterForm />
    </>
  );
}
