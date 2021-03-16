import React, { useContext } from "react";
import Navigation from "./Component/Navigation/Navigation";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Slider from "./Component/Slider/Slider";
import TopSelling from "./Component/TopSelling/TopSelling";
import NewArrival from "./Component/NewArrival/NewArrival";
import TopDells from "./Component/TopDells/TopDells";
import Advertise__1 from "./Component/Advertise__1/Advertise__1";
import ShowProduct from "./Component/ShowProduct/ShowProduct";
import Footer from "./Component/Footer/Footer";
import Login from "./Component/Login/Login";
import ShoppingCart from "./Component/ShoppingCart/ShoppingCart";
import Dashboard from "./Component/Dashboard/Dashboard";
import Order from "./Component/Order/Order";
import { PrivateRoute } from "./UseAuth";
import Checkout from "./Component/Checkout/Checkout";
import Details from "./Component/Product_Details/Details";
import Admin from "./Component/Admin/Admin";
import { AllDataContext } from "./Component/MainContext";
const Routing = () => {
  const [allProduct] = useContext(AllDataContext);
  return (
    <>
      {allProduct.length !== 0 ? (
        <Router>
          <Switch>
            <Route exact path="/">
              <Navigation></Navigation>
              <Slider></Slider>
              <TopSelling></TopSelling>
              <Advertise__1></Advertise__1>
              <TopDells></TopDells>
              <NewArrival></NewArrival>
              <Advertise__1></Advertise__1>
              <Footer></Footer>
            </Route>
            <Route exact path="/product/:id">
              <Navigation></Navigation>
              <ShowProduct></ShowProduct>
              <Footer></Footer>
            </Route>
            <Route exact path="/login">
              <Navigation></Navigation>
              <Login></Login>
              <Footer></Footer>
            </Route>
            <PrivateRoute exact path="/order">
              <Navigation></Navigation>
              <Order></Order>
              <Footer></Footer>
            </PrivateRoute>
            <PrivateRoute exact path="/dashboard">
              <Navigation></Navigation>
              <Dashboard></Dashboard>
              <Footer></Footer>
            </PrivateRoute>
            <Route exact path="/cart">
              <Navigation></Navigation>
              <ShoppingCart></ShoppingCart>
              <Footer></Footer>
            </Route>
            <Route exact path="/admin">
              <Navigation></Navigation>
              <Admin></Admin>
              <Footer></Footer>
            </Route>
            <Route exact path="/details/:id">
              <Navigation></Navigation>
              <Details></Details>
              <Footer></Footer>
            </Route>
            <PrivateRoute exact path="/checkout">
              <Navigation></Navigation>
              <Checkout></Checkout>
              <Footer></Footer>
            </PrivateRoute>
          </Switch>
        </Router>
      ) : (
        <div className="spinner_box">
          <h1>Gadget .</h1>
          <div class="loading">
            <div class="loader"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Routing;
