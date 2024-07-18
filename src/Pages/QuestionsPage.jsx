import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Components/NavBar';
import '../CSS/QuestionsPage.css';

const QuestionsPage = ({ user }) => {
  const { countryId, caseFileId } = useParams(); 
  const navigate = useNavigate(); 
  const [questions, setQuestions] = useState([]); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const [score, setScore] = useState(0); 
  const [selectedAnswer, setSelectedAnswer] = useState(''); 

  // Helper function to calculate age from DOB
  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const birthMonth = birthDate.getMonth();
    const todayMonth = today.getMonth();
  
    if (todayMonth < birthMonth || (todayMonth === birthMonth && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
  };
  
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const age = calculateAge(user.dob);
        console.log(`User age: ${age}`); 
        const endpoint = age >= 18 ? `older_questions` : `younger_questions`;
        const response = await fetch(`http://localhost:3003/api/${endpoint}/${caseFileId}`);
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
  }, [caseFileId, user.dob]);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const currentQuestion = questions[currentQuestionIndex];
    // Check if the selected answer is correct and update score
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }

    // Check if it is the last question
    if (currentQuestionIndex === questions.length - 1) {
      navigate(`/countries/${countryId}/case_files/${caseFileId}/questions/results/${score + 1}/${questions.length}`);
    } else {
      // Move to the next question
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(''); 
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
        <p>{currentQuestion.y_question || currentQuestion.o_question}</p>
        <form onSubmit={handleSubmit}>
          <div className="answers">
            {[currentQuestion.y_correct_answer || currentQuestion.o_correct_answer, 
              currentQuestion.y_incorrect_answer1 || currentQuestion.o_incorrect_answer1 , 
              currentQuestion.y_incorrect_answer2 || currentQuestion.o_incorrect_answer2 , 
              currentQuestion.y_incorrect_answer3 || currentQuestion.o_incorrect_answer3 ].map((answer, index) => (
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

