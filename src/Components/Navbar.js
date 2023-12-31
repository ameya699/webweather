import React from "react";
import "../Styles/Navbar.css";
import gitlogo from "../Images/gitlogo.png";
import linkedInlogo from "../Images/linkdein.png";
import twitterlogo from "../Images/twitter.png"
const Navbar = () => {
  return (
    <div className="navbar">
      <h1>Web Weather</h1>
      <div style={{ display: "flex", columnGap: "1rem"  }}>
      <a href="https://twitter.com/AmeyaAwatade" target="_blank" style={{ alignSelf: "center" }}>
          <img src={twitterlogo} style={{ height: "42px",width:"42px"}} />
        </a>
        <a
          href="https://www.linkedin.com/in/ameyaawatade/"
          target="_blank"
          style={{ alignSelf: "center" }}
        >
          <img
            src={linkedInlogo}
            style={{
              height: "40px",
              width: "40px",
              backgroundBlendMode:"luminosity",
            }}
          />
        </a>
        <a href="https://github.com/ameya699/webweather" target="_blank">
          <img src={gitlogo} style={{ height: "50px" }} />
        </a>
        
      </div>
    </div>
  );
};

export default Navbar;
