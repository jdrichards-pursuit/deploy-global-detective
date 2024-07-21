import React from "react";
import Navbar from "./NavBar";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPortrait } from "@fortawesome/free-solid-svg-icons";
import detectiveImage from "../assets/vecteezy_detective-looking-through-case-board_22129502.svg";

function Home({ translation }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <div className="App">
      <Navbar />
      <main className="main-content">
        <Link to="/login">
          {/* <div className="profile-icon-container">
          <FontAwesomeIcon icon={faPortrait} />
        </div> */}
        </Link>
        <section id="home" className="section">
          <div className="image-container">
            <img
              src={detectiveImage}
              alt="Detective looking through case board"
              className="detective-image"
            />
          </div>
          <div className="border-container">
            <p>{translation.homeMissionStatement}</p>
          </div>
          <div className="login-container" onClick={handleLoginClick}>
            <div className="login-button">
              {translation.homeMissionAwaitsButton}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
