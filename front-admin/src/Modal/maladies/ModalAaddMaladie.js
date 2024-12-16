import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ModalAaddMaladie = () => {
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [nom_maladies, setnom_maladies] = useState('');
    const [symptomes, setsymptomes] = useState('');
    const [traitements, settraitements] = useState('');
    const [nom_maladiesTouched, setnom_maladiesTouched] = useState(false);
    const [traitementsTouched, settraitementsTouched] = useState(false);
    const [symptomesTouched, setsymptomesTouched] = useState(false);
    const [nom_maladiesError, setnom_maladiesError] = useState(false);
    const [symptomesError, setsymptomesError] = useState(false);
    const [traitementsError, settraitementsError] = useState(false);

    const handlenom_maladiesBlur = () => {
        setnom_maladiesTouched(true);
        // Vérifie si le champ est vide ou contient seulement des espaces
        if (nom_maladies.trim() === '') {
            setnom_maladiesError(true);
        } else {
            setnom_maladiesError(false);
        }
    };

    const handlesymptomesBlur = () => {
        setsymptomesTouched(true);
        // Vérifie si le champ est vide
        if (symptomes === '') {
            setsymptomesError(true);
        } else {
            setsymptomesError(false);
        }
    };
    const handletraitementsBlur = () => {
        settraitementsTouched(true);
        // Vérifie si le champ est vide
        if (traitements === '') {
            settraitementsError(true);
        } else {
            settraitementsError(false);
        }
    };


    
    const handleSubmit = async (e)=>{
        e.preventDefault();
  
  
        try {
          const reponse = await axios.post('http://localhost:4000/api/Maladies/ajout', {
            nom_maladies,
            symptomes,
            traitements,
           
           
          
          })
          console.log(reponse)
         
          if(reponse.status === 200){
            setShow(false);
            setnom_maladies(""); 
            setsymptomes("");
            settraitements('') 
            setnom_maladiesTouched(false); 
            setsymptomesTouched(false); 
            setnom_maladiesError(false); 
            setsymptomesError(false); 
            settraitementsTouched(false); 
            settraitementsError(false);
            handleClose();

            toast.success("ajout avec succes");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        } catch (error) {
          console.error('tsy mety:',error)
        }
       
        
    }

    const isFormValid = nom_maladies.trim() !== '' && symptomes !== ''&& traitements !== '';
  return (
    <> 
    <Button symptomes="button" className="btn btn-secondary " onClick={handleShow}>Ajouter</Button>
       <Modal show={show}>
           <div className="card">
               <div className="card-body">
                   <i 
                       className="settings-close typcn typcn-delete-outline"
                       style={{
                           marginLeft: "100%",
                           color: "red",
                           marginTop: "-20px" // Ajusté pour le positionnement
                       }} 
                       onClick={handleClose}
                   ></i>
                   <h4 className="card-title">Ajout du vaccin</h4>
                   {/* <p className="card-description">Basic form layout</p> */}
                   <form className="forms-sample" onSubmit={handleSubmit}>
                       <div className="form-group">
                           <label>Nom du Maladie</label>
                           <input 
                               symptomes="text" 
                               className={`form-control ${nom_maladiesTouched && nom_maladiesError ? 'is-invalid' : ''}`} 
                               id="exampleInputnom_maladies1" 
                               placeholder="Nom du maladie"
                               value={nom_maladies}
                               onChange={(e) => setnom_maladies(e.target.value)} // Mettre à jour l'état
                               onBlur={handlenom_maladiesBlur} // Vérifie la validité au blur
                           />
                           {nom_maladiesTouched && nom_maladiesError && (
                               <div className="invalid-feedback" style={{ color: 'red' }}>
                                   Veuillez saisir un nom de maladie.
                               </div>
                           )}
                       </div>
                       <div className="form-group">
                           <label>symptome du maladie</label>
                           <input 
                               symptomes="text" 
                               className={`form-control ${symptomesTouched && symptomesError ? 'is-invalid' : ''}`} 
                               id="exampleInputnom_maladies1" 
                               placeholder="Nom du symptome"
                               value={symptomes}
                               onChange={(e) => setsymptomes(e.target.value)} // Mettre à jour l'état
                               onBlur={handlesymptomesBlur} // Vérifie la validité au blur
                           />
                           {symptomesTouched && symptomesError && (
                               <div className="invalid-feedback" style={{ color: 'red' }}>
                                   Veuillez saisir un symptome.
                               </div>
                           )}
                       </div>
                       <div className="form-group">
                           <label>traitement</label>
                           <input 
                               symptomes="text" 
                               className={`form-control ${traitementsTouched && traitementsError ? 'is-invalid' : ''}`} 
                               id="exampleInputnom_maladies1" 
                               placeholder="Nom du traitements"
                               value={traitements}
                               onChange={(e) => settraitements(e.target.value)} // Mettre à jour l'état
                               onBlur={handletraitementsBlur} // Vérifie la validité au blur
                           />
                           {traitementsTouched && traitementsError && (
                               <div className="invalid-feedback" style={{ color: 'red' }}>
                                   Veuillez saisir un traitement.
                               </div>
                           )}
                       </div>
                       <Button 
                           type="submit" 
                           className="btn btn-secondary mr-2" 
                           disabled={!isFormValid} 
                           
                       >
                           Sauvegarder
                       </Button> 
                       <Button className="btn btn-light" onClick={handleClose}>Retour</Button>
                   </form>
               </div>
           </div>
       </Modal>
       </>
  )
}

export default ModalAaddMaladie