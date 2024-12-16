import React, { useState } from "react"
import { Link,useLocation } from "react-router-dom"
import { useEffect } from "react";
import Recherche from "./Recherche";

function Sidebar() {
  const location = useLocation();
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
      // Vérifier si l'utilisateur est dans le localStorage
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
          setUtilisateur(user);
      }
  }, []);
  const getInitials = (nomComplet) => {
    if (!nomComplet) return "";
    return nomComplet.split(" ")[0][0].toUpperCase(); // Prend la première lettre du prénom
  };

  useEffect (() => {
    const screenWidth =window.innerWidth
    if (screenWidth > 991) {
      if (document.body.classList.contains('sidebar-hidden') || document.body.classList.contains('sidebar-icon-only')) {
        document.querySelector('.content-wrapper').style.marginLeft = "60px"
        
      } else {
         document.querySelector('.content-wrapper').style.marginLeft = "250px"
      }
    }
     else {
       document.querySelector('.content-wrapper').style.marginLeft = "60px"
    }

    const handleRise = () =>{
      const newwidth = window.innerWidth
      if (newwidth <=991 || document.body.classList.contains('sidebar-icon-only' )) {
         document.querySelector('.content-wrapper').style.marginLeft = "60px"
      }else{
        document.querySelector('.content-wrapper').style.marginLeft = "250px"
      }
    }

    window.addEventListener('resize',handleRise)

    return()=>{
      window.removeEventListener('resize', handleRise)
    }
    
  }, [location])
  return (
    <nav className="sidebar sidebar-offcanvas" id="sidebar" style={{position: "fixed"}}>
    <ul className="nav">
      <li className="nav-item">
        <div className="d-flex sidebar-profile">
          <div className="sidebar-profile-image">
            {/* <img src="kit/images/faces/face29.png" alt="image"/> */}
             <div className="sidebar-avatar">
            {utilisateur ? getInitials(utilisateur.NomComplet) : ""}
            </div>

            <span className="sidebar-status-indicator"></span>
          </div>
          <div className="sidebar-profile-name">
            <p className="sidebar-name">
            {utilisateur ? `Bienvenue ${utilisateur.NomComplet}` : "Chargement..."}
            </p>
            <p className="sidebar-designation">
              Bonjour
            </p>
          </div>
        </div>
       
          
           <Recherche/>
            
          
       
        <p className="sidebar-menu-title">Dash menu</p>
      </li>
      <li className={`nav-item ${location.pathname === '/dash' ? 'active' : ''}` }>
        <Link className="nav-link" to='/dash'>
          <i className="typcn typcn-device-desktop menu-icon"></i>
          <span className="menu-title">Dashboard </span>
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === '/salle' ? 'active' : ''}` }>
        <Link className="nav-link"  to="/salle">
          <i className="typcn typcn-home menu-icon"></i>
          <span className="menu-title">Salles</span>
          
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === '/vacin' ? 'active' : ''}` }>
        <Link className="nav-link" to="/vacin">
          <i className="typcn typcn-thermometer menu-icon"></i>
          <span className="menu-title">Médicament</span>
         
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === '/ration' ? 'active' : ''}` }>
        <Link className="nav-link" to="/ration">
          <i className="typcn typcn-coffee menu-icon"></i>
          <span className="menu-title">Rations</span>
         
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === '/caractere' ? 'active' : ''}`}>
         <Link className="nav-link" to='/caractere'>
          <i className="typcn typcn-sort-alphabetically menu-icon"></i>
          <span className="menu-title">Caractéristique</span>
        </Link>
       
      </li>
      <li className={`nav-item ${location.pathname === '/maladie' ? 'active' : ''}` }>
        <Link className="nav-link" to="/maladie">
          <i className="typcn typcn-weather-stormy menu-icon"></i>
          <span className="menu-title">Maladies</span>
         
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === '/stock' ? 'active' : ''}` }>
        <Link className="nav-link" to="/stock">
          <i className="typcn typcn-archive  menu-icon"></i>
          <span className="menu-title">Stock</span>
         
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === '/materiel' ? 'active' : ''}` }>
        <Link className="nav-link" to="/materiel">
          <i className="typcn typcn-briefcase menu-icon"></i>
          <span className="menu-title">Materiels</span>
         
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === '/programme' ? 'active' : ''}` }>
        <Link className="nav-link" to="/programme">
          <i className="typcn typcn-calendar menu-icon"></i>
          <span className="menu-title">Programme de vaccin</span>
        </Link>
      </li>
      <li className={`nav-item ${location.pathname === '/Vide_sanitaire' ? 'active' : ''}` }>
        <Link className="nav-link" to="/Vide_sanitaire">
          <i className="typcn typcn-cog menu-icon"></i>
          <span className="menu-title">Vide_sanitaire</span>
        </Link>
      </li>
    </ul>
  </nav>
  )
}

export default Sidebar