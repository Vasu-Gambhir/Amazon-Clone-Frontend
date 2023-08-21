import React, { useEffect, useState } from "react";

const Subtotal = ({ cartData }) => {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    totalAmount();
  }, [cartData]);

  const totalAmount = () => {
    let sum = 0;
    cartData.map((data) => (sum += data.price.mrp));
    setPrice(sum);
  };

  return (
    <div className="sub_item">
      <h3>
        Subtotal ({cartData.length} items) :{" "}
        <strong style={{ fontWeight: 700, color: "#111" }}>₹{price}</strong>
      </h3>
    </div>
  );
};

export default Subtotal;
