import React from "react";
import { Link } from "react-router-dom";

const Error: React.FC = () => {
  return (
    <div className="error-page">
      <h1>Erreur 404</h1>
      <p>Désolé, la page que vous recherchez est introuvable.</p>
      <Link to="/">Retour à la page d'accueil</Link>
    </div>
  );
};

export default Error;
