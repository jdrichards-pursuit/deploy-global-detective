import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { faHome, faTrophy, faMap, faShieldAlt, faPortrait } from '@fortawesome/free-solid-svg-icons';
import '../App.css'; 

const Navbar = () => {
  return (
    <header className="navbar">
      <ul className="nav-links">
        <li>
          <Link to="/">
            <FontAwesomeIcon className='fa-2x' icon={faHome} />
          </Link>
        </li>
        <li>
          <Link to ="/leaderboard">
            <FontAwesomeIcon className='fa-2x' icon={faTrophy} />
          </Link>
        </li>
        <li>
          <Link to ="/countries">
            <FontAwesomeIcon className='fa-2x' icon={faMap} />
          </Link>
        </li>
        <li>
          <Link to ="/achievements">
            <FontAwesomeIcon className='fa-2x' icon={faShieldAlt} />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;