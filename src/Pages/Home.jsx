import React from 'react';
import { ImUnderline } from 'react-icons/im';
import { NavLink } from 'react-router-dom';

function Home() {
  return (
    <div>
      <p
        style={{
          fontSize: 24,
          letterSpacing: 3.3,
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
        </NavLink>{' '}
        new account
      </p>
    </div>
  );
}

export default Home;
