import React, { useContext, useEffect, useState } from "react";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { CartContext } from "../Data_Context";
import "./Order_Summary.css";
import { Button } from "@material-ui/core";
import PaypalExpressBtn from "react-paypal-express-checkout";
import CircularProgress from "@material-ui/core/CircularProgress";
import { AllOrderContext } from "../OrderContext";
const client = {
  sandbox:
    "Ad4Q8s_vIACFGYrXEERo70v3bYVpAcHJwnXL4ZhU8JMzgZTYaezbKFwBRKVMs0y1PPogqLOm-e2KvpcN",
  production: "YOUR-PRODUCTION-APP-ID",
};
let env = "sandbox";
let currency = "USD";
const Order_Summary = ({ pay, cash, ste_p, setForm, form_data, step }) => {
  const [cart, setCart] = useContext(CartContext);
  const [fin, setFin] = useState(false);
  const [spin, setSpin] = useState(false);
  const [allOrder, setAllOrder] = useContext(AllOrderContext);
  const [total, setTotal] = useState(() => {
    let taka = 0;
    cart.forEach((x) => {
      taka =
        taka +
        Math.round(x.price * 85 - x.price * 85 * (x.discount / 100)) *
          x.quantity;
    });
    return taka;
  });
  const onSuccess = (payment) => {
    console.log(payment);
    form_data.items = cart;
    form_data.pay = total;
    form_data.status = "pending";
    form_data.paid = payment.paid;
    form_data.payerID = payment.payerID;
    form_data.paymentID = payment.paymentID;
    form_data.date = new Date().toDateString();
    setFin(true);
    ste_p(3);
    setCart([]);
    setSpin(false);
    fetch("https://nameless-lake-62164.herokuapp.com/post/order", {
      method: "POST",
      body: JSON.stringify(form_data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((json) => {
        const newOrder = [...allOrder, form_data];
        setAllOrder(newOrder);
      });
  };
  const onError = (err) => {
    console.log("Error!", err);
  };
  const handlePlaceOrder = () => {
    console.log(form_data);
    setSpin(true);
    form_data.items = cart;
    form_data.pay = total;
    form_data.paid = false;
    form_data.status = "pending";
    form_data.date = new Date().toDateString();
    console.log(form_data);
    fetch("https://nameless-lake-62164.herokuapp.com/post/order", {
      method: "POST",
      body: JSON.stringify(form_data),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((json) => {
        setFin(true);
        ste_p(3);
        setCart([]);
        setSpin(false);
        const newOrder = [...allOrder, form_data];
        setAllOrder(newOrder);
      });
  };
  return (
    <>
      <div className="order__summary">
        <div>
          <div>
            <ShoppingCartOutlined></ShoppingCartOutlined>
          </div>
          <h2>Order Summary</h2>
        </div>
        <div>
          {cart.map((x) => (
            <div className="orderSummary__cart">
              <img src={x.img} alt="product" />
              <small>{x.name}</small>
              <p style={{ color: "#fb5607" }}>&times;{x.quantity}</p>
              <p>
                TK.{" "}
                {Math.round(x.price * 85 - x.price * 85 * (x.discount / 100)) *
                  x.quantity}
              </p>
            </div>
          ))}
        </div>
        <div className="subTotal">
          <div>
            <p>SubTotal:</p>
            <p>{total}</p>
          </div>
          <div>
            <p>Delivery Fee:</p>
            <p>Tk. {100}</p>
          </div>
        </div>
        <div className="total_Amount">
          <h3>Total: Tk. {cart.length !== 0 ? total + 100 : 0}</h3>
        </div>
        <div className="confirmOrder__btn">
          {cash &&
            (step === 2 && cart.length !== 0 ? (
              spin ? (
                <CircularProgress color="secondary" />
              ) : (
                <button
                  variant="contained"
                  color="primary"
                  className="confirm_btn"
                  onClick={handlePlaceOrder}
                  disabled={cart.length === 0}
                >
                  Place Order
                </button>
              )
            ) : (
              <button disabled>Confirm Order</button>
            ))}
          {pay && (
            <PaypalExpressBtn
              env={env}
              client={client}
              currency={currency}
              total={Math.round((total + 100) / 85)}
              onError={onError}
              onSuccess={onSuccess}
              shipping={2}
              large
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Order_Summary;
