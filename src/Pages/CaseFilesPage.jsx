import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../Components/NavBar';
import '../CSS/CaseFiles.css';

const CaseFilesPage = () => {
  // Extract countryId from URL parameters
  const { countryId } = useParams();
  // State to hold the name of the country
  const [countryName, setCountryName] = useState('');
  // State to hold the list of case files
  const [caseFiles, setCaseFiles] = useState([]);
  // State to handle any errors during fetch
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch country data and case files
    const fetchCountryData = async () => {
      try {
        // Fetch list of countries
        const countriesResponse = await fetch('http://localhost:3003/api/countries');
        if (!countriesResponse.ok) {
          throw new Error('Failed to fetch countries data');
        }
        const countriesData = await countriesResponse.json();

        // Find the specific country by countryId
        const country = countriesData.find(country => country.id.toString() === countryId);
        if (country) {
          setCountryName(country.name);
        } else {
          throw new Error('Country not found');
        }

        // Fetch case files for the specific country
        const caseFilesResponse = await fetch(`http://localhost:3003/api/case_files/${countryId}`);
        if (!caseFilesResponse.ok) {
          throw new Error('Failed to fetch case files');
        }
        const caseFilesData = await caseFilesResponse.json();
        setCaseFiles(caseFilesData);
      } catch (error) {
        setError(error.message);
      }
    };

    // Call the fetch function
    fetchCountryData();
  }, [countryId]);

  // Display error message if there's an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Image URL for the case file items
  const imageUrl = 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1720022191/images_8_nwnyck.jpg';

  return (
    <div className="CaseFilesPage">
      {/* Display the title with the country name */}
      <h1>Case Files: {countryName}</h1>
      <div className="case-files-list">
        {/* Map over the case files and create a Link for each case file */}
        {caseFiles.map((caseFile, index) => (
          <Link key={caseFile.id} to={`/countries/${countryId}/case_files/${caseFile.id}`} className="case-file-item">
            <div className="case-file-content">
              {/* Display the case label and image */}
              <p className="case-label">Case {index + 1}</p>
              <img src={imageUrl} alt={`Image for ${caseFile.article_title}`} />
              {/* Display the title of the case file */}
              <h2>{caseFile.article_title}</h2>
            </div>
          </Link>
        ))}
      </div>
      {/* Render the Navbar component */}
      <Navbar />
    </div>
  );
};

export default CaseFilesPage;



