import React, { useEffect, useState } from "react";

const Right = ({ cartData }) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    let sum = 0;
    cartData.map((data) => (sum += data.price.mrp));
    setPrice(sum);
  }, [cartData]);

  return (
    <div className="right_buy">
      <img
        src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop._CB443006202_.png"
        alt="rightimg"
      />
      <div className="cost_right">
        <p>Your order is eligible for FREE Delivery</p>
        <br />
        <span style={{ color: "#565959" }}>
          Select this option at checkout. Details
        </span>
        <h3>
          Subtotal ({cartData.lenth} items) :{" "}
          <span style={{ fontWeight: 700 }}>₹{price}</span>
        </h3>
        <button className="rightbuy_btn">Proceed to Buy</button>
        <div className="emi">EMI Available</div>
      </div>
    </div>
  );
};

export default Right;
