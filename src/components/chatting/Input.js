import React from 'react';
import styled from 'styled-components';
const Input = () => {
  return (
    <InputWrapper>
      <input type="text" placeholder="메세지를 입력하세요" />
      <Send>
        <i className="fa-solid fa-paperclip"></i>
        <input type="flie" style={{ display: 'none' }} id="file" />
        <label htmlFor="file">
          <i className="fa-solid fa-image"></i>
        </label>
        <button>Send</button>
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
