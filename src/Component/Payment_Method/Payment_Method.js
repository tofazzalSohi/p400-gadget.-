import React from "react";
import PaymentOutlinedIcon from "@material-ui/icons/PaymentOutlined";
import "./Payment_Method.css";
import { Checkbox } from "@material-ui/core";
const Payment_Method = ({ handleCash, handlePay, cash, pay }) => {
  return (
    <div className="payment__method">
      <div>
        <div>
          <PaymentOutlinedIcon></PaymentOutlinedIcon>
        </div>
        <h2>Payment Method</h2>
      </div>
      <div>
        <div>
          <Checkbox
            checked={cash}
            onChange={handleCash}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <p>Cash On Delivery</p>
        </div>
        <div>
          <Checkbox
            checked={pay}
            onChange={handlePay}
            inputProps={{ "aria-label": "primary checkbox" }}
          />
          <p>Paypal Payment</p>
        </div>
      </div>
    </div>
  );
};

export default Payment_Method;
