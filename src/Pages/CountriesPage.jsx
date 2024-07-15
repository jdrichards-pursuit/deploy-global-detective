import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/NavBar';
import HelpPage from './HelpPage';
import '../CSS/CountriesPage.css';

const CountriesPage = ({ countries }) => {
  // State to keep track of the selected country ID
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to handle click event on a country
  const handleCountryClick = (countryId) => {
    setSelectedCountryId(countryId);
  };

  // Function to handle submit button click
  const handleSubmit = () => {
    if (selectedCountryId) {
      navigate(`/countries/${selectedCountryId}/casefiles`); // Navigate to the selected country's case files page
    } else {
      alert('Please select a country to investigate.'); // Alert if no country is selected
    }
  };
  const handleHowToPlayClick = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="CountriesPage">
      <main className="main-content">
        <section>
          <h1>Select A Country To Investigate</h1>
          <div className="countries-list">
            {/* Map through countries array and display each country */}
            {countries.map((country, index) => (
              <div
                key={index}
                onClick={() => handleCountryClick(country.id)}
                className={`country-container ${selectedCountryId === country.id ? 'selected' : ''}`}
              >
                <div>
                  <h2>{country.name}</h2>
                </div>
                <img src={country.flag} alt={`${country.name} flag`} className="flag-image" />
              </div>
            ))}
          </div>
          
          {/* Submit button to navigate to the selected country's case files */}
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
          <div className="login-container" onClick={handleHowToPlayClick}>
            <div className="login-button">How to Play</div>
          </div>
        </section>
      </main>
      < HelpPage isOpen={isModalOpen} onClose={handleCloseModal}/>
      <Navbar />
    </div>
  );
};

export default CountriesPage;

