import { Button } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import db from "../FirebaseConfig";
import firebase from "firebase";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import "./Details.css";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { CartContext } from "../Data_Context";
import { AllDataContext } from "../MainContext";
const Details = () => {
  const [cart, setCart] = useContext(CartContext);
  const [allProduct] = useContext(AllDataContext);
  const [added, setAdded] = useState(false);
  const { id } = useParams();
  const [pro, setPro] = useState(null);
  const handleAdd = () => {
    setAdded(true);
    const newCart = {
      id: id,
      quantity: 1,
      price: pro.price,
      discount: pro.discount,
      img: pro.img,
      name: pro.name,
    };
    setCart([...cart, newCart]);
    console.log(id);
  };
  const handleRemove = () => {
    const temp = cart.filter((x) => x.id !== id);
    setAdded(false);
    setCart(temp);
  };
  useEffect(() => {
    const arr = allProduct.find((x) => x._id === id);
    setPro(arr);
  }, [allProduct]);
  useEffect(() => {
    const isAdded = cart.find((x) => x.id === id);
    if (isAdded) {
      setAdded(true);
    }
  }, []);
  console.log(pro, "this is data");
  return (
    <>
      {pro && (
        <div className="details">
          <div>
            <img src={pro.img} alt="" />
          </div>
          <div>
            <div>
              <h2>{pro.name}</h2>
              <h4 style={{ color: "orange" }}>by acer</h4>
              <h3>
                Tk.
                {Math.round(
                  pro.price * 85 - pro.price * 85 * (pro.discount / 100)
                )}
              </h3>
              <h4>Available {pro.stock} Pieces</h4>
              <StarRatings
                rating={pro.star}
                starRatedColor="orange"
                numberOfStars={5}
                name="rating"
                starDimension="25px"
                starSpacing="2px"
              />
            </div>
            <div>
              {pro.features?.map((x) => (
                <div className="features">
                  <div>
                    <CheckCircleOutlineIcon></CheckCircleOutlineIcon>{" "}
                    {x.description}
                  </div>
                  <div>{x.value}</div>
                </div>
              ))}
            </div>
            <div className="details_Button">
              {!added ? (
                <Button variant="contained" onClick={handleAdd}>
                  <AddShoppingCartIcon></AddShoppingCartIcon>
                  Add To Cart
                </Button>
              ) : (
                <Button variant="contained" onClick={handleRemove}>
                  <CheckCircleIcon></CheckCircleIcon>
                  Item Added
                </Button>
              )}
              {added && (
                <Link className="link" to="/cart">
                  <Button>Go To Cart</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Details;
