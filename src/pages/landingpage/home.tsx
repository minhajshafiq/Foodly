import React from "react";
import { Link } from "react-router-dom";
import "./home.scss";
import heroBanner from "../../assets/heroBanner.jpg";
import mainBanner from "../../assets/mainBanner.jpg";
import { useAuth } from "../../components/auth/authContext";

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <main className="home">
      <section className="home_mainBanner">
        <img src={mainBanner} alt="Main Banner" className="img" />
      </section>
      <img src={heroBanner} alt="Hero Banner" className="home_heroBanner" />
      <div className="home_container">
        <h1 className="home_title">Bienvenue dans notre restaurant</h1>
        <p className="home_text">
          Dans notre restaurant, vous pouvez déguster des plats sains et
          équilibrés.
        </p>
        <div className="home_buttons">
          <Link to="/menu">
            <button className="home_buttons_1">Explorez nos menus</button>
          </Link>
          {isAuthenticated ? (
            <Link to="/menu">
              <button className="home_buttons_2">
                Commandez en ligne / livraison
              </button>
            </Link>
          ) : (
            <Link to="/signup">
              <button className="home_buttons_2">
                Commandez en ligne / livraison
              </button>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
