import React, { useState, useEffect } from "react";
import "./userProfile.scss";
import {
  isNameValid,
  isEmailValid,
} from "../../components/dataValidation/dataValidation";
import mainBanner from "../../assets/mainBanner.jpg";
import { useAuth } from "../../components/auth/authContext";
import { useNavigate } from "react-router-dom";
import ModalComponent from "../../components/modal/modal";

const UserProfile: React.FC = () => {
  const { isAuthenticated, currentUserId, logout } = useAuth();
  const navigate = useNavigate();

  const initialUserInfo = {
    firstname: "",
    lastname: "",
    email: "",
  };

  const [userInfo, setUserInfo] = useState(initialUserInfo);
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAccountDeletedOpen, setIsAccountDeletedOpen] = useState(false);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem(`${currentUserId}`);
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      setUserInfo(initialUserInfo);
    }
  }, [currentUserId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevUserInfo) => ({
      ...prevUserInfo,
      [name]: value,
    }));
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;

    if (!isNameValid(userInfo.firstname)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstname:
          "Le prénom doit commencer par une majuscule et ne doit pas contenir de chiffres.",
      }));
      isValid = false;
    }

    if (!isNameValid(userInfo.lastname)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastname:
          "Le nom doit commencer par une majuscule et ne doit pas contenir de chiffres.",
      }));
      isValid = false;
    }

    if (!isEmailValid(userInfo.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "L'adresse email est invalide.",
      }));
      isValid = false;
    }

    if (isValid) {
      localStorage.setItem(`${currentUserId}`, JSON.stringify(userInfo));
      setIsModalOpen(true);
    }
  };

  const handleDeleteAccount = () => {
    setIsAccountDeletedOpen(true);
    localStorage.removeItem(`${currentUserId}`);
    localStorage.removeItem(`cart_${currentUserId}`);
    logout();
    navigate("/");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsAccountDeletedOpen(false);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <main className="userp">
      <section className="userp_mainBanner">
        <img src={mainBanner} alt="Main Banner" className="img" />
      </section>
      <section className="userp_container">
        <h2 className="userp_title">Modifier mes informations</h2>
        <form className="form" onSubmit={handleSubmit}>
          <div className="form_row">
            <label htmlFor="firstname">Prénom</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              className={errors.firstname ? "input_error" : ""}
              placeholder="Doe"
              value={userInfo.firstname}
              onChange={handleInputChange}
            />
            {errors.firstname && (
              <span className="error_message">{errors.firstname}</span>
            )}
          </div>
          <div className="form_row">
            <label htmlFor="name">Nom</label>
            <input
              type="text"
              id="name"
              name="lastname"
              className={errors.lastname ? "input_error" : ""}
              placeholder="John"
              value={userInfo.lastname}
              onChange={handleInputChange}
            />
            {errors.lastname && (
              <span className="error_message">{errors.lastname}</span>
            )}
          </div>
          <div className="form_row">
            <label htmlFor="email">Votre email</label>
            <input
              type="email"
              id="emailRegistered"
              name="email"
              className={errors.email ? "input_error" : ""}
              placeholder="john.doe@gmail.com"
              value={userInfo.email}
              onChange={handleInputChange}
            />
            {errors.email && (
              <span className="error_message">{errors.email}</span>
            )}
          </div>
          <button className="form_button" type="submit">
            Enregistrer les modifications
          </button>
        </form>
        <button className="delete_account_button" onClick={handleDeleteAccount}>
          Supprimer mon compte
        </button>
      </section>

      <ModalComponent
        isOpen={isAccountDeletedOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmation de suppression du compte"
      >
        <h2>Compte supprimé</h2>
        <p>Votre compte a été supprimé avec succès.</p>
      </ModalComponent>

      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Confirmation des modifications"
      >
        <h2>Modifications enregistrées</h2>
        <p>Vos informations ont été mises à jour avec succès !</p>
      </ModalComponent>
    </main>
  );
};

export default UserProfile;
