import "./App.css";
import { Route, Routes } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

//components
import Navbar from "./Components/Header/Navbar";
import Newnav from "./Components/Newnavbar/Newnav";
import Maincomponent from "./Components/Home/Maincomponent/Maincomponent";
import Footer from "./Components/Footer/Footer";
import SignIn from "./Components/Signup_Signin/SignIn";
import SignUp from "./Components/Signup_Signin/SignUp";
import Cart from "./Components/Cart/Cart";
import Buynow from "./Components/Buynow/Buynow";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setData(true);
    }, 2000);
  });

  return (
    <>
      {data ? (
        <>
          <Navbar />
          <Newnav />
          <Routes>
            <Route path="/" element={<Maincomponent />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/getproducts/:id" element={<Cart />} />
            <Route path="/buynow" element={<Buynow />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <div className="circle">
          <CircularProgress />
          <h2>Loading...</h2>
        </div>
      )}
    </>
  );
}

export default App;
