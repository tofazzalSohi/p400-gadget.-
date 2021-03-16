import React, { useContext, useEffect, useState } from "react";
import { Card, Grid, Modal, Snackbar } from "@material-ui/core";

import { AllDataContext } from "../MainContext";
import TableData from "./TableData";
import { AllOrderContext } from "../OrderContext";
import SearchIcon from "@material-ui/icons/Search";
const AdminDashboard = () => {
  const [allProduct, setAllProduct] = useContext(AllDataContext);
  const [allOrder, setAllOrder] = useContext(AllOrderContext);
  const [product, setProduct] = useState(allProduct);
  const [order, setOrder] = useState([]);
  const [input, setInput] = useState("");
  const handleUpdate = (id, price, dis) => {
    const newarr = allProduct.map((x) => {
      if (x._id === id) {
        x.price = price * 85;
        x.discount = dis;
        return x;
      } else {
        return x;
      }
    });
    setAllProduct(newarr);
  };
  const handleDelete = (id) => {
    const newArr = allProduct.filter((x) => x._id !== id);
    setAllProduct(newArr);
  };
  const handleSearch = () => {
    if (input.length !== 0) {
      const newArr = allProduct.filter((x) => {
        let na = x.name.toLowerCase();
        let inp = input.toLowerCase();
        if (na.search(inp) !== -1) {
          return x;
        }
      });
      setProduct(newArr);
    } else {
      setProduct(allProduct);
    }
  };
  return (
    <div className="adminDashboard">
      <Grid container>
        <Grid item xs={12} sm={6}>
          <Card>
            <h2>Total Product</h2>
            <h3>{allProduct?.length}</h3>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card>
            <h2>Total Order</h2>
            <h3>{allOrder.length}</h3>
          </Card>
        </Grid>
      </Grid>
      <div className="wrap">
        <div className="search">
          <input
            type="text"
            className="searchTerm"
            placeholder="Search By Product Name"
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="searchButton" onClick={handleSearch}>
            <SearchIcon></SearchIcon>
          </button>
        </div>
      </div>
      <table>
        <tr>
          <th>Pro. Name</th>
          <th>Image</th>
          <th>Price</th>
          <th>Discount</th>
          <th>Update</th>
          <th>Delete</th>
        </tr>
        {product.map((x) => (
          <TableData data={x} del={handleDelete} upd={handleUpdate}></TableData>
        ))}
      </table>
    </div>
  );
};

export default AdminDashboard;
