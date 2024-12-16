import axios from 'axios';
import React, { useEffect, useState }  from 'react'
import {Button, Modal} from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';


function ModalModVide({Index}) {
    const [show,setShow] = useState(false);
    const [nom_employer,setnom_employer] = useState(Index.nom_employer)
    const [salle,setsalle] = useState([])
    const [idsal,setidsal]=useState(Index.idSal)
  
    const [date_debut,setdate_debut] = useState(Index.date_debut)
    const [date_fin,setdate_fin] = useState(Index.date_fin)
  
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
  

   

    const handleSubmit = async(e)=>{
        e.preventDefault()
        try {
          const reponse = await axios.put(`http://backend:4000/api/vide_sanitaire/Modifier/${Index.id}`,{
            idsal,
            nom_employer,
            date_debut,
            date_fin
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

  useEffect(()=>{
   
    fetchModeSalle()
  },[])


  const fetchModeSalle = async () =>{
    const reponse = await axios.get('http://backend:4000/api/vide_sanitaire/comboModSalle');
    setsalle(reponse.data)
   
  }



    
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
        <div className="card">
          <div className="card-body">
            <i
              className="settings-close typcn typcn-delete-outline"
              style={{
                marginLeft: "100%",
                color: "red",
                marginTop: "100%",
              }}
              onClick={handleClose}
            ></i>
            <h4 className="card-title">Ajout du vaccin</h4>
            <p className="card-description">Basic form layout</p>
            <form className="forms-sample" onSubmit={handleSubmit}>
              <div className="form-group">
                <label for="exampleInputUsername1">Nom salle</label>
                <input
                  type="text"
                  className='form-control  form-control-sm' 
                  id="exampleInputUsername1"
                  placeholder="Username"
                  value={nom_employer}
                  onChange={(e) => setnom_employer(e.target.value)} // Mettre à jour l'état
                  
                  required
                />
                
              </div>
              <div className="form-group">
                <label for="exampleInputEmail1">Materiel</label>
                <select
                  className="form-control form-control-lg"
                  id="eventTitle"
                  value={idsal}
                  onChange={(e)=> setidsal(e.target.value)}
                  name='salle'
                  required
                 
                >
                  <option key={Index.idSal} value={Index.idSal}>{Index.nom}</option>
                  {salle.map((item)=>( 
                  <option  key={item.id} value={item.id}>{item.nom}
                  </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label for="exampleInputUsername1">Date du debut</label>
                <input
                  type="date"
                  className='form-control  form-control-sm '
                  id="exampleInputUsername1"
                  value={date_debut}
                  onChange={(e) => setdate_debut(e.target.value)} // Mettre à jour l'état
                  required
                />
              </div>
              <div className="form-group">
                <label for="exampleInputUsername1">Date du fin</label>
                <input
                  type="date"
                  className='form-control  form-control-sm '
                  id="exampleInputUsername1"
                  value={date_fin}
                  onChange={(e) => setdate_fin(e.target.value)} // Mettre à jour l'état
                  required
                />
              </div>
             
              

              
             

              <button
                type="submit"
                className="btn btn-secondary mr-2"
                
              >
                Submit
              </button>
              <Button className="btn btn-light" onClick={handleClose}>
                Cancel
              </Button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ModalModVide