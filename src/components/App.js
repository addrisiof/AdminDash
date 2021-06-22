import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Layout from "./Layout";
import Login from "../pages/login";
import { useUserState } from "../context/UserContext";

export default function App() {
  var { isAuthenticated } = useUserState();

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/home" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/home" />}
        />
        <PrivateRoute path="/app" component={Layout} />
        <PublicRoute path="/login" component={Login} />
      </Switch>
    </HashRouter>
  );


  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
