import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { AuthContextProvider } from './context/AuthContext';
import { ChatContextProvider } from './context/ChatContext';
import Router from './Router';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import variables from './styles/variable';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <ThemeProvider theme={{ style: theme, variables }}>
        <GlobalStyle />
        <Router />
      </ThemeProvider>
    </ChatContextProvider>
  </AuthContextProvider>
);
