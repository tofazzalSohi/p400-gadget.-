import React, { createContext, useEffect, useState } from "react";
import axios from "./axios";
export const AllDataContext = createContext();
export const MainContext = (props) => {
  const [allProduct, setAllProduct] = useState([]);
  useEffect(() => {
    axios.get("/product/newArrival").then((res) => {
      setAllProduct(res.data);
    });
  }, []);
  console.log(allProduct);
  return (
    <AllDataContext.Provider value={[allProduct, setAllProduct]}>
      {props.children}
    </AllDataContext.Provider>
  );
};
