import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [message]);

  return (
    <MessageWrapper
      ref={ref}
      owner={message.senderId === currentUser.uid ? true : false}
    >
      <MessageInfo>
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </MessageInfo>
      <MessageContent
        owner={message.senderId === currentUser.uid ? true : false}
      >
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </MessageContent>
    </MessageWrapper>
  );
};

export default Message;

const MessageWrapper = styled.div`
  display: flex;
  flex-direction: ${props => props.owner && 'row-reverse'};
  margin-bottom: 20px;
  gap: 10px;
`;

const MessageInfo = styled.div`
  ${({ theme }) => theme.variables.flex('column', 'flex-start', 'flex-start')}
  color: gray;
  font-weight: 300;

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const MessageContent = styled.div`
  max-width: 80%;
  display: flex;
  flex-direction: column;
  align-items: ${props => props.owner && 'flex-end'};
  gap: 10px;

  p {
    padding: 10px 20px;
    max-width: max-content;
    background-color: ${props => (props.owner ? '#8da4f1' : 'white')};
    color: ${props => props.owner && 'white'};
    border-radius: ${props =>
      props.owner ? '10px 0px 10px 10px' : '0px 10px 10px 10px'};
  }

  img {
    width: 50%;
  }
`;
