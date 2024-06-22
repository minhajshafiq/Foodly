import React from "react";
import "./footer.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <section className="footer_container">
        <div className="footer_section">
          <h4 className="footer_title">À propos de nous</h4>
          <p className="footer_text">
            Nous sommes une entreprise dédiée à offrir les meilleurs produits et
            services.
          </p>
        </div>
        <div className="footer_section">
          <h4 className="footer_title">Contactez-nous</h4>
          <p className="footer_text">
            <FontAwesomeIcon icon={faEnvelope} className="footer_icon" />{" "}
            contact@foodly.com
          </p>
          <p className="footer_text">
            <FontAwesomeIcon icon={faPhone} className="footer_icon" /> +33 1 23
            45 67 89
          </p>
        </div>
        <div className="footer_section">
          <h4 className="footer_title">Suivez-nous</h4>
          <div className="footer_socials">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer_socialLink"
            >
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a
              href="https://www.twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer_socialLink"
            >
              <FontAwesomeIcon icon={faTwitter} />
            </a>
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer_socialLink"
            >
              <FontAwesomeIcon icon={faInstagram} />
            </a>
          </div>
        </div>
        <div className="footer_bottom">
          <p>&copy; 2024 Entreprise. Tous droits réservés.</p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
