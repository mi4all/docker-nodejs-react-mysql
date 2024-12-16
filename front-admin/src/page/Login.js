import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const Login = () => {
  const [nomUtilisateur, setnomUtilisateur] = useState('')
  const [MotDePasse, setMotDePasse] = useState('')
const [error, setError] = useState(null);
const [looader,setloader] = useState(null)


const navigate = useNavigate();





const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Réinitialise l'erreur
    setloader(true)

    try {
        const response = await axios.post("http://localhost:4000/api/utilisateur/Connexion", {
            nomUtilisateur,
            MotDePasse,
        });

        const { utilisateur, redirectionUrl } = response.data;

        // Sauvegarder les informations utilisateur si nécessaire
        localStorage.setItem("user", JSON.stringify(utilisateur));

        // Redirection en fonction de l'URL fournie
        // Swal.fire({
        //   icon:'success',
        //   title:` Connecté avec sucess`,
        //   text:` Utiliseur validé`,
        //   confirmButtonText:'Ok'
        // }).then( ()=>{window.location.href = redirectionUrl})

        setTimeout(()=>{
          setloader(false)
          window.location.href = redirectionUrl
        },2000)
       
    } catch (err) {
      setloader(false)
      if (err) {
        // Vérifie si err est un objet et contient 'response'
        if (err.response) {
            // Vérifie si la réponse contient un message d'erreur
            if (err.response.data && err.response.data.message) {
              
                toast.error(err.response.data.message);
              
                 // Affiche le message d'erreur du backend
            } else {
                toast.error("Erreur inattendue côté serveur.");
            }
        } else if (err.request) {
            // Si aucune réponse du serveur
            toast.error("Impossible de joindre le serveur. Vérifiez votre connexion.");
        } else {
            // Pour toute autre erreur imprévue
            toast.error("Une erreur inconnue s'est produite.");
            console.error("Erreur inconnue :", err);
        }
    } else {
        toast.error("Une erreur inconnue s'est produite.");
        console.error("Erreur :", err);
    }

    }
};
  return (
    <div
      className="container-fluid page-body-wrapper full-page-wrapper"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: "url('/pouleflou.jpg')", // Image de fond générale
        backgroundSize: "cover",
        backgroundPosition: "center",
        // Effet de flou pour l'arrière-plan
      }}
    >
      <div
        className="row w-80 mx-0"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
          height: "80%",
          borderRadius: "20px",
          overflow: "hidden",
          backgroundColor: "white",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Section Image */}
        <div
          className="col-lg-6"
          style={{
            backgroundImage: "url('/poule.jpg')", // Remplacez avec l'URL correcte.
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "20px",
            color: "white",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontWeight: "bold",
              fontSize: "32px",
              marginBottom: "20px",
            }}
            className="typing-effect h1-delay"
          >
            Gérer votre ferme avec Matou
          </h1>
          <p style={{ fontSize: "16px", lineHeight: "1.5",display: "inline-block", }} className="typing-effect p-delay">
            "Optimisez la gestion de votre ferme et Simplifiez vos taches quoitidiennes"
           
           
          </p>
        </div>

        {/* Section Formulaire */}
        <div className="col-lg-6 d-flex justify-content-center align-items-center">
          <div
            className="auth-form-light text-left py-5 px-4 px-sm-5"
            style={{
              width: "100%",
              maxWidth: "400px",
              padding: "40px",
            }}
          >
            <h4>Content de vous revoir!</h4>
            <h6 className="font-weight-light">Connectez-vous pour continuer.</h6>
            <form className="pt-3" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Nom Utilisateur"
                  value={nomUtilisateur}
                  onChange={(e) => setnomUtilisateur(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Mot de passe"
                  value={MotDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  required
                />
              </div>
              <div className="mb-2">
                <button
                  type="submit"
                  className="btn btn-block"
                  style={{
                    backgroundColor: "#392CCD",
                    color: "white",
                    borderRadius: "5px",
                  }}
                  disabled={looader}
                >
                  {looader ? <div className='spinner'></div>:
                      <span>Connecter</span>  
                  }
                  
                </button>
              </div>
              
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login