import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Button } from "@material-ui/core";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
const AdminSidebar = ({ handleStep }) => {
  let history = useHistory();
  const handleActive = (e) => {
    document.getElementById(e).classList.add("pushActive");
    if (e === "adminDashboard") {
      document.getElementById("order").classList.remove("pushActive");
      document.getElementById("addProduct").classList.remove("pushActive");
      handleStep(1);
    }
    if (e === "addProduct") {
      document.getElementById("adminDashboard").classList.remove("pushActive");
      document.getElementById("order").classList.remove("pushActive");
      handleStep(2);
    }
    if (e === "order") {
      document.getElementById("adminDashboard").classList.remove("pushActive");
      document.getElementById("addProduct").classList.remove("pushActive");
      handleStep(3);
    }
  };
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
  return (
    <div className="sideBar">
      <h2>Admin</h2>
      <ul>
        <li>
          <DashboardIcon></DashboardIcon>
          <span id="adminDashboard" className="pushActive">
            <Button onClick={() => handleActive("adminDashboard")}>
              Dashboard
            </Button>
          </span>
        </li>
        <li>
          <ShoppingBasketIcon></ShoppingBasketIcon>
          <span id="order">
            <Button onClick={() => handleActive("order")}>Order List</Button>
          </span>
        </li>
        <li>
          <ShoppingBasketIcon></ShoppingBasketIcon>
          <span id="addProduct">
            <Button onClick={() => handleActive("addProduct")}>
              Launch New Product
            </Button>
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

export default AdminSidebar;
