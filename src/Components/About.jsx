import react from "react";
import "../Pages/About.css"
const About = () => {
    return (
      <div className="about-container">
        <h1 className="about-me">About The Devs</h1>
        <ul className="developer-pro">
          <li className="developer">
          <h2>Anita</h2>
          <a
            href="https://github.com/AnitaOwen"
            className="github-link"
            target="_blank"
          >
            <img
              src="?"
              alt="Anita!"
              width="300"
              height="300"
            />
          </a>
          <p className="linkedin-link">
         <a href="https://www.linkedin.com/in/anitaowenny/" target="_blank" rel="noopener noreferrer">
         Connect with her on LinkedIn
         </a>
         </p>

          <h2>Armando</h2>
          <a
            href="https://github.com/ArmandoPires103"
            className="github-link"
            target="_blank"
          >
            <img
              src="?"
              alt="Armando!"
              width="300"
              height="300"
            />
          </a>
          <p className="linkedin-link">
         <a href="https://www.linkedin.com/in/armando-pires-aba0a121b/" target="_blank" rel="noopener noreferrer">
         Connect with him on LinkedIn
         </a>
         </p>
          <h2>Brenda</h2>
          <a
            href="https://github.com/BSoto85"
            className="github-link"
            target="_blank"
          >
            <img
              src="?"
              alt="Brenda!"
              width="300"
              height="300"
            />
          </a>
          <p className="linkedin-link">
         <a href="https://www.linkedin.com/in/brendasotoct/" target="_blank" rel="noopener noreferrer">
         Connect with her on LinkedIn
         </a>
         </p>
          <h2>Luis</h2>
          <a
            href="https://github.com/Blui322"
            className="github-link"
            target="_blank"
          >
            <img
              src="?"
              alt="Luis!"
              width="300"
              height="300"
            />
          </a>
          <p className="linkedin-link">
         <a href="https://www.linkedin.com/in/luis-tejada-56538b271/" target="_blank" rel="noopener noreferrer">
         Connect with him on LinkedIn
         </a>
         </p>
          <h2>Marlon</h2>
          <a
            href="https://github.com/MarlonPelau"
            className="github-link"
            target="_blank"
          >
            <img
              src="?"
              alt="Marlon!"
              width="300"
              height="300"
            />
          </a>
          <p className="linkedin-link">
         <a href="https://www.linkedin.com/in/mrmarlon/" target="_blank" rel="noopener noreferrer">
         Connect with him on LinkedIn
         </a>
         </p>
        </li>
      </ul>
    </div>
  );
};

export default About;