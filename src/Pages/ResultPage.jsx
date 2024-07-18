import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../Components/NavBar';
import "../CSS/ResultPage.css"

const ResultsPage = () => {
  const { score, totalQuestions, countryId, caseFileId } = useParams(); 
  const [playerStats, setPlayerStats] = useState(null); 
  const [playerId, setPlayerID] = useState(null); 

  // Fetch player statistics based on player ID
  useEffect(() => {
    const fetchPlayerStats = async () => {
      try {
        const response = await fetch(`http://localhost:3003/api/stats/1`);
        if (!response.ok) {
          throw new Error('Failed to fetch player stats');
        }
        const data = await response.json();
        setPlayerStats(data);
      } catch (error) {
        console.error('Error fetching player stats:', error);
      }
    };

    fetchPlayerStats();
  }, [playerId]);

  // Calculate XP earned based on the score
  const calculateXPEarned = () => {
    return score * 25;
  };

  return (
    <div className="ResultsPage">
      <h2>Case 1</h2>
      <div className='findings-border'>
        <p>Findings: {score} / {totalQuestions}</p>
        <p>XP Earned: {calculateXPEarned()}</p>
        <h3>Questions Summary:</h3>
        <div className="result-buttons">
          <Link to={`/countries/${countryId}/case_files/${caseFileId}/questions`} className="retry-link">
            <button className="retry-button">Retry Quiz</button>
          </Link>
          <Link to="/countries">
            <button>Start New Game</button>
          </Link>
        </div>
      </div>
      <div className="player-stats">
        {playerStats ? (
          <>
            <h2>Progess Report</h2>
            <h3>Rank: Junior Detective</h3>
            <p>XP: {playerStats.xp}</p>
            <p>Games Played: {playerStats.games_played}</p>
            <p>Questions Correct: {playerStats.questions_correct}</p>
            <p>Questions Wrong: {playerStats.questions_wrong}</p>
          </>
        ) : (
          <p>Loading player stats...</p>
        )}
      </div>
      <Navbar/>
    </div>
  );
};

export default ResultsPage;


