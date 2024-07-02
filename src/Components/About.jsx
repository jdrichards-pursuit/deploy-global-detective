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
            href="https://github.com/KenCab123/"
            className="github-link"
            target="_blank"
          >
            <img
              src="https://res.cloudinary.com/dgifdj6nx/image/upload/v1716214563/Screenshot_2024-04-01_at_3.22.13_PM_cghw1j.png"
              alt="Anita!"
              width="300"
              height="300"
            />
          </a>
          <p className="fun-fact">
            {" "}
            <b>Fun Fact:</b> "?" 🤷🏾‍♂️
          </p>
          <h2>Armando</h2>
          <a
            href="https://github.com/TimNatal1887/"
            className="github-link"
            target="_blank"
          >
            <img
              src="https://res.cloudinary.com/dgifdj6nx/image/upload/v1716221799/IMG_8993_kkwi5i.jpg"
              alt="Armando!"
              width="300"
              height="300"
            />
          </a>
          <p className="fun-fact">
            {" "}
            <b>Fun Fact:</b> "?" 🤷🏾‍♂️
          </p>
          <h2>Brenda</h2>
          <a
            href="https://github.com/KenCab123/"
            className="github-link"
            target="_blank"
          >
            <img
              src="https://res.cloudinary.com/dgifdj6nx/image/upload/v1716214563/Screenshot_2024-04-01_at_3.22.13_PM_cghw1j.png"
              alt="Brenda!"
              width="300"
              height="300"
            />
          </a>
          <p className="fun-fact">
            {" "}
            <b>Fun Fact:</b> "?" 🤷🏾‍♂️
          </p>
          <h2>Luis</h2>
          <a
            href="https://github.com/TimNatal1887/"
            className="github-link"
            target="_blank"
          >
            <img
              src="https://res.cloudinary.com/dgifdj6nx/image/upload/v1716221799/IMG_8993_kkwi5i.jpg"
              alt="Luis!"
              width="300"
              height="300"
            />
          </a>
          <p className="fun-fact">
            {" "}
            <b>Fun Fact:</b> "?" 🤷🏾‍♂️
          </p>
          <h2>Marlon</h2>
          <a
            href="https://github.com/MarlonPelau"
            className="github-link"
            target="_blank"
          >
            <img
              src="https://res.cloudinary.com/dgifdj6nx/image/upload/t_Profile/v1712883521/pelau_yfhd9e.png"
              alt="Marlon!"
              width="300"
              height="300"
            />
          </a>
          <p className="fun-fact">
            {" "}
            <b>Fun Fact:</b> "?" 🤷🏾‍♂️
          </p>
        </li>
      </ul>
    </div>
  );
};

export default About;