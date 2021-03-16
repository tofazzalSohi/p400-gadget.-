import { Button, Grid } from "@material-ui/core";
import React, { useState } from "react";
import "./Checkout.css";
import ShoppingBasketOutlinedIcon from "@material-ui/icons/ShoppingBasketOutlined";
import Shipping_Form from "../Shipping_Form/Shipping_Form";
import Payment_Method from "../Payment_Method/Payment_Method";
import Order_Summary from "../Order_Summary/Order_Summary";
import OrderDone from "./OrderDone";
const Checkout = () => {
  const [step, setStep] = useState(1);
  const [cash, setCash] = useState(true);
  const [pay, setPay] = useState(false);
  const [orderForm, setOrderForm] = useState([]);
  const handleCash = (event) => {
    setCash(event.target.checked);
    orderForm.payMethod = "cash";
    setPay(false);
  };
  const handlePay = (event) => {
    setPay(event.target.checked);
    orderForm.payMethod = "paypal";
    setCash(false);
  };
  const handleStep = (val) => {
    setStep(val);
  };
  console.log(orderForm);
  return (
    <div className="checkout">
      <div className="checkout__top">
        <div>
          <h2>CHECKOUT</h2>
          <h3>Please enter your details below to complete your purchase.</h3>
        </div>
        <Button variant="outlined">Back to cart</Button>
      </div>

      <Grid container className="checkout__bottom">
        <Grid item xs={12} sm={5}>
          {step === 1 && (
            <Shipping_Form
              handleStep={handleStep}
              setForm={setOrderForm}
            ></Shipping_Form>
          )}
          {step === 2 && (
            <Payment_Method
              cash={cash}
              pay={pay}
              handleCash={handleCash}
              handlePay={handlePay}
            ></Payment_Method>
          )}
          {step === 3 && <OrderDone></OrderDone>}
        </Grid>
        <Grid item xs={12} sm={7}>
          {step !== 3 && (
            <Order_Summary
              ste_p={setStep}
              step={step}
              cash={cash}
              pay={pay}
              setForm={setOrderForm}
              form_data={orderForm}
            ></Order_Summary>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Checkout;
