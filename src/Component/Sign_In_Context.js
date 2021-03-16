import React, { createContext, useEffect, useState } from "react";
import firebase from "firebase";
export const UserContext = createContext();

export const Sign_In_Context = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (usr) {
      if (usr) {
        const { email, displayName } = usr;
        const updateUser = {
          isSignIn: true,
          email: email,
          displayName,
        };
        setUser(updateUser);
      } else {
        setUser(null);
      }
    });
  }, []);
  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
