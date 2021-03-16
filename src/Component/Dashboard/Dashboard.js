import React, { useContext, useEffect, useState } from "react";
import SideBar from "../SideBar/SideBar";
import { UserContext } from "../Sign_In_Context";
import "./Dashboard.css";
import EmailIcon from "@material-ui/icons/Email";
import PersonIcon from "@material-ui/icons/Person";
import { AllOrderContext } from "../OrderContext";
const Dashboard = () => {
  const [user, setUser] = useContext(UserContext);
  const [allOrder] = useContext(AllOrderContext);
  const [myOrder, setMyOrder] = useState([]);
  useEffect(() => {
    if (allOrder.length !== 0) {
      const newArr = allOrder.filter((x) => x.email === user.email);
      setMyOrder(newArr);
    }
  }, [user]);
  console.log(myOrder);
  return (
    <div className="profile">
      <SideBar init={true}></SideBar>
      <div className="dashboard">
        <h2>Hello {user?.displayName}</h2>
        <div className="dashboard__body">
          <div className="dashboard__details">
            <h3>Personal Details</h3>
            <p>
              <PersonIcon></PersonIcon>&nbsp;{user?.displayName}
            </p>
            <p>
              <EmailIcon></EmailIcon>&nbsp;{user?.email}
            </p>
          </div>
          <div className="dashboard__total">
            <h3>Total Order</h3>
            <p>{myOrder.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
