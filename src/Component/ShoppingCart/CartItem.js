import React, { useContext, useEffect, useState } from "react";
import "./ShoppingCart.css";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleRoundedIcon from "@material-ui/icons/RemoveCircleRounded";
import { CartContext } from "../Data_Context";
import { Button } from "@material-ui/core";
const CartItem = (props) => {
  const [cart, setCart] = useContext(CartContext);
  const { id, products, quantity, price, discount } = props;
  const arr = products?.find((x) => x._id === id);
  console.log(arr);
  const removeQuantity = () => {
    const newCart = [...cart];
    const tem = newCart.map((x) => {
      if (x.id === id) {
        if (x.quantity !== 1) {
          x.quantity = quantity - 1;
        }
        return x;
      } else {
        return x;
      }
    });
    setCart(tem);
  };
  const plusQuantity = () => {
    const newCart = [...cart];
    const tem = newCart.map((x) => {
      if (x.id === id) {
        x.quantity = quantity + 1;
        return x;
      } else {
        return x;
      }
    });
    setCart(tem);
  };
  const handleRemove = () => {
    const newArr = cart.filter((x) => x.id !== id);
    setCart(newArr);
  };
  return (
    <div className="cart__grid__container">
      <div>
        <img src={arr?.img} alt="" />
        <small>{arr?.name}</small>
      </div>
      <div>
        <div className="cart_plus_minus">
          <RemoveCircleRoundedIcon
            onClick={removeQuantity}
          ></RemoveCircleRoundedIcon>
          <span>{quantity}</span>
          <AddCircleIcon onClick={plusQuantity}></AddCircleIcon>
        </div>
      </div>

      <div>
        Tk. {Math.round(price * 85 - price * 85 * (arr?.discount / 100))}
      </div>
      <div>
        Tk.{" "}
        {Math.round(price * 85 - price * 85 * (arr?.discount / 100)) * quantity}
      </div>
      <div>
        <Button color="secondary" variant="outlined" onClick={handleRemove}>
          Remove Item
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
