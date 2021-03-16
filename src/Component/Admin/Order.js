import React, { useContext } from "react";
import { AllOrderContext } from "../OrderContext";
import OrderTable from "./OrderTable";

const Order = () => {
  const [allOrder, setAllOrder] = useContext(AllOrderContext);
  const handleAction = (e, id) => {
    const newArr = allOrder.map((x) => {
      if (x._id === id) {
        x.status = e.target.value;
        fetch(`https://nameless-lake-62164.herokuapp.com/update/order/${id}`, {
          method: "PATCH",
          body: JSON.stringify({
            status: e.target.value,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        })
          .then((response) => response.text())
          .then((json) => {
            console.log(json);
          });
        return x;
      } else {
        return x;
      }
    });
    setAllOrder(newArr);
  };
  return (
    <div className="order">
      <h2 style={{ color: "green" }}>
        #Today's Order :({new Date().toDateString()})
      </h2>
      <table>
        <tr>
          <th>Product List</th>
          <th>Cus. Name</th>
          <th>Cus. Mobile</th>
          <th>Address</th>
          <th>pay</th>
          <th>Payment Method</th>
          <th>Status</th>
        </tr>
        {allOrder.length !== 0 &&
          allOrder.map((x, index) => {
            if (x.date === new Date().toDateString()) {
              return <OrderTable data={x} action={handleAction}></OrderTable>;
            }
          })}
      </table>
      <h2 style={{ marginTop: "50px", color: "red" }}>#Pending Order List</h2>
      <table>
        <tr>
          <th>Product List</th>
          <th>Cus. Name</th>
          <th>Cus. Mobile</th>
          <th>Address</th>
          <th>pay</th>
          <th>Payment Method</th>
          <th>Status</th>
        </tr>
        {allOrder.length !== 0 &&
          allOrder.map((x, index) => {
            if (x.status === "pending") {
              return <OrderTable data={x} action={handleAction}></OrderTable>;
            } else if (allOrder.length === index + 1) {
              return <h2>No Products To Deliver</h2>;
            }
          })}
      </table>
      <h2 style={{ marginTop: "50px", color: "orange" }}>#All Order List</h2>
      <table>
        <tr>
          <th>Product List</th>
          <th>Cus. Name</th>
          <th>Cus. Mobile</th>
          <th>Address</th>
          <th>pay</th>
          <th>Payment Method</th>
          <th>Status</th>
        </tr>
        {allOrder.length !== 0 &&
          allOrder.map((x) => (
            <OrderTable data={x} action={handleAction}></OrderTable>
          ))}
      </table>
    </div>
  );
};

export default Order;
