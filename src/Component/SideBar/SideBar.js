import React from "react";
import "./SideBar.css";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import firebase from "firebase";
const SideBar = ({ init }) => {
  let history = useHistory();
  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function () {
        history.push("/");
      })
      .catch(function (error) {
        // An error happened.
      });
  };
  const handleActive = (e) => {
    document.getElementById(e).classList.add("pushActive");
    history.push(`/${e}`);
    if (e !== "order") {
      document.getElementById("order").classList.remove("pushActive");
    }

    if (e !== "dashboard") {
      document.getElementById("dashboard").classList.remove("pushActive");
    }
  };
  return (
    <div className="sideBar">
      <h2>My Account</h2>
      <ul>
        <li>
          <DashboardIcon></DashboardIcon>
          <span id="dashboard" className={init && "pushActive"}>
            <Button onClick={() => handleActive("dashboard")}>Dashboard</Button>
          </span>
        </li>
        <li>
          <ShoppingBasketIcon></ShoppingBasketIcon>
          <span id="order" className={!init && "pushActive"}>
            <Button onClick={() => handleActive("order")}>My Orders</Button>
          </span>
        </li>
        <li>
          <ExitToAppIcon></ExitToAppIcon>
          <Button onClick={handleSignOut}>Log Out</Button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
