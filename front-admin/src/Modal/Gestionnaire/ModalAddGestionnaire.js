import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ModalAddGestionnaire = () => {
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [nomUtilisateur, setnomUtilisateur] = useState('');
    const [MotDePasse, setMotDePasse] = useState('');
    const [email, setemail] = useState('');
    const [isAdmin, setisAdmin] = useState('');
    const [NomComplet, setNomComplet] = useState('');
    const [error,seterror]=useState([])

    
   

   


    
    const handleSubmit = async (e)=>{
        e.preventDefault();
  
  
        try {
          const reponse = await axios.post('http://localhost:4000/api/utilisateur/ajout', {
            nomUtilisateur,
            MotDePasse,
            email,
            isAdmin,
            NomComplet
           
          })
          console.log(reponse.data)
        
          if(reponse.status === 200){
            setShow(false);
            setnomUtilisateur(""); 
            setMotDePasse("");
            setemail('') 
            handleClose();

            toast.success("ajout avec succes");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }

        } catch (error) {
            if (error.response) {
                // Gestion des erreurs du backend
                const { message, fields } = error.response.data;
    
                if (fields) {
                    fields.forEach(field => {
                        toast.error(`Erreur : ${field} existe déjà`);
                    });
                } else {
                    toast.error(message || "Une erreur s'est produite");
                }
            } else {
                console.error('Erreur:', error);
                toast.error("Erreur réseau ou serveur");
            }
        }
       
        
    }


  return (
    <>
      <Button
        type="button"
        className="btn btn-secondary "
        onClick={handleShow}
      >
        Ajouter
      </Button>
      <Modal show={show} centered>
        <div className="card">
          <div className="card-body">
            <i
              className="settings-close typcn typcn-delete-outline"
              style={{
                marginLeft: "100%",
                color: "red",
                marginTop: "-20px", // Ajusté pour le positionnement
              }}
              onClick={handleClose}
            ></i>
            <h4 className="card-title">Modification du Gestionnaire</h4>
            {/* <p className="card-description">Basic form layout</p> */}
            <form className="forms-sample" onSubmit={handleSubmit}>
              <label>Nom d'utilsateur</label>
              <input
                type="text"
                className="form-control"
                id="nomUtilisateur1"
                placeholder="Nom d'utilsateur..."
                value={nomUtilisateur}
                onChange={(e) => setnomUtilisateur(e.target.value)} // Mettre à jour l'état
              />
               <br></br>
              <label>mot de passe</label>
              <input
                type="password"
                className="form-control"
                id="passe"
                placeholder="Nom du symptome"
                value={MotDePasse}
                onChange={(e) => setMotDePasse(e.target.value)} // Mettre à jour l'état
              />
              <br></br>
              <label>email</label>
              <input
                type="email"
                className="form-control"
                id="mail"
                placeholder="Nom du email"
                value={email}
                onChange={(e) => setemail(e.target.value)} // Mettre à jour l'état
             
              />
                <br></br>
              <label htmlFor="Email1">Role</label>
              <select
                className='form-control form-control-lg' 
                
                id="eventTitle"
                value={isAdmin}
                onChange={(e) => setisAdmin(e.target.value)} // Mettre à jour l'état
               
              >
                <option value="">Choisissez un role</option>
                <option value={1}>Admistarteur </option>
                <option value={0}>Gestionnaire</option>
              </select>
              <br></br>
              <label>Nom complet</label>
              <input
                type="text"
                className="form-control"
                id="comple"
                placeholder="Nom complet"
                value={NomComplet}
                onChange={(e) => setNomComplet(e.target.value)} // Mettre à jour l'état
                
              />
              <br></br>
              <Button
                type="submit"
                className="btn btn-secondary mr-2"
                
              >
                Sauvegarder
              </Button>
              <Button className="btn btn-light" onClick={handleClose}>
                Retour
              </Button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ModalAddGestionnaire