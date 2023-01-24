import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import styled from 'styled-components';
import { getAnalytics } from 'firebase/analytics';

const Register = () => {
  const firebaseConfig = {
    apiKey: 'AIzaSyC6yCUcB5iO-SPWoJ1cWbAGQINJ5XCdHsA',
    authDomain: 'chatting-84895.firebaseapp.com',
    projectId: 'chatting-84895',
    storageBucket: 'chatting-84895.appspot.com',
    messagingSenderId: '197986988899',
    appId: '1:197986988899:web:05ae3f992edb35483ad956',
    measurementId: 'G-B2WKDDFT3L',
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  // eslint-disable-next-line
  const analytics = getAnalytics(app);

  const auth = getAuth();
  const [inputValues, setInputValues] = useState({
    id: '',
    pw: '',
  });
  const navigate = useNavigate();

  const isValid =
    inputValues.id.includes('@') && inputValues.pw.length >= 5 ? false : true;

  const saveUserInput = e => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const resetInput = () => {
    setInputValues({ id: '', pw: '' });
  };

  const signUp = e => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, inputValues.id, inputValues.pw)
      .then(userCredential => {
        alert('회원가입이 완료되었습니다!');
        resetInput();
        // Signed in
        // eslint-disable-next-line
        const user = userCredential.user;
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        if (errorCode === 'auth/email-already-in-use') {
          alert('이미 존재하는 이메일입니다.');
          resetInput();
        }
        // ..
      });
  };

  return (
    <RegisterContainer>
      <RegisterForm>
        <h1>Maum Chat</h1>
        <div>
          <InputText type="text" placeholder="사용자이름" />
          <InputText
            onChange={saveUserInput}
            name="id"
            value={inputValues.id}
            type="email"
            placeholder="이메일"
          />
          <InputText
            onChange={saveUserInput}
            name="pw"
            value={inputValues.pw}
            type="password"
            placeholder="비밀번호"
          />
          <input style={{ display: 'none' }} type="file" id="file" />
          <label htmlFor="file">
            <i className="fa-solid fa-image" />
            &nbsp;&nbsp;<span>프로필 사진 추가</span>
          </label>
          <RegisterButton type="submit" onClick={signUp} disabled={isValid}>
            회원가입
          </RegisterButton>
          <span>
            이미 계정이 있신가요?
            <button onClick={() => navigate('/')}>로그인하기</button>
          </span>
        </div>
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

  span {
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
