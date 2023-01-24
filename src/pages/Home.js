import React from 'react';
import Chat from '../components/Chat';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';

const Home = () => {
  return (
    <HomeWrapper>
      <HomeContainer>
        <Sidebar />
        <Chat />
      </HomeContainer>
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled.div`
  ${({ theme }) => theme.variables.flex()}
  height: 100vh;
  width: 100vw;
  background-color: #a7bcff;
`;

const HomeContainer = styled.div`
  display: flex;
  width: 65%;
  height: 80%;
  border: 1px solid #ffffff;
  border-radius: 10px;
  overflow: hidden;
`;
