import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

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
    <LoginContainer>
      <LoginForm>
        <h1>Maum Chat</h1>
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
          <LoginButton onClick={signIn} type="submit" disabled={isValid}>
            로그인
          </LoginButton>
          <span>
            계정이 없으신가요?
            <button onClick={() => navigate('/register')}>가입하기</button>
          </span>
        </div>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
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
    margin-bottom: 40px;
    font-size: 45px;
    font-weight: 900;
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

  span {
    margin-top: 42px;
    font-size: 14px;

    button {
      border-style: none;
      background-color: #ffffff;
      color: #0095f6;
    }
  }
`;

const LoginButton = styled.button`
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
