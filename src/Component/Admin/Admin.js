import React, { useContext, useEffect, useState } from "react";
import AdminSidebar from "./AdminSidebar";
import "./Admin.css";
import AdminDashboard from "./AdminDashboard";
import CreateProduct from "./CreateProduct";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Order from "./Order";
import { UserContext } from "../Sign_In_Context";
const Admin = () => {
  const [admin, setAdmin] = useState(true);
  const [adminStep, setAdminStep] = useState(1);
  const [user, setUser] = useContext(UserContext);
  const [pass, setPass] = useState("");
  let history = useHistory();
  const handleStep = (i) => {
    setAdminStep(i);
  };
  useEffect(() => {
    if (user?.email !== "sohi4000@gmail.com") {
      history.push("/");
    }
  }, [user]);
  return (
    <>
      {user?.email === "sohi4000@gmail.com" && (
        <div className="admin">
          <AdminSidebar handleStep={handleStep}></AdminSidebar>
          {adminStep === 1 && <AdminDashboard></AdminDashboard>}
          {adminStep === 2 && <CreateProduct></CreateProduct>}
          {adminStep === 3 && <Order></Order>}
        </div>
      )}
    </>
  );
};

export default Admin;
