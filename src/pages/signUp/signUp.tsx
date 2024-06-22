import React, { useState, useEffect } from "react";
import ModalComponent from "../../components/modal/modal";
import bcrypt from "bcryptjs";
import mainBanner from "../../assets/mainBanner.jpg";
import "./signUp.scss";
import { useAuth } from "../../components/auth/authContext";
import { useNavigate, Link } from "react-router-dom";
import {
  isNameValid,
  isEmailValid,
  isPasswordValid,
} from "../../components/dataValidation/dataValidation";

const SignUp: React.FC = () => {
  const { login } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [signupData, setSignupData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const checkEmailExists = (email: string): boolean => {
    const existingUsers = Object.keys(localStorage);
    return existingUsers.some((userId) => {
      const userData = JSON.parse(localStorage.getItem(userId)!);
      return userData.email === email;
    });
  };

  useEffect(() => {
    if (checkEmailExists(signupData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Cet email est déjà utilisé. Veuillez en choisir un autre.",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "",
      }));
    }
  }, [signupData.email]);

  const handleSignupInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let isValid = true;

    if (!isNameValid(signupData.firstname)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        firstname:
          "Le prénom doit commencer par une majuscule et ne doit pas contenir de chiffres.",
      }));
      isValid = false;
    }

    if (!isNameValid(signupData.lastname)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        lastname:
          "Le nom doit commencer par une majuscule et ne doit pas contenir de chiffres.",
      }));
      isValid = false;
    }

    if (!isEmailValid(signupData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "L'adresse email est invalide.",
      }));
      isValid = false;
    }

    if (!isPasswordValid(signupData.password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Le mot de passe doit contenir au moins une majuscule.",
      }));
      isValid = false;
    }

    if (checkEmailExists(signupData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Cet email est déjà utilisé. Veuillez en choisir un autre.",
      }));
      isValid = false;
    }

    if (isValid) {
      const userId = `user_${Math.floor(Math.random() * 100000)}`;
      const hashedPassword = await bcrypt.hash(signupData.password, 10);
      const dataToStore = { ...signupData, password: hashedPassword };

      localStorage.setItem(userId, JSON.stringify(dataToStore));
      setIsRegistered(true);
      setIsModalOpen(true);
      login(userId);
    }
  };

  const CloseModal = () => {
    navigate("/menu");
    setIsModalOpen(false);
  };

  return (
    <main className="inscription">
      <section className="inscription_mainBanner">
        <img src={mainBanner} alt="Main Banner" className="img" />
      </section>
      <section className="inscription_signup">
        <h2 className="inscription_title">Inscription / Sign up</h2>
        <form className="form" onSubmit={handleSignupSubmit}>
          <div className="form_row">
            <label htmlFor="firstname">Prénom</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              className={errors.firstname ? "input_error" : ""}
              placeholder="Doe"
              value={signupData.firstname}
              onChange={handleSignupInputChange}
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
              value={signupData.lastname}
              onChange={handleSignupInputChange}
            />
            {errors.lastname && (
              <span className="error_message">{errors.lastname}</span>
            )}
          </div>
          <div className="form_row">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={errors.email ? "input_error" : ""}
              placeholder="john.doe@example.com"
              value={signupData.email}
              onChange={handleSignupInputChange}
            />
            {errors.email && (
              <span className="error_message">{errors.email}</span>
            )}
          </div>
          <div className="form_row">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              name="password"
              className={errors.password ? "input_error" : ""}
              placeholder="password"
              value={signupData.password}
              onChange={handleSignupInputChange}
            />
            {errors.password && (
              <span className="error_message">{errors.password}</span>
            )}
          </div>
          <button className="form_button" type="submit">
            S'inscrire
          </button>
        </form>
        <p className="login_message">
          Vous avez déjà un compte ?{" "}
          <Link to="/login" className="login_message_link">
            Connectez-vous
          </Link>
        </p>
      </section>
      {isRegistered && (
        <ModalComponent
          isOpen={isModalOpen}
          onRequestClose={CloseModal}
          contentLabel="Inscription Confirmation Modal"
        >
          <h2>Vous êtes connecté !</h2>
          <p>Inscription réussie</p>
        </ModalComponent>
      )}
    </main>
  );
};

export default SignUp;
