import React from 'react';
import styled from 'styled-components';

const Message = () => {
  return (
    <MessageOwner>
      <MessageInfo>
        <img
          src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt="dog"
        />
        <span>just now</span>
      </MessageInfo>
      <MessageOwnerContent>
        <p>hello</p>
        <img
          src="https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
          alt=""
        />
      </MessageOwnerContent>
    </MessageOwner>
  );
};

export default Message;

// const MessageWrapper = styled.div`
//   display: flex;
//   margin-bottom: 20px;
//   gap: 10px;
// `;

const MessageOwner = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 20px;
  gap: 10px;

  /* p {
    background-color: #8da4f1;
  color: ${({ theme }) => theme.style.white};
    border-radius: 10px 0 10px 10px;
  } */
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
// const MessageContent = styled.div`
//   max-width: 80%;
//   ${({ theme }) => theme.variables.flex('column', 'flex-start', 'flex-start')}
//   gap: 10px;

//   p {
//     background-color: ${({ theme }) => theme.style.white};
//     padding: 10px 20px;
//     border-radius: 0px 10px 10px 10px;
//     max-width: max-content;
//   }

//   img {
//     width: 50%;
//   }
// `;

const MessageOwnerContent = styled.div`
  max-width: 80%;
  ${({ theme }) => theme.variables.flex('column', 'flex-start', 'flex-end')}
  gap: 10px;

  p {
    background-color: #8da4f1;
    color: ${({ theme }) => theme.style.white};
    padding: 10px 20px;
    border-radius: 10px 0 10px 10px;
    max-width: max-content;
  }

  img {
    width: 50%;
  }
`;
