import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/NavBar';
import '../CSS/CountriesPage.css';

const CountriesPage = ({ countries }) => {
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const navigate = useNavigate();

  const handleCountryClick = (countryId) => {
    setSelectedCountryId(countryId);
  };

  const handleSubmit = () => {
    if (selectedCountryId) {
      navigate(`/countries/${selectedCountryId}/casefiles`);
    } else {
      alert('Please select a country to investigate.');
    }
  };

  return (
    <div className="CountriesPage">
      <main className="main-content">
        <section>
          <h1>Select A Country To Investigate</h1>
          <div className="countries-list">
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
          <button onClick={handleSubmit} className="submit-button">
            Submit
          </button>
        </section>
      </main>
      <Navbar />
    </div>
  );
};

export default CountriesPage;
