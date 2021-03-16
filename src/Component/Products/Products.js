import React, { useContext, useEffect, useState } from "react";
import { Grid, Card, Button, Snackbar } from "@material-ui/core";
import "./Products.css";
import { Link, useHistory } from "react-router-dom";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { CartContext } from "../Data_Context";
import MuiAlert from "@material-ui/lab/Alert";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Products = ({ data, key }) => {
  const [cart, setCart] = useContext(CartContext);
  const [open, setOpen] = React.useState(false);
  const { name, img, price, category, discount, _id } = data;
  const [added, setAdded] = useState(false);
  const id = key;
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  let history = useHistory();
  const handleAdd = (e) => {
    e.stopPropagation();
    setOpen(true);
    const newCart = {
      id: _id,
      quantity: 1,
      price: price,
      discount: discount,
      img: img,
      name: name,
    };
    setCart([...cart, newCart]);
  };
  console.log(_id, key);
  const handleRemove = (e) => {
    e.stopPropagation();
    const temp = cart.filter((x) => x.id !== _id);
    setAdded(false);
    setCart(temp);
  };
  useEffect(() => {
    const isAdded = cart.find((x) => x.id === _id);
    if (isAdded) {
      setAdded(true);
    }
  }, [cart]);
  const handleGotoProduct = () => {
    history.push(`/details/${_id}`);
  };
  return (
    <>
      <Card className="products__card" onClick={handleGotoProduct}>
        {discount > 0 && (
          <div className="discount__box">
            <p>{discount}% off </p>
          </div>
        )}
        <div className="img__container">
          <img src={img} alt={img} />
        </div>
        <div className="products__card__bottom">
          <small>{category}</small>
          <p>{name}</p>
          {discount > 0 ? (
            <p>
              <small>
                <del style={{ color: "gray" }}>
                  Tk. {Math.round(price * 85)}
                </del>
              </small>
              &nbsp;Tk. {Math.round(price * 85 - price * 85 * (discount / 100))}
            </p>
          ) : (
            <p>Tk. {Math.round(price * 85)}</p>
          )}
        </div>
        <div className="add__cart__button">
          {!added ? (
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => handleAdd(e)}
            >
              <AddShoppingCartIcon></AddShoppingCartIcon>
              Add To Cart
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={(e) => handleRemove(e)}
            >
              <CheckCircleIcon></CheckCircleIcon>
              Item Added
            </Button>
          )}
        </div>
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            Product Added To Cart
          </Alert>
        </Snackbar>
      </Card>
    </>
  );
};

export default Products;
