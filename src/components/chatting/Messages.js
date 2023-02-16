import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { ChatContext } from '../../context/ChatContext';
import { db } from '../../firebase';
import Message from './Message';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const usSub = onSnapshot(doc(db, 'chats', data.chatId), doc => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      usSub();
    };
  }, [data.chatId]);

  return (
    <MessagesWrapper>
      {messages.map(m => {
        return <Message message={m} key={m.id} />;
      })}
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
