import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ModalModMaladie = ({Index}) => {
    const [nom_maladies, setnom_maladies] = useState(Index.nom_maladies);
    const [symptomes, setsymptomes] = useState(Index.symptomes);
    const [traitements, settraitements] = useState(Index.traitements);
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
          const reponse = await axios.put(`http://localhost:4000/api/maladies/Modifier/${Index.id}`,{
            nom_maladies,
            symptomes,
            traitements
            
          })
          console.log(reponse)
          if (reponse) {
           
          
            handleClose()
            
            toast.success('Modification avec succes')
            setTimeout(()=>{
              window.location.reload();
            },1000)
          }
        } catch (error) {
          console.error('tsy mety:',error)
          
  
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
                   <h4 className="card-title">Modification du maladie</h4>
                   <p className="card-description">Basic form layout</p>
                   <form className="forms-sample" onSubmit={handleSubmit}>
                       <div className="form-group">
                           <label>Nom du Maladie</label>
                           <input 
                               type="text" 
                               className='form-control'  
                               id="exampleInputnom_maladies1" 
                               placeholder="Nom du maladie"
                               value={nom_maladies}
                               onChange={(e) => setnom_maladies(e.target.value)} // Mettre à jour l'état
                          
                               required
                           />
                          
                       </div>
                       <div className="form-group">
                           <label>symptome du maladie</label>
                           <input 
                               type="text" 
                               className='form-control'
                               id="exampleInputnom_maladies1" 
                               placeholder="Nom du symptome"
                               value={symptomes}
                               onChange={(e) => setsymptomes(e.target.value)} // Mettre à jour l'état
                              // Vérifie la validité au blur
                              required
                           />
                          
                       </div>
                       <div className="form-group">
                           <label>traitement</label>
                           <input 
                               type="text" 
                               className='form-control'
                               id="exampleInputnom_maladies1" 
                               placeholder="Nom du traitements"
                               value={traitements}
                               onChange={(e) => settraitements(e.target.value)} // Mettre à jour l'état
                            required
                           />
                           
                       </div>
                       <Button 
                           type="submit" 
                           className="btn btn-secondary mr-2" 
                          
                           
                       >
                           Modifier
                       </Button> 
                       <Button className="btn btn-light" onClick={handleClose}>Retour</Button>
                   </form>
               </div>
           </div>
       </Modal>
       </>
  )
}

export default ModalModMaladie