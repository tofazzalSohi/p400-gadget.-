import React from "react";
import PaymentOutlinedIcon from "@material-ui/icons/PaymentOutlined";
import { Checkbox } from "@material-ui/core";
import { Link } from "react-router-dom";
const OrderDone = () => {
  return (
    <div className="payment__method">
      <div>
        <div>
          <PaymentOutlinedIcon></PaymentOutlinedIcon>
        </div>
        <h2>Order Success</h2>
      </div>
      <div>
        <h2>Thanks For Your Purchase</h2>
        <Link>Keep Shopping With Us !</Link>
      </div>
    </div>
  );
};

export default OrderDone;
