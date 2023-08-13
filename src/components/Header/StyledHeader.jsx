import { NavLink } from 'react-router-dom';
import { styled } from 'styled-components';

export const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  height: 90px;
  padding: 3px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  gap: 10px;
  background: ${({ theme }) => theme.colors.background};

  /* @media only screen and (min-width: 620px) {
    flex-direction: row;
    align-items: flex-end;
  } */
`;

export const StyledList = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 20px;

  /* @media only screen and (min-width: 620px) {
    width: 50%;
    display: flex;
    align-items: flex-end;
    justify-content: space-around;
  }
  @media only screen and (max-width: 400px) {
    justify-content: flex-start;
  } */
  li {
  }
`;
export const StyledNavLink = styled(NavLink)`
  position: relative;
  /* font-size: 24px; */
  font-weight: 700;
  letter-spacing: 1.3px;
  color: ${({ theme }) => theme.colors.textColor};
  &.active:before {
    content: '';
    width: 100%;
    height: 3px;
    position: absolute;
    bottom: -5px;
    left: 0;
    border-radius: 3px;
    background: ${({ theme }) => theme.colors.accentColor};
  }

  @media only screen and (min-width: 620px) {
    font-size: 24px;
    letter-spacing: 3.3px;
  }
`;
export const StyledAuthLinks = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-end;
  gap: 30px;

  a {
    position: relative;
    font-size: 18px;

    letter-spacing: 3.3px;
    color: ${({ theme }) => theme.colors.textColor};
    padding: 10px 25px;
    border-radius: 8px;
    &:hover {
      background: ${({ theme }) => theme.colors.accentColor};
      &:hover {
        color: ${({ theme }) => theme.colors.hoverTextColor};
      }
    }
    &.active:before {
      content: '';
      width: 70%;
      height: 3px;
      position: absolute;
      bottom: 5px;
      left: 15px;
      border-radius: 3px;
      background: ${({ theme }) => theme.colors.accentColor};
    }
  }

  button {
    font-size: 18px;

    letter-spacing: 3.3px;
    color: ${({ theme }) => theme.colors.textColor};
    padding: 10px 25px;
    border-radius: 8px;
    &:hover {
      background: ${({ theme }) => theme.colors.accentColor};
      &:hover {
        color: ${({ theme }) => theme.colors.hoverTextColor};
      }
    }
  }
`;
