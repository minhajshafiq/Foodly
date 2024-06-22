import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.scss";
import { useAuth } from "../../components/auth/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";
import ModalComponent from "../modal/modal";

const Header: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const closeDrop = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="header">
      <h2 className="header_title">Foodly</h2>
      <nav className="header_navbar">
        <ul>
          <Link to="/" className="navbar_element_1">
            <div className="auth_box">
              <li>Acceuil</li>
            </div>
          </Link>
          <Link to="/menu" className="navbar_element_2">
            <div className="auth_box">
              <li>Nos menus</li>
            </div>
          </Link>
          {isAuthenticated ? (
            <li>
              <button className="header_button" onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faUser} /> Mon Compte
              </button>
              {isDropdownOpen && (
                <div className="dropdown_content">
                  <Link to="/myinfo">
                    <button className="logout_button" onClick={closeDrop}>
                      <FontAwesomeIcon icon={faIdCard} /> Mes Infos
                    </button>
                  </Link>
                  <button className="logout_button" onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} /> Déconnexion
                  </button>
                </div>
              )}
            </li>
          ) : (
            <React.Fragment>
              <Link to="/login" className="navbar_element_3">
                <div className="auth_box">
                  <li>Connexion</li>
                </div>
              </Link>
              <Link to="/signup" className="navbar_element_4">
                <div className="auth_box">
                  <li>S'inscrire</li>
                </div>
              </Link>
            </React.Fragment>
          )}
        </ul>
      </nav>
      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Déconnexion Confirmation Modal"
      >
        <h2>Vous avez bien été déconnecté</h2>
        <p>À bientôt !</p>
      </ModalComponent>
    </header>
  );
};

export default Header;
