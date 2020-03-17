import React, { FunctionComponent,Component } from 'react';
import { observer } from '../../../common/util';
import './Header.scss';
import { useOktaAuth } from "@okta/okta-react";
import MessageList from "../MessageList/MessageList";


const Header = () => {
  const { authState, authService } = useOktaAuth();

  const login = async () => {
    // Redirect to '/' after login
    authService.login("/");
  };

  const logout = async () => {
    // Redirect to '/' after logout
    authService.logout("/");
  };

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  return authState.isAuthenticated ? (
    <>
    <MessageList/>
    <button onClick={logout}>Logout</button>
    </>
  ) : (
    <button onClick={login}>Login</button>
  );
};

export default Header;



