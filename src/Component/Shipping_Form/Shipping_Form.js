import React, { useContext } from "react";
import "./Shipping_Form.css";
import LocalShippingOutlinedIcon from "@material-ui/icons/LocalShippingOutlined";
import { useForm } from "react-hook-form";
import { UserContext } from "../Sign_In_Context";
const Shipping_Form = ({ handleStep, setForm }) => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => {
    handleStep(2);
    data.payMethod = "cash";
    setForm(data);
    console.log(data);
  };
  const [user, setUser] = useContext(UserContext);
  return (
    <div className="shipping__address">
      <div>
        <div>
          <LocalShippingOutlinedIcon></LocalShippingOutlinedIcon>
        </div>
        <h2>Shipping Address</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="name"
            value={user.displayName}
            ref={register({ required: true })}
            className={errors.name && "input_error"}
            placeholder="Full Name"
            readonly
          />
          {errors.name && <small>*Full Name is required</small>}
          <input
            name="address"
            className={errors.address && "input_error"}
            ref={register({ required: true })}
            placeholder="Address"
          />
          {errors.address && <small>*Address is required</small>}
          <input
            name="email"
            value={user.email}
            ref={register({ required: true })}
            className={errors.email && "input_error"}
            placeholder="Email"
            readOnly
          />
          {errors.email && <small>*E-mail is required</small>}
          <input
            type="number"
            name="mobile"
            ref={register({ required: true })}
            className={errors.mobile && "input_error"}
            placeholder="Mobile Number"
          />
          {errors.mobile && <small>*Mobile Number is required</small>}
          <input type="submit" value="Next" />
        </form>
      </div>
    </div>
  );
};

export default Shipping_Form;
