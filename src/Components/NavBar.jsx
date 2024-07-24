import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { Navbar, Container, Nav, Button } from "react-bootstrap";
import globalAgent from "../assets/globalAgentTransparent.png";
import {
  faHome,
  faTrophy,
  faMap,
  faPortrait,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/NavBar.css";

const Header = ({ user }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className="navbar-container">
        <Link to={"/"} className="home-link">
          <img className="logo" src={globalAgent} alt="Global Agent Logo" />
        </Link>
        <section className="section1">
          <Link to="/leaderboard">
            <span>Leaderboard</span>
          </Link>
          <Link to={"/about"}>
            <span>About Us</span>
          </Link>
          <div>
            <Link to={"/login"}>Login</Link>
          </div>
          {/* <Link to={"/profile"}>
              <span>Profile</span>
            </Link> */}
        </section>
        <section className="hamburger">
          <FontAwesomeIcon
            icon={faBars}
            size="2xl"
            inverse
            onClick={toggleSidebar}
          />
        </section>
      </div>
      {/* <header className="navbar">
        <ul className="nav-links">
          <div className="logo-container">
            <li>
              <NavLink exact to="/" activeClassName="active">
                <img
                  className="logo"
                  src={globalAgent}
                  alt="Global Agent Logo"
                />
              </NavLink>
            </li>
          </div>
          <div className="links">
            <li>
              <NavLink to="/leaderboard" activeClassName="active">
                Leaderboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/countries" activeClassName="active">
                Map
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" activeClassName="active">
                Profile
              </NavLink>
            </li>
          </div>
        </ul>
      </header> */}
      <div
        ref={sidebarRef}
        className={`offcanvas offcanvas-end${isSidebarOpen ? " show" : ""}`}
        tabIndex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
        style={{ width: "250px" }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
            Menu
          </h5>
          <Button
            type="button"
            className="btn-close"
            onClick={toggleSidebar}
            aria-label="Close"
          ></Button>
        </div>
        <div className="offcanvas-body">
          <ul
            className="navbar-nav justify-content-end flex-grow-1 pe-3"
            style={{ alignItems: "center" }}
          >
            <li
              className="nav-item"
              style={{ fontSize: "20px", margin: "20px 0" }}
            >
              <Link to="/" className="nav-link" onClick={toggleSidebar}>
                Home
              </Link>
            </li>
            <li
              className="nav-item"
              style={{ fontSize: "20px", margin: "20px 0" }}
            >
              <Link
                to="/leaderboard"
                className="nav-link"
                onClick={toggleSidebar}
              >
                Leaderboard
              </Link>
            </li>
            <li
              className="nav-item"
              style={{ fontSize: "20px", margin: "20px 0" }}
            >
              <Link to="/about" className="nav-link" onClick={toggleSidebar}>
                About Us
              </Link>
            </li>
            <li
              className="nav-item"
              style={{ fontSize: "20px", margin: "20px 0" }}
            >
              <Link to="/login" className="nav-link" onClick={toggleSidebar}>
                Login
              </Link>
            </li>
            <li
              className="nav-item"
              style={{ fontSize: "20px", margin: "20px 0" }}
            >
              <Link to="/profile" className="nav-link" onClick={toggleSidebar}>
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
