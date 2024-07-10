import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Components/NavBar';
import '../CSS/QuestionsPage.css';

const QuestionsPage = () => {
  const { countryId, caseFileId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:3003/api/younger_questions/${caseFileId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, [caseFileId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex === questions.length - 1) {
      navigate(`/countries/${countryId}/case_files/${caseFileId}/questions/results/${score + 1}/${questions.length}`);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(''); // Clear selected answer for the next question
    }
  };

  const calculateProgress = () => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  };

  if (questions.length === 0) {
    return <div>Loading...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <div className="QuestionsPage">
        <div className="progress-bar">
          <div className="progress" style={{ width: `${calculateProgress()}%` }}></div>
        </div>
        <h2>Question {currentQuestionIndex + 1}</h2>
        <p>{currentQuestion.question}</p>
        <form onSubmit={handleSubmit}>
          <div className="answers">
            <label>
              <input
                type="radio"
                value={currentQuestion.correct_answer}
                checked={selectedAnswer === currentQuestion.correct_answer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
              />
              {currentQuestion.correct_answer}
            </label>
            <label>
              <input
                type="radio"
                value={currentQuestion.incorrect_answer1}
                checked={selectedAnswer === currentQuestion.incorrect_answer1}
                onChange={(e) => setSelectedAnswer(e.target.value)}
              />
              {currentQuestion.incorrect_answer1}
            </label>
            <label>
              <input
                type="radio"
                value={currentQuestion.incorrect_answer2}
                checked={selectedAnswer === currentQuestion.incorrect_answer2}
                onChange={(e) => setSelectedAnswer(e.target.value)}
              />
              {currentQuestion.incorrect_answer2}
            </label>
            <label>
              <input
                type="radio"
                value={currentQuestion.incorrect_answer3}
                checked={selectedAnswer === currentQuestion.incorrect_answer3}
                onChange={(e) => setSelectedAnswer(e.target.value)}
              />
              {currentQuestion.incorrect_answer3}
            </label>
          </div>
          <button type="submit" className='submit' disabled={!selectedAnswer}>Submit</button>
        </form>
      </div>
      <Navbar />
    </div>
  );
};

export default QuestionsPage;
