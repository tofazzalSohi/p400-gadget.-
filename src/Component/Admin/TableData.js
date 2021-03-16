import { Button, CircularProgress } from "@material-ui/core";
import React, { useState } from "react";
import { Card, Grid, Modal, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MuiAlert from "@material-ui/lab/Alert";
import gadget_logo from "../../Image/gadget_logo.png";
import { useForm } from "react-hook-form";
const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: "40px 0px 5px 0px",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const TableData = ({ data, del, upd }) => {
  const handleDel = () => {
    setSpin(true);
    fetch(`https://nameless-lake-62164.herokuapp.com/delete/${data._id}`, {
      method: "DELETE",
    })
      .then((response) => response.text())
      .then((json) => {
        setOpen2(false);
        setSpin(false);
        setSnack("Product Deleted ");
        del(data._id);
      });
  };
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = useState(false);
  const [snack, setSnack] = useState(false);
  const [spin, setSpin] = useState(false);
  const onSubmit = (dat) => {
    setSpin(true);
    dat.price = parseFloat(dat.price) / 85;
    dat.discount = parseFloat(dat.discount);
    console.log(data);
    fetch(
      `https://nameless-lake-62164.herokuapp.com/update/product/${data._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(dat),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.text())
      .then((json) => {
        setSpin(false);
        setOpen(false);
        setSnack("Updated Successfully");
        upd(data._id, dat.price / 85, dat.discount);
      });
  };
  const { register, handleSubmit, watch, errors } = useForm();

  const handleOpen = (i) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
  };
  const handleSnack = (msg) => {
    setSnack(msg);
  };
  const handleSnackClose = () => {
    setSnack(false);
  };
  const classes = useStyles();
  return (
    <>
      <tr>
        <td>{data.name}</td>
        <td>
          <img src={data.img} alt="" />
        </td>
        <td>Tk.{Math.round(data.price * 85)}</td>
        <td>{data.discount} %</td>
        <td>
          <Button color="primary" variant="contained" onClick={handleOpen}>
            Update
          </Button>
        </td>
        <td>
          <Button
            color="secondary"
            variant="contained"
            onClick={() => setOpen2(true)}
          >
            Delete
          </Button>
        </td>
      </tr>
      <Modal className={classes.modal} open={open} onClose={handleClose}>
        <div className="modal">
          <div>
            <h2>{data.name}</h2>
            <img src={data.img} alt="" />
            <form onSubmit={handleSubmit(onSubmit)}>
              <label htmlFor="price">Price:</label>
              <input
                name="price"
                type="number"
                defaultValue={Math.round(data.price * 85)}
                ref={register({ min: 1 })}
              />
              <label htmlFor="discount">Discount In %</label>
              <input
                name="discount"
                type="number"
                defaultValue={data.discount}
                ref={register({ max: 99 })}
              />
              {!spin && (
                <Button type="submit" color="primary" variant="contained">
                  Update
                </Button>
              )}
              <div className="spinner_load">
                {spin && <CircularProgress color="secondary" />}
              </div>
            </form>
          </div>
        </div>
      </Modal>
      <Modal className={classes.modal} open={open2} onClose={handleClose}>
        <div className="modal">
          <div>
            <h2>{data.name}</h2>
            <img src={data.img} alt="" />
            <h3 style={{ color: "red" }}>
              {" "}
              Are You Sure Want To Delete This Product
            </h3>
            {!spin && (
              <div>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={handleDel}
                >
                  Yes
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleClose}
                >
                  No
                </Button>
              </div>
            )}
            <div className="spinner_load">
              {spin && <CircularProgress color="secondary" />}
            </div>
          </div>
        </div>
      </Modal>
      <Snackbar open={snack} autoHideDuration={4000} onClose={handleSnackClose}>
        <Alert severity="success" onClose={handleSnackClose}>
          {snack}
        </Alert>
      </Snackbar>
    </>
  );
};

export default TableData;
