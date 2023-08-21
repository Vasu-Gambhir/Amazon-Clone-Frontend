import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { CircularProgress, Divider } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { LoginContext } from "../context/ContextProvider";
import { Base_URL } from "../../Constants/data";

const Cart = () => {
  const { id } = useParams("");
  // console.log(id);
  const navigate = useNavigate();

  const [productData, setProductData] = useState("");
  // console.log(productData);
  const { account, setAccount } = useContext(LoginContext);

  const getProductData = async () => {
    const res = await fetch(`${Base_URL}/getproducts/${id}`, {
      method: "GET",
      header: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    // console.log(data);

    if (res.status !== 201) {
      console.log("no data available");
    } else {
      // console.log("Got product data");
      setProductData(data);
    }
  };

  useEffect(() => {
    setTimeout(getProductData, 1000);
  }, [id]);

  //add to cart function
  const addtocart = async (id) => {
    console.log(id);
    try {
      const checkres = await fetch(`${Base_URL}/addcart/${id}`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productData,
        }),
      });

      const data1 = await checkres.json();
      // console.log(data1, "frontend data");

      if (checkres.status === 401 || !data1) {
        console.log("user invalid");
        toast.warning("User invalid", {
          position: "top-center",
        });
      } else {
        // toast.success("Added To Cart", {
        //   position: "top-center",
        // });
        setAccount(data1);
        navigate("/buynow");
      }
    } catch (error) {
      toast.warning("Please Login first", {
        position: "top-center",
      });
      navigate("/login");
    }
  };

  return (
    <div className="cart_section">
      {productData && Object.keys(productData).length && (
        <div className="cart_container">
          <div className="left_cart">
            <img src={productData.detailUrl} alt="cartImage" />
            <div className="cart_btn">
              <button
                className="cart_btn1"
                onClick={() => addtocart(productData.id)}
              >
                Add to Cart
              </button>
              <button className="cart_btn2">Buy Now</button>
            </div>
          </div>
          <div className="right_cart">
            <h3>{productData.title.shortTitle}</h3>
            <h4>{productData.title.longTitle}</h4>
            <Divider />
            <p className="mrp">M.R.P. : ₹{productData.price.mrp}</p>
            <p>
              Deal of the Day :{" "}
              <span style={{ color: "#B12704" }}>
                ₹{productData.price.cost}.00
              </span>
            </p>
            <p>
              You save :{" "}
              <span style={{ color: "#B12704" }}>
                ₹{productData.price.mrp - productData.price.cost} (
                {productData.price.discount})
              </span>
            </p>
            <div className="discount_box">
              <h5>
                Discount :{" "}
                <span style={{ color: "#111" }}>
                  {productData.price.discount}
                </span>
              </h5>
              <h4>
                Free Delivery{" "}
                <span style={{ color: "#111", fontWeight: "600" }}>
                  Oct 8 - 21
                </span>{" "}
                Details
              </h4>
              <p>
                Fastest delivery :{" "}
                <span style={{ color: "#111", fontWeight: "600" }}>
                  Tomorrow 11AM
                </span>
              </p>
            </div>
            <p className="descrtion">
              About the Item :{" "}
              <span
                style={{
                  color: "#565959",
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.4px",
                }}
              >
                {productData.description}
              </span>
            </p>
          </div>
        </div>
      )}
      <ToastContainer />
      {!productData ? (
        <div className="circle">
          <CircularProgress />
          <h2>Loading...</h2>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
