import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import bcrypt from "bcryptjs";
import "./logIn.scss";
import { useAuth } from "../../components/auth/authContext";
import mainBanner from "../../assets/mainBanner.jpg";
import ModalComponent from "../../components/modal/modal";

const LogIn: React.FC = () => {
  const { login } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errorsLogin, setErrorsLogin] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLoginInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
    setErrorsLogin({
      ...errorsLogin,
      [name]: "",
    });
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const storedUsers = Object.keys(localStorage).filter((key) =>
      key.startsWith("user_"),
    );

    if (storedUsers.length === 0) {
      setErrorsLogin({
        ...errorsLogin,
        email: "Aucun utilisateur enregistré.",
      });
      return;
    }

    let isValidUser = false;
    let matchedUserId = "";
    let userRole = "";

    for (const userId of storedUsers) {
      const userData = JSON.parse(localStorage.getItem(userId) || "{}");
      if (loginData.email === userData.email) {
        const isPasswordMatch = await bcrypt.compare(
          loginData.password,
          userData.password,
        );
        if (isPasswordMatch) {
          isValidUser = true;
          matchedUserId = userId;
          userRole = userData.role;
          break;
        } else {
          setErrorsLogin({
            ...errorsLogin,
            password: "Mot de passe incorrect.",
          });
          return;
        }
      }
    }

    if (!isValidUser) {
      setErrorsLogin({
        ...errorsLogin,
        email: "Email incorrect.",
      });
      return;
    }

    login(matchedUserId);

    // Redirection en fonction du rôle de l'utilisateur
    if (userRole === "admin") {
      navigate("/admin");
    } else {
      setIsModalOpen(true);
    }
  };

  const handleRequestClose = () => {
    setIsModalOpen(false);
    navigate("/menu");
  };

  return (
    <main className="login">
      <section className="login_mainBanner">
        <img src={mainBanner} alt="Main Banner" className="img" />
      </section>
      <section className="login_container">
        <h2 className="login_title">Login</h2>
        <form className="form" onSubmit={handleLoginSubmit}>
          <div className="form_row">
            <label htmlFor="email">Votre email</label>
            <input
              type="email"
              id="emailRegistered"
              name="email"
              className={errorsLogin.email ? "input_error" : ""}
              placeholder="john.doe@gmail.com"
              value={loginData.email}
              onChange={handleLoginInputChange}
            />
            {errorsLogin.email && (
              <span className="error_message">{errorsLogin.email}</span>
            )}
          </div>
          <div className="form_row">
            <label htmlFor="password">Votre mot de passe</label>
            <input
              type="password"
              id="passwordRegistered"
              name="password"
              className={errorsLogin.password ? "input_error" : ""}
              placeholder="password"
              value={loginData.password}
              onChange={handleLoginInputChange}
            />
            {errorsLogin.password && (
              <span className="error_message">{errorsLogin.password}</span>
            )}
          </div>
          <button className="form_button" type="submit">
            Se connecter
          </button>
        </form>
        <p className="signup_message">
          Vous n'avez pas encore de compte?{" "}
          <Link to="/signup" className="signup_message_link">
            Inscrivez-vous
          </Link>
        </p>
      </section>
      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={handleRequestClose}
        contentLabel="Login Confirmation Modal"
      >
        <h2>Vous êtes connecté</h2>
        <p>Connexion réussie</p>
      </ModalComponent>
    </main>
  );
};

export default LogIn;
