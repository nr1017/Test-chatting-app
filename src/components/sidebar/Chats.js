import React from 'react';
import styled from 'styled-components';

const Chats = () => {
  return (
    <ChatsWrapper>
      <UserChat>
        <img
          src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt="dog"
        />
        <UserChatInfo>
          <span>Nara</span>
          <p>Hello</p>
        </UserChatInfo>
      </UserChat>{' '}
      <UserChat>
        <img
          src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt="dog"
        />
        <UserChatInfo>
          <span>Nara</span>
          <p>Hello</p>
        </UserChatInfo>
      </UserChat>
      <UserChat>
        <img
          src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt="dog"
        />
        <UserChatInfo>
          <span>Nara</span>
          <p>Hello</p>
        </UserChatInfo>
      </UserChat>
    </ChatsWrapper>
  );
};

export default Chats;

const ChatsWrapper = styled.div``;

const UserChat = styled.div`
  padding: 10px;
  ${({ theme }) => theme.variables.flex('', 'flex-start')}
  gap: 10px;
  color: ${({ theme }) => theme.style.white};
  cursor: pointer;

  &:hover {
    background-color: #2f2d52;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const UserChatInfo = styled.div`
  span {
    font-size: 18px;
    font-weight: 500;
  }

  p {
    font-size: 14px;
    color: lightgray;
  }
`;
