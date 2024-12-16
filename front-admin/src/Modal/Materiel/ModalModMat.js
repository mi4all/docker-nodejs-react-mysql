import axios from 'axios';
import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

function ModalModMat({Index}) {
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [designation, setdesignation] = useState(Index.designation);
    const [unite, setunite] = useState(Index.unite);
    const [quantite, setquantite] = useState(Index.quantite);
    const [prixUnitaire, setprixUnitaire] = useState(Index.prixUnitaire);
    
    




    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const reponse = await axios.put(
            `http://localhost:4000/api/materiel/Modifier/${Index.id}`,
            {
             designation,
             unite,
             quantite,
             prixUnitaire,
            }
          );
          if (reponse) {
            handleClose();
     
            toast.success("Modification avec succes");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        } catch (error) {
          console.error("tsy mety:", error);
        }
      };
    
  return (
    <> 
  <button type="button"
       className="btn  btn-sm btn-move"
       onClick={handleShow}
       style={{height:10,color:'blue',}}
      
       >
        <i class="typcn typcn-edit"></i>
      </button>
        <Modal show={show}>
           
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
                    <h4 className="card-title">Ajout du Caractere</h4>
                    
                    <form className="forms-sample" onSubmit={handleSubmit}>
                        
                            <label>designation</label>
                            <input 
                                type="text" 
                                className='form-control'  
                                id="exampleInputdesignation1" 
                                placeholder="designation..."
                                value={designation}
                                onChange={(e) => setdesignation(e.target.value)} // Mettre à jour l'état
                               
                            />
                           
                             <br></br>
                        
                            <label>Unite</label>
                            <input 
                                type="text" 
                                className='form-control '
                                id="exampleInputnbrpoule1" 
                                placeholder="Unite..."
                                value={unite}
                                onChange={(e) => setunite(e.target.value)} // Mettre à jour l'état
                                
                            />
                           
                           <br></br>
                        
                            <label>quantite/piece</label>
                            <input 
                                type="text" 
                                className='form-control'  
                                id="exampleInputUsername1" 
                                placeholder="quantite..."
                                value={quantite}
                                onChange={(e) => setquantite(e.target.value)} // Mettre à jour l'état
                               
                            />
                           
                          <br></br>
                        
                            
                        
                            <label>prixUnitaire Ar</label>
                            <input 
                                type="text" 
                                className='form-control'
                                id="exampleInputUsername1" 
                                placeholder="prixUnitaire en Ar"
                                value={prixUnitaire}
                                onChange={(e) => setprixUnitaire(e.target.value)} // Mettre à jour l'état
                                
                            />
                            
                          <br></br>
                         
                       
                        <Button 
                            type="submit" 
                            className="btn btn-secondary mr-2" 
                            
                           
                        >
                            Modifier
                        </Button> 
                        <Button className="btn btn-light" onClick={handleClose}>Retour</Button>
                    </form>
                </div>
           
        </Modal>
        </>
  )
}

export default ModalModMat