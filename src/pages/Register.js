import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';

const Register = () => {
  const navigate = useNavigate();
  // const [inputValues, setInputValues] = useState({
  //   name: '',
  //   id: '',
  //   pw: '',
  //   file: '',
  // });
  const [error, setError] = useState(false);

  // const isValid =
  //   inputValues.name.length >= 3 &&
  //   inputValues.id.includes('@') &&
  //   inputValues.pw.length >= 5
  //     ? false
  //     : true;

  // const saveUserInput = e => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   setInputValues({ ...inputValues, [name]: value });
  // };

  // const resetInput = () => {
  //   setInputValues({ name: '', id: '', pw: '', file: '' });
  // };

  const signUp = async e => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, `${displayName}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async downloadURL => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, 'users', res.user.uid), {
              displayName,
              email,
              photoURL: downloadURL,
              uid: res.user.uid,
            });
            await setDoc(doc(db, 'userChats', res.user.uid), {});
            navigate('/');
          } catch (err) {
            console.log(err);
            setError(true);
          }
        });
      });
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <RegisterContainer>
      <RegisterForm onSubmit={signUp}>
        <h1>Maum Chat</h1>
        <div>
          <InputText name="name" type="text" placeholder="사용자이름" />
          <InputText name="id" type="email" placeholder="이메일" />
          <InputText name="pw" type="password" placeholder="비밀번호" />
          <input
            name="file"
            style={{ display: 'none' }}
            type="file"
            id="file"
          />
          <label htmlFor="file">
            <i className="fa-solid fa-image" />
            &nbsp;&nbsp;<span>프로필 사진 추가</span>
          </label>
          <RegisterButton>회원가입</RegisterButton>
          {error && (
            <span style={{ color: 'red', fontSize: '14px' }}>
              이미 존재하는 이메일입니다
            </span>
          )}
        </div>
        <p>
          이미 계정이 있신가요?
          <button onClick={() => navigate('/login')}>로그인하기</button>
        </p>
      </RegisterForm>
    </RegisterContainer>
  );
};

export default Register;

const RegisterContainer = styled.div`
  ${({ theme }) => theme.variables.flex()}
  height: 100vh;
  width: 100vw;
  background-color: #fafafa;
`;

const RegisterForm = styled.form`
  ${({ theme }) => theme.variables.flex('column')};
  height: 550px;
  width: 400px;
  background-color: #ffffff;
  border: 2px solid #eaeaea;

  h1 {
    margin-bottom: 40px;
    font-size: 45px;
    font-weight: 900;
  }

  div {
    ${({ theme }) => theme.variables.flex('column')};
    width: 250px;

    label {
      margin-top: 12px;
      color: #787878;
      cursor: pointer;
    }
  }

  p {
    margin-top: 18px;
    font-size: 14px;

    button {
      border-style: none;
      background-color: #ffffff;
      color: #0095f6;
    }
  }
`;

const InputText = styled.input`
  margin-top: 6px;
  padding: 12px;
  width: 100%;
  background-color: #fafafa;
  border: 1px solid #eaeaea;
  border-radius: 5px;
`;

const RegisterButton = styled.button`
  margin: 30px 0;
  padding: 6px;
  width: 100%;
  background-color: #0095f6;
  color: #ffffff;
  border: 1px solid #0095f6;
  border-radius: 5px;
  font-weight: bold;
  opacity: ${prop => (prop.disabled ? '0.4' : '1')};
`;
