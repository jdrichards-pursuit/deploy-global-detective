import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import "../CSS/CaseDetails.css"
import Navbar from '../Components/NavBar';

const CaseDetailsPage = () => {
  const { userUid, countryId, caseFileId } = useParams();
  const [caseFile, setCaseFile] = useState(null);
  const [error, setError] = useState(null);
  const [showFullCase, setShowFullCase] = useState(false);

  useEffect(() => {
    const fetchCaseFileData = async () => {
      try {
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

    fetchCaseFileData();
  }, [countryId, caseFileId]);

  // Function to toggle the view between summary and full case file
  const toggleView = () => {
    setShowFullCase(!showFullCase);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!caseFile) {
    return <div>Loading...</div>;
  }
  
  return (
    <div>
    <div className="CaseDetailsPage">
      <div className="content">
        <h1>{caseFile.article_title}</h1>
        <img src={caseFile.photo_url} alt="Case" className="case-image" />
        <p>{showFullCase ? caseFile.article_content : caseFile.summary_young}</p>
        <button onClick={toggleView} className="toggle-button">
          {showFullCase ? 'View Summary' : 'View Full Case File'}
        </button>
        <Link to={`/countries/${countryId}/case_files/${caseFile.article_id}/questions`} className="questions-link">
          <button className='questions-button'>Collect the Evidence</button>
        </Link>
      </div>
    </div>
      <Navbar />
    </div>
  );
};

export default CaseDetailsPage;


