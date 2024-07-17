import React from 'react'
import { logout } from '../helpers/logout'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../Components/NavBar'
import EditProfileModal from '../Components/EditProfileModal'
// import { getUserData } from '../helpers/getUserData'
import { Link } from 'react-router-dom'
import '../Pages/AboutPage'
import '../CSS/Profile.css'


const ProfilePage = () => {
  const { userUid } = useParams()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3003/api/profile/${userUid}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const profileData = await response.json();
        setUser(profileData);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userUid]);

  const handleEditProfile = async (updatedUser) => {
    try {
      const response = await fetch(`http://localhost:3003/api/profile/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(updatedUser)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedProfile = await response.json();
      setUser(updatedProfile);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };
  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      navigate('/'); 
    } else {
      console.error('Failed to log out');
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Failed to load profile. Please try again later.</div>;
  }
  
  //XP VARIABLES
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
          <img src={user.photo} alt="Profile" />
        </div>
        <div className="profile-details">
          <h2>{user.first_name} {user.last_name}</h2>
          <p>Email: {user.email}</p>
          <p>DOB: {new Date(user.dob).toLocaleDateString()}</p>
          <p>Current Rank: {user.rank}</p>
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
      <p>You are only 500 points away from earning your next badge!</p>
        <p>{currentXP} / {nextBadgeXP} XP</p>
      </div>
        <Link to='/countries'>
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
      <button
          className="edit-profile-button"
          onClick={() => setIsModalOpen(true)}
        >
          Edit Profile
        </button>
        <button
          className='edit-profile-button'
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={user}
        updateUser={handleEditProfile}
      />
    </div>
  );
};

export default ProfilePage;