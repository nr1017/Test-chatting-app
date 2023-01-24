import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';
import Search from './Search';
import Chats from './Chats';

const Sidebar = () => {
  return (
    <SidebarWrapper>
      <Navbar />
      <Search />
      <Chats />
    </SidebarWrapper>
  );
};

export default Sidebar;

const SidebarWrapper = styled.div`
  flex: 1;
  position: relative;
  background-color: #3e3c61;
  border: 1px solid;
`;
