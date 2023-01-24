import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <Navbar />
    </SidebarWrapper>
  );
};

export default Sidebar;

const SidebarWrapper = styled.div`
  flex: 1;
  background-color: #3e3c61;
  border: 1px solid;
`;
