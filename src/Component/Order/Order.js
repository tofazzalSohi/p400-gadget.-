import React, { useContext, useEffect, useState } from "react";
import { AllOrderContext } from "../OrderContext";
import SideBar from "../SideBar/SideBar";
import { UserContext } from "../Sign_In_Context";
import "./Order.css";

const Order = () => {
  const [user, setUser] = useContext(UserContext);
  const [allOrder] = useContext(AllOrderContext);
  const [myOrder, setMyOrder] = useState([]);
  useEffect(() => {
    if (allOrder.length !== 0) {
      const newArr = allOrder.filter((x) => x.email === user.email);
      setMyOrder(newArr);
    }
  }, [allOrder]);
  return (
    <div className="profile">
      <SideBar init={false}></SideBar>
      <div className="order">
        <h2>My Orders</h2>
        <div style={{ overflowX: "auto" }}>
          <table className="table">
            <thead>
              <th>Order No.</th>
              <th>Details</th>
              <th>Order Date</th>
              <th>Order Status</th>
              <th>Payment</th>
            </thead>
            {myOrder.map((x, index) => (
              <tr>
                <td data-label="Order No.">{index + 1}</td>
                <td data-label="Details">
                  <ul>
                    {x.items.map((y) => (
                      <li>
                        <small>{y.name}</small>
                      </li>
                    ))}
                  </ul>
                </td>
                <td data-label="Order Date">{x?.date.toString()}</td>
                <td data-label="Order Status">{x?.status}</td>
                <td data-label="Payment">Tk.{x.pay}</td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
