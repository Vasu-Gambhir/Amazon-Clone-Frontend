import React, { useContext, useState } from "react";
import "./SignUp.css";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoginContext } from "../context/ContextProvider";
import { Base_URL } from "../../Constants/data";
import axios from "axios";

const SignIn = () => {
  const [logData, setLogData] = useState({
    email: "",
    password: "",
  });
  // console.log(logData);

  const { account, setAccount } = useContext(LoginContext);
  console.log("account from signin", account);

  const navigate = useNavigate();

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

    const { email, password } = logData;
    try {
      const res = await axios.post(
        `${Base_URL}/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Content-Type": "application/json",
          },
          withCredentials: true, // Cookie credentials (tokens)
        }
      );
      console.log(res);
      const { data } = res;
      console.log("data ", data);

      setAccount(data);
      setLogData({
        ...logData,
        email: "",
        password: "",
      });
      toast.success("Logged In successfully", {
        position: "top-center",
      });
      navigate("/");
    } catch (error) {
      if (error.response.status === 400) {
        toast.warning("Invalid Details", {
          position: "top-center",
        });
        setLogData({
          ...logData,
          email: "",
          password: "",
        });
      }
      console.log(error);
    }

    // const res = await fetch(`http://localhost:8005/login`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },

    //   body: JSON.stringify({
    //     email,
    //     password,
    //   }),
    // });

    // const data = await res.json();
    // console.log("data", data);

    // if (res.status === 400 || !data) {
    //   toast.warning("Invalid Details", {
    //     position: "top-center",
    //   });
    // } else {
    //   setAccount(data);
    //   setLogData({
    //     ...logData,
    //     email: "",
    //     password: "",
    //   });
    //   toast.success("Logged In successfully", {
    //     position: "top-center",
    //   });
    //   navigate("/");
    // }
  };

  return (
    <section>
      <div className="sign_container">
        <div className="sign_header">
          <img src="/blacklogoamazon.png" alt="" />{" "}
        </div>
        <div className="sign_form">
          <form method="POST">
            <h1>Sign-In</h1>
            <div className="form_data">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                value={logData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form_data">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                placeholder="At least 6 char"
                id="password"
                value={logData.password}
                onChange={handleChange}
              />
            </div>
            <button className="signin_btn" onClick={sendData}>
              Continue
            </button>
          </form>
        </div>
        <div className="create_accountinfo">
          <p>New to Amazon</p>

          <button>
            <NavLink to="/register">Create Your Amazon Account</NavLink>
          </button>
        </div>
        <ToastContainer />
      </div>
    </section>
  );
};

export default SignIn;
