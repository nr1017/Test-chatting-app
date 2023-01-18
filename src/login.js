import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const Login = () => {
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

  const signIn = e => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, inputValues.id, inputValues.pw)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        alert(`${user.email} 님 환영합니다!`);
        navigate('/main');
        // ...
      })
      .catch(error => {
        const errorCode = error.code;
        if (errorCode === 'auth/wrong-password') {
          alert('비밀번호를 확인하세요.');
        } else {
          alert('존재하지 않는 이메일입니다.');
        }
      });
  };

  return (
    <LoginPage>
      <LoginForm>
        <h1>Maumchat</h1>
        <div>
          <input
            onChange={saveUserInput}
            name="id"
            value={inputValues.id}
            type="email"
            placeholder="이메일"
          />
          <input
            onChange={saveUserInput}
            name="pw"
            value={inputValues.pw}
            type="password"
            placeholder="비밀번호"
          />
          <Button onClick={signIn} type="submit" disabled={isValid}>
            로그인
          </Button>
          <Button type="submit" onClick={signUp} disabled={isValid}>
            회원가입
          </Button>
        </div>
      </LoginForm>
    </LoginPage>
  );
};

export default Login;

const LoginPage = styled.div`
  ${({ theme }) => theme.variables.flex()}
  height: 100vh;
  width: 100vw;
  background-color: #fafafa;
`;

const LoginForm = styled.form`
  ${({ theme }) => theme.variables.flex('column')};
  height: 450px;
  width: 400px;
  background-color: #ffffff;
  border: 2px solid #eaeaea;

  h1 {
    margin-bottom: 24px;
    font-size: 45px;
    font-weight: 900;
    font-family: 'Lobster', cursive;
  }

  div {
    ${({ theme }) => theme.variables.flex('column')};
    width: 250px;

    input {
      margin-bottom: 6px;
      padding: 12px;
      width: 100%;
      background-color: #fafafa;
      border: 1px solid #eaeaea;
      border-radius: 5px;
    }
  }
`;

const Button = styled.button`
  margin-top: 12px;
  padding: 6px;
  width: 100%;
  background-color: #0095f6;
  color: #ffffff;
  border: 1px solid #0095f6;
  border-radius: 5px;
  font-weight: bold;
  opacity: ${prop => (prop.disabled ? '0.4' : '1')};
`;
