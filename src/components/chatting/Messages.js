import React from 'react';
import styled from 'styled-components';
import Message from './Message';

const Messages = () => {
  return (
    <MessagesWrapper>
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
      <Message />
    </MessagesWrapper>
  );
};

export default Messages;

const MessagesWrapper = styled.div`
  padding: 10px;
  height: calc(100% - 100px);
  background-color: #ddddf7;
  overflow: scroll;
`;
