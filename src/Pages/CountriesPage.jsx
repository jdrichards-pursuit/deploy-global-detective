import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/NavBar';
import '../CSS/CountriesPage.css';

const CountriesPage = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://localhost:3003/api/countries');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryClick = (countryId) => {
    setSelectedCountryId(countryId);
  };

  const handleSubmit = () => {
    if (selectedCountryId) {
      navigate(`/countries/${selectedCountryId}`);
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

