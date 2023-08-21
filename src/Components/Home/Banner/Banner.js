import React from "react";
import "./Banner.css";
import Carousel from "react-material-ui-carousel";
import { bannerData } from "../../../Constants/data";

const Banner = () => {
  return (
    <Carousel
      className="carasousel"
      autoPlay={true}
      stopAutoPlayOnHover={true}
      interval={3000}
      animation="slide"
      duration={1000}
      indicators={false}
      navButtonsAlwaysVisible={true}
      cycleNavigation={true}
      navButtonsProps={{
        style: {
          backgroundColor: "#fff",
          color: "#494949",
          borderRadius: "0px",
          marginTop: "-22px",
          height: "104px",
        },
      }}
    >
      {bannerData.map((data, i) => (
        <img src={data.url} alt="BannerImage" className="banner_img" />
      ))}
    </Carousel>
  );
};

export default Banner;
