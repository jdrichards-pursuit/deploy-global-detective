import React, { useState, useEffect } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import Navbar from "../Components/NavBar";
import "../CSS/ResultPage.css";
const URL = import.meta.env.VITE_BASE_URL;

const ResultsPage = ({ userStats }) => {
  const { countryId, caseFileId } = useParams();
  const location = useLocation(); // Access the current location object
  const [currentStats, setCurrentStats] = useState(null); // State to store current player stats
  const [hasUpdated, setHasUpdated] = useState(false); // State to track if stats have been updated

  // EXTRACT SCORE AND TOTALQUESTIONS
  const score = location.state?.score || 0; // Get score from the location state, default to 0
  const totalQuestions = location.state?.totalQuestions || 0; // Get totalQuestions from the location state, default to 0

  useEffect(() => {
    const storedStats = localStorage.getItem("currentPlayerStats");
    if (storedStats) {
      setCurrentStats(JSON.parse(storedStats)); // Set current stats if found in localStorage
    } else {
      setCurrentStats(userStats); // Otherwise, use the passed userStats
      localStorage.setItem("currentPlayerStats", JSON.stringify(userStats)); // Store initial user stats in localStorage
    }
  }, [userStats]);

  const calculateXPEarned = () => {
    return score * 25; // Calculate XP earned based on the score
  };

  const updatePlayerStats = async (updatedStats) => {
    try {
      const response = await fetch(`${URL}/api/stats/${userStats.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Include authorization token
        },
        body: JSON.stringify(updatedStats), // Send updated stats in the request body
      });

      if (!response.ok) {
        throw new Error("Failed to update player stats");
      }

      const data = await response.json();
    } catch (error) {
      console.error("Error updating player stats:", error);
    }
  };

  useEffect(() => {
    if (currentStats && !hasUpdated && score > 0) {
      const xpEarned = calculateXPEarned(); // Calculate XP earned

      const newCurrentStats = {
        ...currentStats,
        xp: currentStats.xp + xpEarned,
        games_played: currentStats.games_played + 1,
        questions_correct: currentStats.questions_correct + score,
        questions_wrong:
          currentStats.questions_wrong + (totalQuestions - score),
      };
      setCurrentStats(newCurrentStats); // Update state with new stats
      localStorage.setItem(
        "currentPlayerStats",
        JSON.stringify(newCurrentStats)
      ); // Store new stats in localStorage

      const smallIncrement = {
        xp: xpEarned,
        games_played: 1,
        questions_correct: score,
        questions_wrong: totalQuestions - score,
      };
      updatePlayerStats(smallIncrement); // Update player stats on the server
      setHasUpdated(true); // Set hasUpdated to true
    }
  }, [currentStats, score, totalQuestions, hasUpdated]);

  if (!currentStats) {
    return <p>Loading player stats...</p>;
  }

  return (
    <div className="ResultsPage">
      <h2>Case {caseFileId}</h2>
      <div className="findings-border">
        <p>
          Findings: {score} / {totalQuestions}
        </p>
        <p>XP Earned: {calculateXPEarned()}</p>
        <h3>Questions Summary:</h3>
        <div className="result-buttons">
          <Link
            to={`/countries/${countryId}/case_files/${caseFileId}/questions`}
            className="retry-link"
            state={{ refresh: true }} // Pass refresh state to retry link
          >
            <button className="retry-button">Retry Quiz</button>
          </Link>
          <Link to="/countries">
            <button>Start New Game</button>
          </Link>
        </div>
      </div>
      <div className="player-stats">
        <h2>Progress Report</h2>
        <h3>Rank: Junior Detective</h3>
        <p>XP: {currentStats.xp}</p>
        <p>Games Played: {currentStats.games_played}</p>
        <p>Questions Correct: {currentStats.questions_correct}</p>
        <p>Questions Wrong: {currentStats.questions_wrong}</p>
      </div>
      <Navbar />
    </div>
  );
};

export default ResultsPage;
