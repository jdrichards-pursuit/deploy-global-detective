// CaseFilesPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CaseFilesPage = () => {
  const { countryId } = useParams();
  const [countryName, setCountryName] = useState('');
  const [caseFiles, setCaseFiles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        // Fetch country name (if needed)
        // const countryResponse = await fetch(`http://localhost:3003/api/countries/${countryId}`);
        // if (!countryResponse.ok) {
        //   throw new Error('Failed to fetch country data');
        // }
        // const countryData = await countryResponse.json();
        // setCountryName(countryData.name);

        // Fetch case files
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

  const imageUrl = 'https://res.cloudinary.com/dhexjuuzd/image/upload/v1720022191/images_8_nwnyck.jpg';

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="CaseFilesPage">
      <h1>{countryName} Case Files</h1>
      <div className="case-files-list">
        {caseFiles.map((caseFile) => (
          <Link key={caseFile.id} to={`/casefiles/${caseFile.id}`} className="case-file-item">
            <img src={imageUrl} alt={`Image for ${caseFile.article_title}`} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CaseFilesPage;
