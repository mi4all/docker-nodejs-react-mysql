import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ModalModGestionnaire = ({Index}) => {
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [nomUtilisateur, setnomUtilisateur] = useState(Index.nomUtilisateur);
    const [MotDePasse, setMotDePasse] = useState('');
    const [email, setemail] = useState(Index.email);
    const [isAdmin, setisAdmin] = useState(Index.isAdmin);
    const [NomComplet, setNomComplet] = useState(Index.NomComplet);
    

    
   

   


    
    const handleSubmit = async (e)=>{
        e.preventDefault();
  
  
        try {
          const reponse = await axios.put(`http://localhost:4000/api/utilisateur/Modifier/${Index.idGestionnaire}`, {
            nomUtilisateur,
            email,
            isAdmin,
            NomComplet
           
          })
          console.log(reponse.data)
        
          if(reponse.status === 200){
            setShow(false);
            setnomUtilisateur(""); 
            setemail('') 
            handleClose();

            toast.success("ajout avec succes");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }

        } catch (error) {
           
                console.error('erreur:',error)
        }
       
        
    }


  return (
    <>
      <button
        type="button"
        className="btn  btn-sm btn-move"
        onClick={handleShow}
        style={{ height: 10, color: "blue" }}
      >
        <i class="typcn typcn-edit"></i>
      </button>
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
            <h4 className="card-title">Ajout du Gestionnaire</h4>
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
                className="form-control form-control-lg"
                id="eventTitle"
                value={isAdmin}
                onChange={(e) => setisAdmin(e.target.value)} // Mettre à jour l'état
              >
                <option value={Index.isAdmin}>
                  {Index.isAdmin === 1 ? "Administrateur" : "Gestionnaire"}
                </option>
                <option value={1}>Administrateur </option>
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
              <Button type="submit" className="btn btn-secondary mr-2">
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

export default ModalModGestionnaire