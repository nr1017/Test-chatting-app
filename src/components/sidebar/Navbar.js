import React, { useContext } from 'react';
import styled from 'styled-components';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  return (
    <NavbarWrapper>
      <Logo>Maum Chat</Logo>
      <User>
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        <button
          onClick={() => {
            signOut(auth);
            navigate('/login');
          }}
        >
          logout
        </button>
      </User>
    </NavbarWrapper>
  );
};

export default Navbar;

const NavbarWrapper = styled.div`
  ${({ theme }) => theme.variables.flex('', 'space-between')}
  height: 50px;
  padding: 10px;
  background-color: #2f2d52;
  color: #ddddf7;
`;
const Logo = styled.span`
  font-weight: bold;
  @media ${({ theme }) => theme.style.tablet} {
    display: none;
  }
`;
const User = styled.div`
  ${({ theme }) => theme.variables.flex('', 'flex-start')}
  gap: 10px;

  img {
    background-color: #ddddf7;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    object-fit: cover;
  }

  button {
    /* padding: 4px; */
    background-color: #5d5b8d;
    color: #ddddf7;
    border-style: none;
    font-size: 10px;

    @media ${({ theme }) => theme.style.tablet} {
      position: absolute;
      bottom: 10px;
    }
  }
`;
