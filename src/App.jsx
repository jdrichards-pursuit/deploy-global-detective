import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { auth } from "./helpers/firebase";

import Login from "./Components/Login";
import SignUpView from "./Pages/SignUpView.jsx";
// import Profile from './Components/Profile'
import Test from "./Components/Test";
import HomePage from "./Pages/HomePage";
import CountriesPage from "./Pages/CountriesPage.jsx";
import LeaderboardPage from "./Pages/LeaderboardPage.jsx";
import CaseFilesPage from "./Pages/CaseFilesPage.jsx";
import CaseDetailsPage from "./Pages/CaseDetailsPage.jsx";
import AboutPage from "./Pages/AboutPage.jsx";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  // PROP FOR COUNTRY FETCH
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("http://localhost:3003/api/countries");
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      <Routes
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 100,
        }}
      >
        {/* <Route
          path="/"
          element={user ? <Navigate to="/profile" /> : <Login />}
        /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/test" element={user ? <Test /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUpView />} />

        {/* <Route path="/profile" element={<ProfilePage />} /> */}
        {/* <Route path="/help" element={<HelpPage />} /> */}
        <Route path="/about" element={<AboutPage />} />
        {/* <Route path="/leaderboard" element={<LeaderboardPage />} /> */}
        {/* <Route path="/achievements" element={<AchievementsPage />} /> */}
        <Route
          path="/countries"
          element={<CountriesPage countries={countries} />}
        />
        <Route
          path="/countries/:countryId/casefiles"
          element={<CaseFilesPage countries={countries} />}
        />
        <Route
          exact
          path="/countries/:countryId/case_files/:caseFileId"
          element={<CaseDetailsPage />}
        />
        {/* <Route path="/countries/:countries_name/:case_number/photos" element={<CasePhotosPage />} />
        <Route path="/countries/:countries_name/:case_number/evidence" element={<QuestionPage />} />
        <Route path="/countries/:countries_name/:case_number/results" element={<ResultPage />} />
        <Route path="*" element={<FourOFourPage />} /> */}
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
