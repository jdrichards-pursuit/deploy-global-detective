import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../Components/NavBar';
import '../CSS/CaseDetails.css';

const CaseDetailsPage = () => {
  const { countryId, caseFileId } = useParams();
  const [caseFile, setCaseFile] = useState(null);
  const [error, setError] = useState(null);
  const [showFullCase, setShowFullCase] = useState(false);

  const summary = 'The war in eastern Ukraine has gotten worse recently. Fighting between Ukrainian soldiers and pro-Russian rebels has led to deaths on both sides. This conflict is making it harder for the United States to become friendlier with Russia. The U.S. helps train Ukrainian soldiers, who are fighting against rebels supported by Russia. Both sides are trying to control areas between their front lines. The fighting has caused problems for people living in the area, like power and water outages. Its also very cold, making things even harder for residents. The U.S. wants to have better relations with Russia, but this might make Ukraine worry that they wont get as much help against Russia in the future.';

  useEffect(() => {
    const fetchCaseFileData = async () => {
      try {
        const response = await fetch(`http://localhost:3003/api/case_files/${countryId}`);
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
    <div className="CaseDetailsPage">
      <div className="content">
        <h1>{caseFile.article_title}</h1>
        <button onClick={toggleView} className="toggle-button">
          {showFullCase ? 'View Summary' : 'View Full Case File'}
        </button>
        <p>{showFullCase ? caseFile.article_content : summary}</p>
        <Link to={`/countries/${countryId}/case_files/${caseFileId}/photos`} className="photos-link">
          <button className="photos-button">Photos</button>
        </Link>
        <Link to={`/countries/${countryId}/case_files/${caseFileId}/questions`} className="questions-link">
          <button className='questions-button'>Collect the Evidence</button>
        </Link>
      </div>
      <Navbar />
    </div>
  );
};

export default CaseDetailsPage;



