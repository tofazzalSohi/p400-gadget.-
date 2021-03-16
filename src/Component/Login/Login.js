import { Button } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import firebase from "firebase";
import search from "../../Image/search.png";
import { UserContext } from "../Sign_In_Context";
import { useHistory } from "react-router-dom";
import { provider } from "../FirebaseConfig";
const Login = () => {
  const [login, setLogin] = useState(true);
  const [vis, setVis] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [user, setUser] = useContext(UserContext);
  const [error, setError] = useState(null);
  let history = useHistory();
  const handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(function (res) {
        updateUserName();
      })
      .catch(function (error) {
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };
  const updateUserName = () => {
    var user = firebase.auth().currentUser;
    user
      .updateProfile({
        displayName: userName,
      })
      .then(function () {
        const signUser = {
          isSignIn: true,
          displayName: userName,
          email: email,
        };
        setUser(signUser);
        history.goBack();
      })
      .catch(function (error) {
        alert(error.message);
      });
  };
  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function (res) {
        const signUser = [
          {
            isSignIn: true,
            email: res.user.email,
            displayName: res.user.displayName,
          },
        ];
        setUser(signUser);
        history.goBack();
      })
      .catch(function (error) {
        var errorMessage = error.message;
        setError(errorMessage);
      });
  };
  const handelSignInGoogle = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(function (result) {
        console.log(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useEffect(() => {
    //console.log("ami number one");
    firebase.auth().onAuthStateChanged(function (usr) {
      if (usr) {
        const { email, displayName } = usr;
        const updateUser = {
          isSignIn: true,
          email: email,
          displayName,
        };
        setUser(updateUser);
        history.goBack();
      } else {
      }
    });
  }, []);
  return (
    <div className="login">
      <div className="sign__up">
        <div>
          <h4>Gadget Zone</h4>
          {!login ? (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setLogin(true)}
            >
              Sign In
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setLogin(false)}
            >
              Sign Up
            </Button>
          )}
        </div>
        {!login ? <h2>Create an account</h2> : <h2>Log In</h2>}
        {!login && (
          <div>
            <input
              required
              type="text"
              placeholder="Enter Your Name"
              onChange={(e) => setUserName(e.target.value)}
            />
            <AlternateEmailIcon></AlternateEmailIcon>
          </div>
        )}
        <div>
          <input
            type="text"
            placeholder="Enter Your E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <AlternateEmailIcon></AlternateEmailIcon>
        </div>
        <div>
          <input
            type={vis ? "text" : "password"}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!vis ? (
            <VisibilityOffIcon onClick={() => setVis(true)}></VisibilityOffIcon>
          ) : (
            <VisibilityIcon onClick={() => setVis(false)}></VisibilityIcon>
          )}
        </div>
        {error && (
          <div className="error">
            <small>{error}</small>
          </div>
        )}
        {login ? (
          <Button variant="contained" color="primary" onClick={handleSignIn}>
            Sign In
          </Button>
        ) : (
          <Button variant="contained" color="primary" onClick={handleSignUp}>
            Sign Up
          </Button>
        )}

        {login && (
          <Button
            variant="outlined"
            color="primary"
            onClick={handelSignInGoogle}
          >
            {" "}
            <img src={search} alt="gmail" /> &nbsp;Sign In With Google
          </Button>
        )}
        <div className="signUp__footer">
          {login ? (
            <small>create a account </small>
          ) : (
            <small>already have an account ? </small>
          )}
          {login ? (
            <Button color="primary" onClick={() => setLogin(false)}>
              Sign Up
            </Button>
          ) : (
            <Button color="primary" onClick={() => setLogin(true)}>
              Sign In
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
