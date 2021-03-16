import React, { useState, useEffect } from "react";
import "./TopSelling.css";
import firebase from "firebase";
import db from "../FirebaseConfig";
import { Grid, Card, Button } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Products from "../Products/Products";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import samsung_mobile from "../../Image/samsung_mobile.png";
import iphone_mobile from "../../Image/iphone_mobile.png";
import huawei_mobile from "../../Image/huawei_mobile.png";
import hp_laptop from "../../Image/hp_laptop.png";
import dell_laptop from "../../Image/dell_laptop.png";
import msi_laptop from "../../Image/msi_laptop.png";
import nikon_camera from "../../Image/nikon_camera.png";
import canon_camera from "../../Image/canon_camera.png";
import sony_camera from "../../Image/sony_camera.png";
import AppleIcon from "@material-ui/icons/Apple";
import { useHistory } from "react-router-dom";
const TopSelling = () => {
  let history = useHistory();
  const [active, setActive] = useState({
    mobile: true,
    laptop: false,
    camera: false,
  });
  const handleActive = (cat) => {
    if (cat == "mobile") {
      setActive({
        mobile: true,
        laptop: false,
        camera: false,
      });
    } else if (cat == "laptop") {
      setActive({
        mobile: false,
        laptop: true,
        camera: false,
      });
    } else {
      setActive({
        mobile: false,
        laptop: false,
        camera: true,
      });
    }
  };

  return (
    <div className="topSelling">
      <div className="topSelling__top">
        <h2>TOP BRANDS</h2>
        <div className="topSelling_catagories">
          <button
            onClick={() => handleActive("mobile")}
            className={active.mobile && "active_btn"}
          >
            Mobile
          </button>
          <button
            onClick={() => handleActive("laptop")}
            className={active.laptop && "active_btn"}
          >
            Laptop
          </button>
          <button
            onClick={() => handleActive("camera")}
            className={active.camera ? "active_btn diff" : "diff"}
          >
            Camera
          </button>
        </div>
        {/* mobile */}
        {active.mobile && (
          <div className="topBrand">
            <div>
              <img src={samsung_mobile} alt="" />
              <div className="topBrand__caption">
                <h2>Samsung Galaxy</h2>
                <small>Lorem ipsum dolor sit amet </small>
                <button
                  className="shopNow__btn"
                  onClick={() => history.push("/product/android")}
                >
                  Shop now
                </button>
              </div>
            </div>
            <div>
              <div>
                <img src={iphone_mobile} alt="" />
                <div className="topBrand__caption">
                  <h4>
                    Apple Iphone <AppleIcon></AppleIcon>{" "}
                  </h4>
                  <small>Lorem ipsum dolor sit amet </small>
                  <button
                    className="shopNow__btn"
                    onClick={() => history.push("/product/android")}
                  >
                    Shop now
                  </button>
                </div>
              </div>
              <div>
                <img src={huawei_mobile} alt="" />
                <div className="topBrand__caption">
                  <h4>Huawei max pro</h4>
                  <small>Lorem ipsum dolor sit amet </small>
                  <button
                    className="shopNow__btn"
                    onClick={() => history.push("/product/android")}
                  >
                    Shop now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* laptop */}
        {active.laptop && (
          <div className="topBrand">
            <div>
              <img src={hp_laptop} alt="" />
              <div className="topBrand__caption">
                <h2>HP OMEN X</h2>
                <small>Lorem ipsum dolor sit amet </small>
                <button
                  className="shopNow__btn"
                  onClick={() => history.push("/product/laptop")}
                >
                  Shop now
                </button>
              </div>
            </div>
            <div>
              <div>
                <img src={dell_laptop} alt="" />
                <div className="topBrand__caption">
                  <h4>Dell New XPS 15 Laptop</h4>
                  <small>Lorem ipsum dolor sit amet </small>
                  <button
                    className="shopNow__btn"
                    onClick={() => history.push("/product/laptop")}
                  >
                    Shop now
                  </button>
                </div>
              </div>
              <div>
                <img src={msi_laptop} alt="" />
                <div className="topBrand__caption">
                  <h4>MSI Evolve GF63</h4>
                  <small>Lorem ipsum dolor sit amet </small>
                  <button
                    className="shopNow__btn"
                    onClick={() => history.push("/product/laptop")}
                  >
                    Shop now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* camera */}
        {active.camera && (
          <div className="topBrand">
            <div>
              <img src={nikon_camera} alt="" />
              <div className="topBrand__caption">
                <h2>Nikon D850 36.3MP</h2>
                <small>Lorem ipsum dolor sit amet </small>
                <button
                  className="shopNow__btn"
                  onClick={() => history.push("/product/camera")}
                >
                  Shop now
                </button>
              </div>
            </div>
            <div>
              <div>
                <img src={canon_camera} alt="" />
                <div className="topBrand__caption">
                  <h4>Canon EOS Rebel SL3</h4>
                  <small>Lorem ipsum dolor sit amet </small>
                  <button
                    className="shopNow__btn"
                    onClick={() => history.push("/product/camera")}
                  >
                    Shop now
                  </button>
                </div>
              </div>
              <div>
                <img src={sony_camera} alt="" />
                <div className="topBrand__caption">
                  <h4>Sony A7R Mark IV</h4>
                  <small>Lorem ipsum dolor sit amet </small>
                  <button
                    className="shopNow__btn"
                    onClick={() => history.push("/product/camera")}
                  >
                    Shop now
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopSelling;
