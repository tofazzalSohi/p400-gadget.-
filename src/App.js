import React from "react";
import "./App.css";
import HomeWrapper from "./Component/Slick_style";
import { Data_Context } from "./Component/Data_Context";
import { Sign_In_Context } from "./Component/Sign_In_Context";
import { MainContext } from "./Component/MainContext";
import Routing from "./Routing";
import { OrderContext } from "./Component/OrderContext";

function App() {
  return (
    <HomeWrapper>
      <MainContext>
        <OrderContext>
          <Sign_In_Context>
            <Data_Context>
              <Routing></Routing>
            </Data_Context>
          </Sign_In_Context>
        </OrderContext>
      </MainContext>
    </HomeWrapper>
  );
}

export default App;
