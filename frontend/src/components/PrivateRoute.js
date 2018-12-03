import React from 'react';
import { Redirect, Route } from 'react-router-dom';

export const PrivateRoute = ({ component: Component, isDataReady, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      console.log(isLoggedIn);
      if (!isLoggedIn) return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
      if (!isDataReady) return null;
      return <Component {...props} />;
    }}
  />
);
