import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const ModalMOdRation = ({Index}) => {
    const [quantiteInitial, setquantiteInitial] = useState(Index.quantiteInitial);
    const [utilise, setutilise] = useState(Index.nom);

    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
          const reponse = await axios.put(`http://backend:4000/api/Rations/Modifier/${Index.id}`,{
            quantiteInitial,
            utilise
           
           
          })

         
          
          if (reponse.status === 200) {
            console.log(reponse)
            handleClose();
     
            toast.success("Modification avec succes");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }else{
            console.error('erreur de la mis ajour')
          }
        } catch (error) {
          console.error('tsy mety:',error.data)
          
  
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
                   <h4 className="card-title">Modification du Quantite Initial</h4>
               
                   <form className="forms-sample" onSubmit={handleSubmit}>
                       <div className="form-group">
                           <label>Nom Ration</label>
                           <input 
                               type="text" 
                               className='form-control'  
                               id="exampleInputquantiteInitial1" 
                               placeholder="utilise"
                               value={utilise}
                               onChange={(e) => setutilise(e.target.value)} // Mettre à jour l'état
                          
                               required
                           />
                          
                       </div>
                       <div className="form-group">
                           <label>quantiteInitial</label>
                           <input 
                               type="text" 
                               className='form-control'  
                               id="exampleInputquantiteInitial1" 
                               placeholder="quantiteInitial"
                               value={quantiteInitial}
                               onChange={(e) => setquantiteInitial(e.target.value)} // Mettre à jour l'état
                          
                               required
                           />
                          
                       </div>
                      
                      
                       <Button 
                           type="submit" 
                           className="btn btn-secondary mr-2" 
                           
                           
                       >
                           Submit
                       </Button> 
                       <Button className="btn btn-light" onClick={handleClose}>Retour</Button>
                   </form>
               </div>
           </div>
       </Modal>
       </>
  )
}

export default ModalMOdRation