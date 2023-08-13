import RegisterForm from 'components/Forms/RegisterForm';

import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { getAuthError, getIsAuthorizated } from 'redux/selectors';

export default function RegisterPage() {
  const IsAuthorizated = useSelector(getIsAuthorizated);

  const error = useSelector(getAuthError);

  if (IsAuthorizated) return <Navigate to="/contacts" />;
  return (
    <>
      {error && (
        <p className="error">
          {/* {error} */}
          {error === 'Request failed with status code 400'
            ? 'this user already exist try another email address'
            : error}
        </p>
      )}
      <RegisterForm />
    </>
  );
}
