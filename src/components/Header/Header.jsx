import React from 'react';
import {
  StyledAuthLinks,
  StyledHeader,
  StyledList,
  StyledNavLink,
  StyledUser,
} from './StyledHeader';
import { ImExit } from 'react-icons/im';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIsAuthorizated, getUserData } from 'redux/selectors';
import { logOut } from 'redux/operations';

// import Navigation from '../Navigation/Navigation'
// import { StyledContainer } from '../Layout/StyledLayout'

export default function Header({ children }) {
  const userData = useSelector(getUserData);
  const IsAuthorizated = useSelector(getIsAuthorizated);
  const dispatch = useDispatch();
  const handelLogout = () => dispatch(logOut());

  return (
    <StyledHeader>
      <StyledAuthLinks>
        {IsAuthorizated && (
          <StyledUser>
            <img
              src="https://api.dicebear.com/6.x/bottts/png"
              alt="avatar"
              width="40px "
              height="40px"
            />
            <span>{userData.name}</span>
          </StyledUser>
        )}
        {IsAuthorizated ? (
          <button type="button" onClick={handelLogout}>
            <ImExit size={24} />
          </button>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
          </>
        )}
      </StyledAuthLinks>

      <StyledList>
        <li>
          <StyledNavLink to="/">Home</StyledNavLink>
        </li>
        {IsAuthorizated && (
          <>
            <li>
              <StyledNavLink to="/Contacts">My Contacts</StyledNavLink>
            </li>

            <li>
              <StyledNavLink to="/favouriteContacts">Favourite</StyledNavLink>
            </li>
          </>
        )}
      </StyledList>
      {children}
    </StyledHeader>
  );
}
