import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink, useNavigate } from 'react-router-dom';
import { faHome, faTrophy, faMap, faPortrait} from '@fortawesome/free-solid-svg-icons';
import '../App.css';

const Navbar = () => {
  return (
    <header className="navbar">
      <ul className="nav-links">
        <li>
          <NavLink exact to="/" activeClassName="active">
            <FontAwesomeIcon className='fa-2x' icon={faHome} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard" activeClassName="active">
            <FontAwesomeIcon className='fa-2x' icon={faTrophy} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/countries" activeClassName="active">
            <FontAwesomeIcon className='fa-2x' icon={faMap} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" activeClassName="active">
            <FontAwesomeIcon className='fa-2x' icon={faPortrait} />
          </NavLink>
        </li>
      </ul>
    </header>
  );
};

export default Navbar;
