import React from 'react'
import Navbar from '../Components/NavBar'
import { Link } from 'react-router-dom'
import '../Pages/AboutPage'
import '../CSS/Profile.css'


const ProfilePage = () => {
  const currentXP = 4500;
  const nextBadgeXP = 5000;

  const calculateXP = () => {
    return (currentXP / nextBadgeXP) * 100;
  }
  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-header">
        <div className="profile-picture">
          <img src='https://res.cloudinary.com/dhexjuuzd/image/upload/v1711679509/360_F_219633151_BW6TD8D1EA9OqZu4JgdmeJGg4JBaiAHj_fkphja.jpg' alt="Profile" />
        </div>
        <div className="profile-details">
          <h2>John Doe</h2>
          <p>Email: @yahoo.com</p>
          <p>Date Joined: March 2023</p>
          <p>Current Rank: Rookie Detective</p>
        </div>
      </div>
      <h2 className='badge-title'>Badges</h2>
      <div className="profile-badges">
        <div className="badge">
          <img src="badge-icon.png" alt="Badge" /> Rookie Detective
        </div>
        <div className="badge">
          <img src="badge-icon.png" alt="Badge" /> Intermediate Detective
        </div>
        <div className="badge">
          <img src="badge-icon.png" alt="Badge" /> Senior Detective
        </div>
        <div className="badge">
          <img src="badge-icon.png" alt="Badge" /> Master Sleuth
        </div>
        <h3 className='xp-progress'>XP Progress</h3>
        <div className="xp-progress-bar">
          <div
            className="xp-progress-fill"
            style={{ width: `${calculateXP()}%` }}
            ></div>
        </div>
      <p>You’re only 500 points away from earning your next badge!</p>
        <p>{currentXP} / {nextBadgeXP} XP</p>
      </div>
        <Link to='/countries"'>
        <button className='new-investigation'>Open New Investigation</button>
        </Link>
      <div className="profile-stats">
        <div className="stat">
          <h3>Games Played</h3>
          <p>150</p>
        </div>
        <div className="stat">
          <h3>Questions Correct</h3>
          <p>1350</p>
        </div>
        <div className="stat">
          <h3>Questions Wrong</h3>
          <p>150</p>
        </div>
      </div>
      <div className='button-container'>
      <Link to='/about'>
      <button className='edit-profile-button'>About Us</button>
      </Link>
      <button className="edit-profile-button">Edit Profile</button>
      <button className='edit-profile-button'>Log Out</button>
      </div>
    </div>
  );
};

export default ProfilePage;