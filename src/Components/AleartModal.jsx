import React from "react";
import { Link } from "react-router-dom";
import "../CSS/HelpModal.css";
import english from "../translation";

const AleartModal = ({ isOpen, onClose, countryId, caseFile }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{english.alertH2}</h2>
        <ul>
          <li>{english.alertReviewDetails}</li>
          <li>{english.alertCantGoBAck}</li>
        </ul>
        <Link
          to={`/countries/${countryId}/case_files/${caseFile.article_id}/questions`}
          className="questions-link"
        >
          <button className="questions-button">
            {english.collectEvidenceButton}
          </button>
        </Link>
        <button onClick={onClose} className="close-button-aleart">
          {english.alertCloseButton}
        </button>
      </div>
    </div>
  );
};

export default AleartModal;
