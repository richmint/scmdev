import React from 'react';

import "./fronthome.scss";
import { Link } from "react-router-dom";

const FrontHome = () => {
  return (
    <>
      <header className="navbar">
        <div className="container">
          <div className="frontlogo">
            <a href=''>
              <img className="logo-img logo-img-main" src="../images/logo.png" alt="FlameOnePage Logo"></img>
            </a>
          </div>
          <Link to="/userlogin" className="loginbtn" style={{ textDecoration: "none" }}> Login</Link>

        </div>
      </header>
      <img className="imgbg" src="../images/1920x1080/01.jpg" alt="Slider Image"></img>
      <div className="container">
        <div className="scmcnt">
          <h1 className="scmtitle">Supply Chain Management</h1>
          <p className="scmparagraph">Lorem ipsum dolor amet consectetur adipiscing dolore magna aliqua <br /> enim minim
            estudiat veniam siad venumus dolore</p>
        </div>
      </div>
      <div className="container">
        <div className="whyus">
          <div className="whyus_cnt">
            <h2>Why Us?</h2>
            <p className="text">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
          <div className="whyus_img">
            <img src="../images/02.jpg" alt="someimage"></img>
          </div>
        </div>
      </div>
      <fieldset>
        <legend>(A RICHMINT GROUP COMPANY)</legend>
      </fieldset>
      <footer>
        <div className="container">
          <div className="aboutus">
            <div className="location">
              <h4>Development Centre</h4>
              <p>
                Aashirvaad 1st Floor, Gayathri Colony-B
                Near Airport Over Bridge, Tonk road,
                jaipur-302011, Rajasthan, INDIA.
              </p>
            </div>
            <div className="location">
              <h4 id="office">Corporate office</h4>
              <p>
                7D 2-48/5/6, Vaishnavi Cynosure,
                Telecom Nagar Extension, Gachibowli, Hyderabad-500032,
                Telangana, INDIA
              </p>
            </div>
            <div className="location">
              <h4>Head office</h4>
              <p>
                205a, Technocity, Plot X-4/1 & 4/2
                TTC Industril Area, Mahape,
                Navi Mumbai,MH-400710, INDIA.
              </p>
            </div>
          </div>
        </div>
      </footer>
      <div className="container">
        <div className="last_div">
          <h4>Reach us at:- reach@stridetele.com OR www.stridetele.com</h4>
        </div>
      </div>
    </>

  );
};

export default FrontHome;
