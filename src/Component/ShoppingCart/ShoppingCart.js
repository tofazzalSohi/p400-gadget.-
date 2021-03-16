import { Button } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../Data_Context";
import db from "../FirebaseConfig";
import CartItem from "./CartItem";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import { Link } from "react-router-dom";
import "./ShoppingCart.css";
import { AllDataContext } from "../MainContext";
const ShoppingCart = () => {
  const [cart, setCart] = useContext(CartContext);
  const [total, setTotal] = useState(0);
  const [allProduct] = useContext(AllDataContext);
  useEffect(() => {
    let taka = 0;
    cart.map((x) => {
      taka =
        taka + Math.round(x.price * 85 - x.price * 85 * (x.discount / 100));
    });
    setTotal(taka);
  }, []);
  useEffect(() => {
    let taka = 0;
    cart.map((x) => {
      taka =
        taka +
        Math.round(x.price * 85 - x.price * 85 * (x.discount / 100)) *
          x.quantity;
    });
    setTotal(taka);
  }, [cart]);

  return (
    <div className="shoppingCart">
      {cart.length !== 0 && (
        <div>
          <h2>My Cart ({cart.length})</h2>
          <Link to="/" variant="outlined" color="primary">
            Continue Shopping
          </Link>
        </div>
      )}
      {cart.length === 0 ? (
        <div className="shopping__cart__empty">
          <AddShoppingCartIcon></AddShoppingCartIcon>
          <p>Your Shopping Cart Is Empty</p>
          <h2>Add product to it. Check out our wide range of products!</h2>
          <Link className="link" to="/">
            <Button color="secondary" variant="contained">
              Go Home
            </Button>
          </Link>
        </div>
      ) : (
        <div className="shoppingCart__grid__container">
          <div>Product</div>
          <div>Quantity</div>
          <div>Unit Price</div>
          <div>SubTotal</div>
        </div>
      )}
      {cart.map((x) => (
        <div className="shoppingCart__grid__container__mobile">
          <div>
            <div>Product</div>
            <div>Quantity</div>
            <div>Unit Price</div>
            <div>SubTotal</div>
            <div>Remove</div>
          </div>
          <CartItem
            id={x.id}
            quantity={x.quantity}
            price={x.price}
            discount={x.discount}
            products={allProduct}
          ></CartItem>
        </div>
      ))}
      {cart.length !== 0 && (
        <div>
          <div className="cart__total">
            <h2>Cart Total: Tk. {total}</h2>
          </div>
          <div className="proceed_btn">
            <Link className="link" to="/checkout">
              <Button>
                Proceed To Checkout &nbsp;
                <LocalShippingIcon></LocalShippingIcon>
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
