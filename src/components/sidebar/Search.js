import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';

const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, 'users'),
      where('displayName', '==', username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => {
        setUser(doc.data());
      });
    } catch (err) {
      console.log(err);
      setErr(true);
    }
  };

  const handleKey = e => {
    e.code === 'Enter' && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, 'chats', combinedId), { messages: [] });

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });

        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + '.date']: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }
    setUser(null);
    setUsername('');
  };

  return (
    <SearchWrapper>
      <SearchForm>
        <input
          type="text"
          placeholder="사용자 찾기"
          onKeyDown={handleKey}
          onChange={e => setUsername(e.target.value)}
          value={username}
        />
      </SearchForm>
      {err && <span>사용자를 찾을 수 없습니다.</span>}
      {user && (
        <UserChat onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <UserChatInfo>
            <span>{user.displayName}</span>
          </UserChatInfo>
        </UserChat>
      )}
    </SearchWrapper>
  );
};

export default Search;

const SearchWrapper = styled.div`
  border-bottom: 1px solid gray;
`;
const SearchForm = styled.div`
  padding: 10px;

  input {
    background-color: transparent;
    border: none;
    color: ${({ theme }) => theme.style.white};
    outline: none;

    &::placeholder {
      color: light gray;
    }
  }
`;
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
const UserChatInfo = styled.div``;
