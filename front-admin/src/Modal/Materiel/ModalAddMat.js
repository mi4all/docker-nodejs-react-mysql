import axios from 'axios';
import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

function ModalAddMat() {
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [designation, setdesignation] = useState('');
    const [unite, setunite] = useState('');
    const [quantite, setquantite] = useState('');
    const [prixUnitaire, setprixUnitaire] = useState('');
    
    //controlleur input
    const [designationTouched, setdesignationTouched] = useState(false);
    const [uniteTouched, setuniteTouched] = useState(false);
    const [quantiteTouched, setquantiteTouched] = useState(false);
    const [prixUnitaireTouched, setprixUnitaireTouched] = useState(false);
  
   

    const [designationError, setdesignationError] = useState(false);
    const [uniteError, setuniteError] = useState(false);
    const [quantiteError, setquantiteError] = useState(false);
    const [prixUnitaireError, setprixUnitaireError] = useState(false);



    //click sur l'input
    const handledesignationBlur = () => {
        setdesignationTouched(true);
        if (designation.trim() === '') {
            setdesignationError(true);
        } else {
            setdesignationError(false);
        }
    };

    const handleuniteBlur = () => {
        setuniteTouched(true);
        if (unite.trim() === '') {
            setuniteError(true);
        } else {
            setuniteError(false);
        }
    };
    const handlequantiteBlur = () => {
        setquantiteTouched(true);
        if (quantite.trim() === '') {
            setquantiteError(true);
        } else {
            setquantiteError(false);
        }
    };
    const handleprixUnitaire = () => {
        setprixUnitaireTouched(true);
        if (quantite.trim() === '') {
            setprixUnitaireError(true);
        } else {
            setprixUnitaireError(false);
        }
    };
 //virification si tous les champs est remplir
 const isFormValid = designation.trim() !== '' && unite.trim() !== ''  && quantite.trim() !== ''
  && prixUnitaire.trim() !== '';

 const handleSubmit = async (e)=>{
    e.preventDefault();


    try {
      const reponse = await axios.post('http://localhost:4000/api/materiel/ajout', {
        designation,
        unite,
        quantite,
        prixUnitaire
       
       
      })

      console.log(reponse)
     
      if(reponse.status === 200){
        setdesignation('')
        setunite('')
        setquantite('')
        setprixUnitaire('')
       
        
      
        handleClose()
        
        toast.success('ajout avec succes')
        setTimeout(()=>{
          window.location.reload();
        },1000)
      
       
      }
    } catch (error) {
      console.error('tsy mety')
    }
   
    
}
    
  return (
    <> 
     <Button type="button" className="btn btn-secondary " onClick={handleShow}>Ajouter</Button>
        <Modal show={show} centered>
           
                <div className="card-body" >
                    <i 
                        className="settings-close typcn typcn-delete-outline"
                        style={{
                            marginLeft: "100%",
                            color: "red",
                            marginTop: "-20px" // Ajusté pour le positionnement
                        }} 
                        onClick={handleClose}
                    ></i>
                    <h4 className="card-title">Ajout du materiel</h4>
                    
                    <form className="forms-sample" onSubmit={handleSubmit}>
                        
                            <label>designation</label>
                            <input 
                                type="text" 
                                className={`form-control ${designationTouched && designationError ? 'is-invalid' : ''}`} 
                                id="exampleInputdesignation1" 
                                placeholder="designation..."
                                value={designation}
                                onChange={(e) => setdesignation(e.target.value)} // Mettre à jour l'état
                                onBlur={handledesignationBlur} // Vérifie la validité au blur
                            />
                            {designationTouched && designationError && (
                                <div className="invalid-feedback" style={{ color: 'red' }}>
                                    Veuillez saisir un designation.
                                </div>
                            )}
                             <br></br>
                        
                            <label>Unite</label>
                            <input 
                                type="text" 
                                className={`form-control ${uniteTouched && uniteError ? 'is-invalid' : ''}`} 
                                id="exampleInputnbrpoule1" 
                                placeholder="Unite ..."
                                value={unite}
                                onChange={(e) => setunite(e.target.value)} // Mettre à jour l'état
                                onBlur={handleuniteBlur} // Vérifie la validité au blur
                            />
                            {uniteTouched && uniteError && (
                                <div className="invalid-feedback" style={{ color: 'red' }}>
                                    Veuillez saisir Unite.
                                </div>
                            )}
                           <br></br>
                        
                            <label>quantite/piece</label>
                            <input 
                                type="text" 
                                className={`form-control ${quantiteTouched && quantiteError ? 'is-invalid' : ''}`} 
                                id="exampleInputUsername1" 
                                placeholder="quantite..."
                                value={quantite}
                                onChange={(e) => setquantite(e.target.value)} // Mettre à jour l'état
                                onBlur={handlequantiteBlur} // Vérifie la validité au blur
                            />
                            {quantiteTouched && quantiteError && (
                                <div className="invalid-feedback" style={{ color: 'red' }}>
                                    Veuillez saisir un quantite.
                                </div>
                            )}
                          <br></br>
                        
                            
                        
                            <label>prixUnitaire Ar</label>
                            <input 
                                type="text" 
                                className={`form-control ${prixUnitaireTouched && prixUnitaireError ? 'is-invalid' : ''}`} 
                                id="exampleInputUsername1" 
                                placeholder="prixUnitaire en Ar"
                                value={prixUnitaire}
                                onChange={(e) => setprixUnitaire(e.target.value)} // Mettre à jour l'état
                                onBlur={handleprixUnitaire} // Vérifie la validité au blur
                            />
                            {prixUnitaireTouched && prixUnitaireError && (
                                <div className="invalid-feedback" style={{ color: 'red' }}>
                                    Veuillez saisir un prixUnitaire.
                                </div>
                            )}
                          <br></br>
                         
                       
                        <Button 
                            type="submit" 
                            className="btn btn-secondary mr-2" 
                            disabled={!isFormValid} 
                            // onClick={onAddVaccine}
                        >
                            Sauvegarder
                        </Button> 
                        <Button className="btn btn-light" onClick={handleClose}>Retour</Button>
                    </form>
                </div>
           
        </Modal>
        </>
  )
}

export default ModalAddMat