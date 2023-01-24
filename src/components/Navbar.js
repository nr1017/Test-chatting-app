import React from 'react';
import styled from 'styled-components';

const Navbar = () => {
  return (
    <NavbarWrapper>
      <Logo>Maum Chat</Logo>
      <User>
        <img src="" alt="" />
        <span>Nara</span>
        <button>logout</button>
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
`;
const User = styled.div`
  display: flex;
  gap: 10px;

  img {
    background-color: #ddddf7;
    height: 24px;
    width: 24px;
    border-radius: 50%;
  }
`;
