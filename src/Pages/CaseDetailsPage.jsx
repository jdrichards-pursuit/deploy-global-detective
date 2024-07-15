import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../Components/NavBar';
import '../CSS/CaseDetails.css';

const CaseDetailsPage = () => {
  // Extract countryId and caseFileId from URL parameters
  const { countryId, caseFileId } = useParams();
  // State to hold the case file data
  const [caseFile, setCaseFile] = useState(null);
  // State to handle any errors during fetch
  const [error, setError] = useState(null);
  // State to toggle between full case file and summary view
  const [showFullCase, setShowFullCase] = useState(false);

  // Define a summary for the case file
  const summary = 'The war in eastern Ukraine has gotten worse recently. Fighting between Ukrainian soldiers and pro-Russian rebels has led to deaths on both sides. This conflict is making it harder for the United States to become friendlier with Russia. The U.S. helps train Ukrainian soldiers, who are fighting against rebels supported by Russia. Both sides are trying to control areas between their front lines. The fighting has caused problems for people living in the area, like power and water outages. Its also very cold, making things even harder for residents. The U.S. wants to have better relations with Russia, but this might make Ukraine worry that they wont get as much help against Russia in the future.';

  useEffect(() => {
    // Function to fetch case file data from the API
    const fetchCaseFileData = async () => {
      try {
        // Fetch case file data using the countryId
        const response = await fetch(`http://localhost:3003/api/case_files/${countryId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch case files');
        }
        const data = await response.json();
        // Find the specific case file using caseFileId
        const caseFileData = data.find(file => file.id.toString() === caseFileId);
        if (caseFileData) {
          setCaseFile(caseFileData);
        } else {
          throw new Error('Case file not found');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    // Call the fetch function
    fetchCaseFileData();
  }, [countryId, caseFileId]);

  // Function to toggle the view between summary and full case file
  const toggleView = () => {
    setShowFullCase(!showFullCase);
  };

  // Display error message if there's an error
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Display loading message if case file data is not yet available
  if (!caseFile) {
    return <div>Loading...</div>;
  }

  // Render the case details page
  return (
    <div className="CaseDetailsPage">
      <div className="content">
        {/* Display the case file title */}
        <h1>{caseFile.article_title}</h1>
        {/* Button to toggle between full case file and summary view */}
        <button onClick={toggleView} className="toggle-button">
          {showFullCase ? 'View Summary' : 'View Full Case File'}
        </button>
        {/* Display full case content or summary based on showFullCase state */}
        <p>{showFullCase ? caseFile.article_content : summary}</p>
        {/* Link to the photos page for the case file */}
        <Link to={`/countries/${countryId}/case_files/${caseFileId}/photos`} className="photos-link">
          <button className="photos-button">Photos</button>
        </Link>
        {/* Link to the questions page for the case file */}
        <Link to={`/countries/${countryId}/case_files/${caseFileId}/questions`} className="questions-link">
          <button className='questions-button'>Collect the Evidence</button>
        </Link>
      </div>
      {/* Render the Navbar component */}
      <Navbar />
    </div>
  );
};

export default CaseDetailsPage;




