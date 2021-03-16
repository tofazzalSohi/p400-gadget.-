import React, { useContext, useState } from "react";
import db, { storage } from "../FirebaseConfig";
import firebase from "firebase";
import { useForm } from "react-hook-form";
import { CircularProgress, Snackbar } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import MuiAlert from "@material-ui/lab/Alert";
import { AllDataContext } from "../MainContext";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CreateProduct = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const [open, setOpen] = React.useState(false);
  const [spin, setSpin] = useState(false);
  const [allProduct, setAllProduct] = useContext(AllDataContext);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const onSubmit = (data) => {
    setSpin(true);
    data.discount = 0;
    data.star = 4;
    data.price = parseFloat(data.price) / 85;
    data.stock = parseFloat(data.stock);
    console.log(data);
    postOrder(data);
  };
  const [image, setImage] = useState(null);
  const [imgErr, setImgErr] = useState(null);
  const [progress, setProgress] = useState(0);
  const handleAdd = (data) => {
    let newArr = [...allProduct];
    console.log(newArr, "newArr");
    data.price = data.price;
    const rev = [...newArr.reverse(), data];
    console.log(rev, "rev");

    setAllProduct(rev.reverse());
  };
  const postOrder = (data) => {
    if (image) {
      const uploadImg = storage.ref(`images/${image.name}`).put(image);
      uploadImg.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        (error) => {
          console.log(error.message);
        },
        () => {
          //complete function
          storage
            .ref("images")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              data.img = url;

              //post to database
              fetch("https://nameless-lake-62164.herokuapp.com/post/product", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                },
              })
                .then((response) => response.text())
                .then((json) => {
                  handleAdd(data);
                  setOpen(true);
                  setSpin(false);
                  setProgress(0);
                  setImage(null);
                  reset({
                    name: "",
                    price: "",
                    category: "",
                    stock: "",
                  });
                });
            });
        }
      );
    } else {
      alert("Something Wrong ! Try Again ");
    }
  };
  const handleFile = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      if (e.target.files[0].size >= 1000000) {
        setImgErr("The File Size Is Too Large");
      } else {
        setImgErr(null);
      }
    }
  };
  return (
    <div className="createProduct">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="name"
          ref={register({ required: true })}
          placeholder="Product Name"
        />
        {errors.name && <span>Product Name is required</span>}
        <input
          name="price"
          type="number"
          ref={register({ required: true, valueAsNumber: true })}
          placeholder="Price In $"
        />
        {errors.price && <span>Price is required</span>}

        <label htmlFor="category" style={{ color: "#21a97e" }}>
          {" "}
          Select Product Category:
        </label>
        <select
          name="category"
          ref={register({ required: true })}
          placeholder="Product Category"
        >
          <option value="android">Android</option>
          <option value="camera">Camera</option>
          <option value="laptop">Laptop</option>
        </select>
        {errors.category && <span>Category is required</span>}
        <input
          type="number"
          name="stock"
          ref={register({ required: true, valueAsNumber: true })}
          placeholder="Product Stock"
        />
        {errors.stock && <span>Stock is required</span>}

        <input
          name="image"
          type="file"
          onChange={handleFile}
          ref={register({ required: true })}
        />
        {errors.image && <span>image is Required</span>}
        {imgErr && <span>{imgErr}</span>}
        <progress value={progress} max="100"></progress>
        {!spin && (
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            disabled={imgErr}
          >
            Submit
          </Button>
        )}
        <div className="spinner">
          {spin && <CircularProgress color="secondary" />}
        </div>
      </form>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Product Added Successfully
        </Alert>
      </Snackbar>
    </div>
  );
};

export default CreateProduct;
