import React from "react";
import { Link } from "react-router-dom";
import "../CSS/HelpModal.css";
// import translation from "../translation";

const AleartModal = ({ isOpen, onClose, countryId, caseFile, translation }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{translation.alertH2}</h2>
        <ul>
          <li>{translation.alertReviewDetails}</li>
          <li>{translation.alertCantGoBAck}</li>
        </ul>
        <Link
          to={`/countries/${countryId}/case_files/${caseFile.article_id}/questions`}
          className="questions-link"
        >
          <button className="questions-button">
            {translation.collectEvidenceButton}
          </button>
        </Link>
        <button onClick={onClose} className="close-button-aleart">
          {translation.alertCloseButton}
        </button>
      </div>
    </div>
  );
};

export default AleartModal;
