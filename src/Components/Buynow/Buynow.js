import React, { useEffect, useState } from "react";
import "./Buynow.css";
import { Divider } from "@mui/material";

//components
import Option from "./Option";
import Subtotal from "./Subtotal";
import Right from "./Right";
import { Base_URL } from "../../Constants/data";

const Buynow = () => {
  const [cartData, setCartData] = useState("");
  // console.log(cartData.carts);

  const getdatabuy = async () => {
    const res = await fetch(`${Base_URL}/cartdetails`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log(data, "from buynow");

    if (res.status !== 201) {
      console.log("error");
    } else {
      setCartData(data.carts);
    }
  };

  useEffect(() => {
    getdatabuy();
  }, []);

  return (
    <>
      {cartData.length ? (
        <div className="buynow_section">
          <div className="buynow_container">
            <div className="left_buy">
              <h1>Shopping Cart</h1>
              <p>Select all items</p>
              <span className="leftbuyprice">Price</span>
              <Divider />
              {cartData.map((dataCart, key) => (
                <>
                  <div className="item_containert">
                    <div className="image_container">
                      <img src={dataCart.url} alt="Item" />
                    </div>
                    <div className="item_details">
                      <h3>{dataCart.title.longTitle}</h3>
                      <h3>{dataCart.title.shortTitle}</h3>
                      <h3 className="diffrentprice">₹{dataCart.price.mrp}</h3>
                      <p className="unusuall">Usually dispatched in 8 days</p>
                      <p>Eligible for FREE Shipping</p>
                      <img
                        src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x._CB485942108_.png"
                        alt="amazon"
                      />
                      <Option
                        deleteData={dataCart.id}
                        getdatabuy={getdatabuy}
                      />
                    </div>
                    <h3 className="item_price">₹{dataCart.price.mrp}</h3>
                  </div>
                  <Divider />
                </>
              ))}
              <Subtotal cartData={cartData} />
            </div>
            <Right cartData={cartData} />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
};

export default Buynow;
