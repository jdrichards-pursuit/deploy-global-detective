import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../Components/NavBar';
import '../CSS/CaseDetails.css';

const CaseDetailsPage = () => {
  const { countryId, caseFileId } = useParams();
  const [caseFile, setCaseFile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCaseFileData = async () => {
      try {
        const response = await fetch(`http://localhost:3003/api/countries/${countryId}/case_files`);
        if (!response.ok) {
          throw new Error('Failed to fetch case files');
        }
        const data = await response.json();
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!caseFile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="CaseDetailsPage">
      <div className="content">
        <h1>{caseFile.article_title}</h1>
        <Link to={`/countries/${countryId}/case_files/${caseFileId}/questions`} className="questions-button">
          View Full Case File
        </Link>
        <p>{caseFile.article_content}</p>
      </div>
      <Navbar />
    </div>
  );
};

export default CaseDetailsPage;


