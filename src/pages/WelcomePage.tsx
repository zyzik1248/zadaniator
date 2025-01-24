import React from 'react';
import './WelcomePage.scss';
// import titleImage from '../../assets/title-page.png'; // jeżeli potrzebujesz wczytać plik PNG/JPG

// Jeśli komponent nie przyjmuje żadnych propsów, typ będzie prosty:
const WelcomePage: React.FC = () => {
  return (
    <div className="welcome-page">
      {/* Sekcja fal w tle */}
      <div className="waves-container">
        <svg
          className="wave wave1"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,224L60,208C120,192,240,160,360,138.7C480,117,600,107,720,122.7C840,139,960,181,1080,170.7C1200,160,1320,96,1380,64L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
        <svg
          className="wave wave2"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#39C7A5"
            fillOpacity="1"
            d="M0,96L80,117.3C160,139,320,181,480,186.7C640,192,800,160,960,165.3C1120,171,1280,213,1360,234.7L1440,256L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
        <svg
          className="wave wave3"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#2F2F3F"
            fillOpacity="1"
            d="M0,320L60,320C120,320,240,320,360,320C480,320,600,320,720,320C840,320,960,320,1080,320C1200,320,1320,320,1380,320L1440,320L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
          ></path>
        </svg>
      </div>

      {/* Główne okno powitania */}
      <div className="welcome-box">
        <h1>
          Witaj <span>XYZ</span>!
        </h1>
        <p>Zaczekaj aż administrator doda cię do projektu</p>
      </div>
    </div>
  );
};

export default WelcomePage;
