import React, { useContext, useEffect, useState } from "react";
import "./navbar.css";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/ContextProvider";
import { IconButton, getTextFieldUtilityClass } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LogoutIcon from "@mui/icons-material/Logout";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

//components
import RightHeader from "./RightHeader";
import { Base_URL } from "../../Constants/data";

const Navbar = () => {
  const { account, setAccount } = useContext(LoginContext);
  const [text, setText] = useState("");
  const [listOpen, setListOpen] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  // console.log("ACCOUNT from navbar", account);
  // console.log("bhaiiii", account.carts);
  console.log(text);
  const navigate = useNavigate();

  const { products } = useSelector((state) => state.getproductsdata);
  const handleOpen = () => {
    setDrawerOpen(true);
  };

  const handleClose = () => {
    setDrawerOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleclose = () => {
    setAnchorEl(null);
  };

  const getDetailValidUser = async () => {
    const res = await fetch(`${Base_URL}/validuser`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data = await res.json();
    console.log(data);
    if (res.status !== 201) {
      console.log("error");
    } else {
      console.log("data valid");
      setAccount(data);
    }
  };

  const logOutUser = async () => {
    const res2 = await fetch(`${Base_URL}/logout`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    const data2 = await res2.json();
    console.log(data2);
    if (res2.status !== 201) {
      console.log("error");
    } else {
      console.log("data valid log");
      toast.success("User Logged Out", {
        position: "top-center",
      });
      setAccount(false);
      navigate("/");
    }
  };

  const getText = (items) => {
    setText(items);
    setListOpen(false);
  };

  useEffect(() => {
    getDetailValidUser();
  }, []);

  return (
    <header>
      <nav>
        <div className="left">
          <IconButton className="hamburger" onClick={handleOpen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>
          <Drawer open={drawerOpen} onClose={handleClose}>
            <RightHeader handleClose={handleClose} logOutUser={logOutUser} />
          </Drawer>
          <div className="navlogo">
            <NavLink to="/">
              <img src="/amazon_PNG25.png" alt="" />
            </NavLink>
          </div>
          <div className="nav_searchbaar">
            <input
              type="text"
              name=""
              id=""
              value={text}
              placeholder="Search Your Products"
              onChange={(e) => getText(e.target.value)}
            />
            <div className="search_icon" id="search">
              <SearchIcon />
            </div>

            {/*Search Filter */}
            {text && (
              <List className="extrasearch" hidden={listOpen}>
                {products
                  .filter((product) =>
                    product.title.longTitle
                      .toLowerCase()
                      .includes(text.toLowerCase())
                  )
                  .map((item) => (
                    <ListItem
                      onClick={() => {
                        setText("");
                        setListOpen(true);
                      }}
                    >
                      <NavLink to={`/getproducts/${item.id}`}>
                        {item.title.longTitle}
                      </NavLink>
                    </ListItem>
                  ))}
              </List>
            )}
          </div>
        </div>
        <div className="right">
          <div className="nav_btn">
            {account ? (
              <NavLink to="/">
                Welcome{" "}
                {account.userLogin ? account.userLogin.name : account.name}
              </NavLink>
            ) : (
              <NavLink to="/login">SignIn</NavLink>
            )}
          </div>

          {account ? (
            <div className="cart_btn">
              <NavLink to="/buynow">
                <Badge
                  badgeContent={
                    account.userLogin
                      ? account.userLogin.carts.length
                      : account.carts.length
                  }
                  color="primary"
                >
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
              <p>Cart</p>
            </div>
          ) : (
            <div className="cart_btn">
              <NavLink to="/login">
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id="icon" />
                </Badge>
              </NavLink>
              <p>Cart</p>
            </div>
          )}

          {account ? (
            <Avatar
              className="avtar2"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              {account.userLogin
                ? account.userLogin.name[0].toUpperCase()
                : account.name[0].toUpperCase()}
            </Avatar>
          ) : (
            <Avatar
              className="avtar"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            />
          )}
          <div>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleclose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>My account</MenuItem>
              {account ? (
                <MenuItem
                  onClick={() => {
                    handleClose();
                    logOutUser();
                  }}
                >
                  <LogoutIcon style={{ fontSize: 16, marginRight: 3 }} />
                  Logout
                </MenuItem>
              ) : (
                ""
              )}
            </Menu>
          </div>
        </div>
      </nav>
      <ToastContainer />
    </header>
  );
};

export default Navbar;
