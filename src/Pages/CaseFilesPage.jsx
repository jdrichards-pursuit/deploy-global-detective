import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../Components/NavBar';
import '../CSS/CaseFiles.css';

const CaseFilesPage = () => {
  const { countryId } = useParams();
  const [countryName, setCountryName] = useState('');
  const [caseFiles, setCaseFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        const caseFilesResponse = await fetch(`http://localhost:3003/api/countries/${countryId}/case_files`);
        if (!caseFilesResponse.ok) {
          throw new Error('Failed to fetch case files');
        }
        const caseFilesData = await caseFilesResponse.json();
        setCaseFiles(caseFilesData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCountryData();
  }, [countryId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  const imageUrl = 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1720022191/images_8_nwnyck.jpg';

  return (
    <div className="CaseFilesPage">
      <h1>Case Files: {countryName}</h1>
      <div className="case-files-list">
        {caseFiles.map((caseFile, index) => (
          <Link key={caseFile.id} to={`/countries/${countryId}/case_files/${caseFile.id}`} className="case-file-item">
            <div className="case-file-content">
              <p className="case-label">Case {index + 1}</p>
              <img src={imageUrl} alt={`Image for ${caseFile.article_title}`} />
              <h2>{caseFile.article_title}</h2>
            </div>
          </Link>
        ))}
      </div>
      <Navbar />
    </div>
  );
};

export default CaseFilesPage;



