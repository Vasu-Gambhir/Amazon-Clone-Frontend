import React, { useState } from "react";
import "./SignUp.css";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Base_URL } from "../../Constants/data";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [logData, setLogData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    cpassword: "",
  });

  console.log("logData", logData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogData(() => {
      return {
        ...logData,
        [name]: value,
      };
    });
  };

  const sendData = async (e) => {
    e.preventDefault();
    const { name, email, mobile, password, cpassword } = logData;

    const res = await fetch(`${Base_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name,
        email,
        mobile,
        password,
        cpassword,
      }),
    });
    const data = await res.json();
    // console.log(data);

    if (res.status === 422 || !data) {
      toast.warning("Invalid Details", {
        position: "top-center",
      });
    } else {
      setLogData({
        ...logData,
        name: "",
        email: "",
        mobile: "",
        password: "",
        cpassword: "",
      });
      toast.success("Account created successfully", {
        position: "top-center",
      });
      navigate("/login");
    }
  };

  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="/blacklogoamazon.png" alt="" />{" "}
        </div>
        <div className="sign_form">
          <form method="POST">
            <h1>Create Account</h1>
            <div className="form_data">
              <label htmlFor="name">Your name</label>
              <input
                type="text"
                name="name"
                value={logData.name}
                id="name"
                onChange={handleChange}
              />
            </div>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                onChange={handleChange}
                value={logData.email}
              />
            </div>
            <div className="form_data">
              <label htmlFor="mobile">Mobile Number</label>
              <input
                type="text"
                name="mobile"
                id="mobile"
                onChange={handleChange}
                value={logData.mobile}
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="At least 6 char"
                id="password"
                onChange={handleChange}
                value={logData.password}
              />
            </div>
            <div className="form_data">
              <label htmlFor="cpassword">Password Again</label>
              <input
                type="password"
                name="cpassword"
                placeholder="Password Again"
                id="cpassword"
                onChange={handleChange}
                value={logData.cpassword}
              />
            </div>
            <button className="signin_btn" onClick={sendData}>
              Continue
            </button>
            <div className="signin_info">
              <p>
                Already have an Account?
                <NavLink to="/Login">Signin</NavLink>
              </p>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </section>
  );
};

export default SignUp;
