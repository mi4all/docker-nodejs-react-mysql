import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const token = localStorage.getItem("token"); // Récupérer le token

  // Si le token existe, on affiche le composant, sinon on redirige vers la page de connexion
  return token ? <Element {...rest} /> : <Navigate to="/" />;
};

export default PrivateRoute;