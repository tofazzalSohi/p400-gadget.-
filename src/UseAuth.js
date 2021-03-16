import React, { useContext } from "react";
import { UserContext } from "./Component/Sign_In_Context";
import { Route, Redirect } from "react-router-dom";
export function PrivateRoute({ children, ...rest }) {
  const [user, setUser] = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
