import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Utilisation de Navigate pour la redirection
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './page/Dashboard';
import { ParamProvider } from './components/Parametre';
import Table from './page/Table';
import Caracteristique from './page/Caracteristique';
import Salle from './page/Salle';
import Vacin from './page/Vacin';
import Ration from './page/Ration';
import Maladie from './page/Maladie';
import Materiel from './page/Materiel';
import Stock from './page/Stock';
import Programme from './page/Programme';
import Vide_sanitaire from './page/Vide_sanitaire';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import Poule from './page/Poule';
import Login from './page/Login';
import Prod from './page/Prod';
import Poules from './page/Poules';
import Gestionnaire from './page/Gestionnaire';

function App() {
  return (
    <div className="container-scroller">
      <ParamProvider>
        <Router>
          <Routes>
            {/* Route pour la connexion */}
            <Route path='/login' element={<Login />} />

            {/* Redirection vers la page de login par défaut */}
            <Route
              path='/'
              element={<Navigate to="/login" replace />}
            />

            {/* Routes protégées après la connexion */}
            <Route
              path='/*'
              element={
                <div className="container-fluid page-body-wrapper">
                  <Navbar />
                  <Sidebar />
                  <Routes>
                    <Route path="/dash" element={<Dashboard />} />
                    <Route path="/table" element={<Table />} />
                    <Route path="/ration" element={<Ration />} />
                    <Route path="/maladie" element={<Maladie />} />
                    <Route path="/salle" element={<Salle />} />
                    <Route path="/vacin" element={<Vacin />} />
                    <Route path="/caractere" element={<Caracteristique />} />
                    <Route path="/materiel" element={<Materiel />} />
                    <Route path="/stock" element={<Stock />} />
                    <Route path="/programme" element={<Programme />} />
                    <Route path="/Vide_sanitaire" element={<Vide_sanitaire />} />
                    <Route path="/poule" element={<Poule />} />
                    <Route path="/prod" element={<Prod />} />
                    <Route path="/Poules" element={<Poules />} />
                    <Route path="/gestionnaire" element={<Gestionnaire />} />
                  </Routes>
                </div>
              }
            />
          </Routes>
        </Router>
      </ParamProvider>
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default App;
