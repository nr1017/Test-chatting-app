import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { db, storage } from '../../firebase';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {
  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        error => {
          //TODO:Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async downloadURL => {
            await updateDoc(doc(db, 'chats', data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, 'chats', data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, 'userChats', currentUser.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });
    await updateDoc(doc(db, 'userChats', data.user.uid), {
      [data.chatId + '.lastMessage']: {
        text,
      },
      [data.chatId + '.date']: serverTimestamp(),
    });

    setText('');
    setImg(null);
  };

  return (
    <InputWrapper>
      <input
        type="text"
        placeholder="메세지를 입력하세요"
        onChange={e => setText(e.target.value)}
        value={text}
      />
      <Send>
        <i className="fa-solid fa-paperclip"></i>
        <input
          type="file"
          style={{ display: 'none' }}
          id="file"
          onChange={e => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <i className="fa-solid fa-image"></i>
        </label>
        <button onClick={handleSend}>Send</button>
      </Send>
    </InputWrapper>
  );
};

export default Input;

const InputWrapper = styled.div`
  ${({ theme }) => theme.variables.flex('', 'space-between')}
  padding: 10px;
  height: 50px;
  background-color: #ffffff;

  input {
    width: 100%;
    border: none;
    outline: none;
    color: #2f2d52;
    font-size: 18px;

    &::placeholder {
      color: lightgray;
    }
  }
`;

const Send = styled.div`
  ${({ theme }) => theme.variables.flex()};
  gap: 10px;

  i {
    color: lightgray;
    font-size: 24px;
    cursor: pointer;
  }

  button {
    border: none;
    padding: 10px 15px;
    color: #ffffff;
    background-color: #8da4f1;
  }
`;
