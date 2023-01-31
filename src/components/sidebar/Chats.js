import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { db } from '../../firebase';

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), doc => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = u => {
    dispatch({ type: 'CHANGE_USER', payload: u });
  };

  return (
    <ChatsWrapper>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map(chat => (
          <UserChat
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            <img src={chat[1].userInfo.photoURL} alt="" />
            <UserChatInfo>
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </UserChatInfo>
          </UserChat>
        ))}
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
