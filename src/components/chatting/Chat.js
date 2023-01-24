import React from 'react';
import styled from 'styled-components';
import Messages from './Messages';
import Input from './Input';

const Chat = () => {
  return (
    <ChatWrapper>
      <ChatInfo>
        <span>Nara</span>
        <i className="fa-solid fa-ellipsis"></i>
      </ChatInfo>
      <Messages />
      <Input />
    </ChatWrapper>
  );
};

export default Chat;

const ChatWrapper = styled.div`
  flex: 2;
`;

const ChatInfo = styled.div`
  ${({ theme }) => theme.variables.flex('', 'space-between')}
  padding: 10px;
  height: 50px;
  background-color: #5d5b8d;
  color: lightgray;

  i {
    font-size: 24px;
    cursor: pointer;
  }
`;
