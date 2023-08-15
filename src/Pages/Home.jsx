import React from 'react';
import { useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';
import { getIsAuthorizated, getUserData } from 'redux/selectors';

function Home() {
  const IsAuthorizated = useSelector(getIsAuthorizated);
  console.log('IsAuthorizated: ', IsAuthorizated);
  const user = useSelector(getUserData);
  return (
    <>
      {IsAuthorizated ? (
        <div>
          <p
            style={{
              fontSize: 24,
              letterSpacing: 0.5,
              lineHeight: 1.5,
              textAlign: 'center',
              fontWeight: 700,
            }}
          >
            Wellcome {user?.name}
          </p>
        </div>
      ) : (
        <div>
          <p
            style={{
              fontSize: 18,
              letterSpacing: 0.5,
              lineHeight: 1.5,
              textAlign: 'center',
            }}
          >
            Wellcome to my contacts APP to see your contacts list please
            <NavLink
              style={{
                padding: 10,
                fontWeight: 600,
                textDecoration: 'underline',
              }}
              to="/login"
            >
              LOGIN
            </NavLink>
            or
            <NavLink
              style={{
                padding: 10,
                fontWeight: 600,
                textDecoration: 'underline',
              }}
              to="/register"
            >
              REGISTER
            </NavLink>
            new account
          </p>
        </div>
      )}
    </>
  );
}

export default Home;
