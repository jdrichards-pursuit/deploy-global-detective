import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Components/NavBar';
import '../CSS/QuestionsPage.css';

const QuestionsPage = () => {
  const { countryId, caseFileId } = useParams(); // Get URL parameters
  const navigate = useNavigate(); // Navigation hook
  const [questions, setQuestions] = useState([]); // State to hold questions
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // State to track current question index
  const [score, setScore] = useState(0); // State to track score
  const [selectedAnswer, setSelectedAnswer] = useState(''); // State to hold selected answer

  // Fetch questions from the API when the component mounts
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

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const currentQuestion = questions[currentQuestionIndex];
    // Check if the selected answer is correct and update score
    if (selectedAnswer === currentQuestion.y_correct_answer) {
      setScore(score + 1);
    }

    // Check if it is the last question
    if (currentQuestionIndex === questions.length - 1) {
      // Navigate to the results page
      navigate(`/countries/${countryId}/case_files/${caseFileId}/questions/results/${score + 1}/${questions.length}`);
    } else {
      // Move to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(''); // Clear selected answer for the next question
    }
  };

  // Calculate the progress of the quiz
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
        <p>{currentQuestion.y_question}</p>
        <form onSubmit={handleSubmit}>
          <div className="answers">
            {/* Render answer options */}
            {[currentQuestion.y_correct_answer, currentQuestion.y_incorrect_answer1, currentQuestion.y_incorrect_answer2, currentQuestion.y_incorrect_answer3].map((answer, index) => (
              <label key={index}>
                <input
                  type="radio"
                  value={answer}
                  checked={selectedAnswer === answer}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                />
                {answer}
              </label>
            ))}
          </div>
          <button type="submit" className='submit' disabled={!selectedAnswer}>Submit</button>
        </form>
      </div>
      <Navbar />
    </div>
  );
};

export default QuestionsPage;

