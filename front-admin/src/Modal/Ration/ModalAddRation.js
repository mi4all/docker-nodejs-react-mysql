import axios from 'axios';
import React, {  useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ModalAddRation = () => {
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [NomRation, setNomRation] = useState('');
    const [quantite_initial, setquantite_initial] = useState('');
    const [quantite_restant, setquantite_restant] = useState('');
    const [NomRationTouched, setNomRationTouched] = useState(false);

    const [quantite_initialTouched, setquantite_initialTouched] = useState(false);
    const [NomRationError, setNomRationError] = useState(false);
    const [quantite_initialError, setquantite_initialError] = useState(false);
   

    const handleNomRationBlur = () => {
        setNomRationTouched(true);
        // Vérifie si le champ est vide ou contient seulement des espaces
        if (NomRation.trim() === '') {
            setNomRationError(true);
        } else {
            setNomRationError(false);
        }
    };

    const handlequantite_initialBlur = () => {
        setquantite_initialTouched(true);
        // Vérifie si le champ est vide
        if (quantite_initial === '') {
            setquantite_initialError(true);
        } else {
            setquantite_initialError(false);
        }
    };
    


    
    const handleSubmit = async (e)=>{
        e.preventDefault();
  
  
        try {
          const reponse = await axios.post('http://localhost:4000/api/Rations/ajout', {
            NomRation,
            quantite_initial,
            quantite_restant,
           
           
          
          })
          console.log(reponse)
         
          if(reponse.status === 200){
            setShow(false);
            setNomRation(""); 
            setquantite_initial("");
            setquantite_restant('') 
            setNomRationTouched(false); 
            setquantite_initialTouched(false); 
            setNomRationError(false); 
            setquantite_initialError(false); 
          
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

    const isFormValid = NomRation.trim() !== '' && quantite_initial !== '';
  return (
    <> 
    <Button quantite_initial="button" className="btn btn-secondary " onClick={handleShow}>Ajouter</Button>
       <Modal show={show} centered>
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
                   <h4 className="card-title">Ajout du Ration</h4>
                   {/* <p className="card-description">Basic form layout</p> */}
                   <form className="forms-sample" onSubmit={handleSubmit}>
                       <div className="form-group">
                           <label>Nom du Ration</label>
                           <input 
                               quantite_initial="text" 
                               className={`form-control ${NomRationTouched && NomRationError ? 'is-invalid' : ''}`} 
                               id="exampleInputNomRation1" 
                               placeholder="Nom du ration"
                               value={NomRation}
                               onChange={(e) => setNomRation(e.target.value)} // Mettre à jour l'état
                               onBlur={handleNomRationBlur} // Vérifie la validité au blur
                           />
                           {NomRationTouched && NomRationError && (
                               <div className="invalid-feedback" style={{ color: 'red' }}>
                                   Veuillez saisir un nom de ration.
                               </div>
                           )}
                       </div>
                       <div className="form-group">
                           <label>quantite_initial(g)</label>
                           <input 
                               quantite_initial="text" 
                               className={`form-control ${quantite_initialTouched && quantite_initialError ? 'is-invalid' : ''}`} 
                               id="exampleInputNomRation1" 
                               placeholder="quantite_initial/g"
                               value={quantite_initial}
                               onChange={(e) => setquantite_initial(e.target.value)} // Mettre à jour l'état
                               onBlur={handlequantite_initialBlur} // Vérifie la validité au blur
                           />
                           {quantite_initialTouched && quantite_initialError && (
                               <div className="invalid-feedback" style={{ color: 'red' }}>
                                   Veuillez saisir un symptome.
                               </div>
                           )}
                       </div>
                       <div className="form-group">
                           <label>Quantite_Restant(g)</label>
                           <input 
                               quantite_initial="text" 
                               className='form-control' 
                               id="exampleInputNomRation1" 
                               placeholder="Quantite_restant/g"
                               value={quantite_initial}
                               onChange={(e) => setquantite_initial(e.target.value)} // Mettre à jour l'état
                              // Vérifie la validité au blur
                           />
                          
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

export default ModalAddRation