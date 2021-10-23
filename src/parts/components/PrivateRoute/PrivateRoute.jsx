import React, { Fragment, useEffect } from "react";
import { useRecoilState } from "recoil";
import { Route, Redirect, useLocation } from "react-router-dom";

import ticketApi from "../../../services/api/ticketApi";
import isAuthenticatedState from "../../../state/isAuthenticatedState";
import stateOfAuthentication from "../../../utils/enums/stateOfAuthentication";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState(isAuthenticatedState);
  useEffect(() => {
    setIsAuthenticated(stateOfAuthentication.PROCESSING);
    ticketApi()
      .authToken()
      .then((result) => {
        if (result.isSuccess) {
          setIsAuthenticated(stateOfAuthentication.SUCCESS);
        } else {
          setIsAuthenticated(stateOfAuthentication.FAIL);
        }
      });
  }, []);

  if (isAuthenticated === stateOfAuthentication.PROCESSING) {
    return <Fragment />;
  } else {
    if (location.pathname === "/login") {
      return (
        <Route
          {...rest}
          render={() => {
            if (isAuthenticated === stateOfAuthentication.SUCCESS)
              return <Redirect to="/statistics" />;
            else if (isAuthenticated === stateOfAuthentication.FAIL)
              return <Component />;
          }}
        />
      );
    } else {
      return (
        <Route
          {...rest}
          render={() => {
            if (isAuthenticated === stateOfAuthentication.FAIL) {
              return <Redirect to="/login" />;
            } else {
              if (isAuthenticated === stateOfAuthentication.SUCCESS) {
                return <Component />;
              }
              return <Redirect to="/login" />;
            }
          }}
        />
      );
    }
  }
};

export default PrivateRoute;
