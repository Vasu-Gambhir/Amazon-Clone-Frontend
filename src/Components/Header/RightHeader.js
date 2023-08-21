import React, { useContext, useState } from "react";
import "./RightHeader.css";
import Avatar from "@mui/material/Avatar";
import { LoginContext } from "../context/ContextProvider";
import { NavLink } from "react-router-dom";
import { Divider } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const RightHeader = ({ handleClose, logOutUser }) => {
  const { account, setAccount } = useContext(LoginContext);

  return (
    <>
      <div className="rightheader">
        <div className="right_nav">
          {account ? (
            <Avatar className="avtar2">
              {account.userLogin
                ? account.userLogin.name[0].toUpperCase()
                : account.name[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar className="avtar" />
          )}
          {account ? (
            <h3>
              Hello{" "}
              {account.userLogin
                ? account.userLogin.name.toUpperCase()
                : account.name.toUpperCase()}
            </h3>
          ) : (
            ""
          )}
        </div>
        <div className="nav_btn">
          <NavLink to="/" onClick={() => handleClose()}>
            Home
          </NavLink>
          <NavLink to="/" onClick={() => handleClose()}>
            Shop By Category
          </NavLink>
          <Divider
            style={{ width: "100%", marginLeft: "-20px", marginBottom: "5px" }}
          />
          <NavLink to="/" onClick={() => handleClose()}>
            Today's Deal
          </NavLink>
          <NavLink
            to={account ? "/buynow" : "/login"}
            onClick={() => handleClose()}
          >
            Your Orders
          </NavLink>
          <Divider
            style={{ width: "100%", marginLeft: "-20px", marginBottom: "5px" }}
          />
          <div className="flag">
            <NavLink to="/" onClick={() => handleClose()}>
              Settings
            </NavLink>
            <img
              src="/india.png"
              style={{ width: 35, marginLeft: 10, marginBottom: 15 }}
              alt=""
            />
          </div>

          {account ? (
            <NavLink
              to="/"
              onClick={() => {
                handleClose();
                logOutUser();
              }}
            >
              <div className="flag" style={{ marginTop: -20 }}>
                <LogoutIcon style={{ fontSize: 18, marginRight: 4 }} />
                <h3 style={{ cursor: "pointer", fontWeight: 500 }}>Logout</h3>
              </div>
            </NavLink>
          ) : (
            <NavLink to="/login" onClick={() => handleClose()}>
              SignIn
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default RightHeader;
