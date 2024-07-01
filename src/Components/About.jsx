const About = () => {
    return (
      <div className="about-container">
        <h1 className="about-me">About 🎧 Me</h1>
        <ul className="developer-pro">
          <li className="developer">
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
            <b>Fun Fact:</b> "I got more nicknames & aliases than you can count on both hands!" 🤷🏾‍♂️
          </p>
        </li>
      </ul>
    </div>
  );
};

export default About;