import axios from 'axios';
import React, { useEffect, useState }  from 'react'
import {Button, Modal} from "react-bootstrap";
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';


function ModalAddVide() {
    const [show,setShow] = useState(false);
    const [nom_employer,setnom_employer] = useState('')
    const [salle,setsalle] = useState([])
    const [idsal,setidsal]=useState('')
  
    const [date_debut,setdate_debut] = useState('')
    const [date_fin,setdate_fin] = useState('')
    const [nom_employerTouched,setNomnom_employerTouched] = useState(false)
    const [nom_employerError,setnom_employerError] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const navigate = useNavigate()

    const handleUsernameBlur = () => {
      setNomnom_employerTouched(true);
      // Vérifie si le champ est vide ou contient seulement des espaces
      if (nom_employer.trim() === '') {
          setnom_employerError(true);
      } else {
          setnom_employerError(false);
      }
  };

  const handleSubmit = async (e)=>{
      e.preventDefault();


      try {
        const reponse = await axios.post('http://backend:4000/api/vide_sanitaire/ajout', {
          idsal,
          nom_employer,
          date_debut,
          date_fin,
         
        
        })
        console.log(reponse)
       
        if(reponse.status === 200){
          setnom_employer('')
          setidsal('')
          setdate_debut('')
          setdate_fin('')
          
        
          handleClose()
          
          toast.success('ajout avec succes')
          setTimeout(()=>{
            window.location.reload();
          },1000)
        
         
        }
      } catch (error) {
        console.error('tsy mety:',error)
      }
     
      
  }

  useEffect(()=>{
   
    fetchSalle()
  },[])


  const fetchSalle = async () =>{
    try {
      const reponse = await axios.get('http://backend:4000/api/vide_sanitaire/comboMat');
     setsalle(reponse.data)
     
    
    } catch (error) {
      console.log(error.data)
    }
    
   
  }



    const isFormValid = nom_employer.trim() !== '' && salle !== '' && date_fin !=='' && date_debut !=='';
  return (
    <>
      <Button type="button" className="btn btn-secondary " onClick={handleShow}>
        Ajouter
      </Button>

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
            <h4 className="card-title">Entretien du Salle</h4>
            <form className="forms-sample" onSubmit={handleSubmit}>
              <div className="form-group">
                <label for="exampleInputUsername1">Nom salle</label>
                <input
                  type="text"
                  className={`form-control  form-control-sm ${
                    nom_employerTouched && nom_employerError ? "is-invalid" : ""
                  }`}
                  id="exampleInputUsername1"
                  placeholder="Nom Employer"
                  value={nom_employer}
                  onChange={(e) => setnom_employer(e.target.value)} // Mettre à jour l'état
                  onBlur={handleUsernameBlur}
                  required
                />
                {nom_employerTouched && nom_employerError && (
                  <div className="invalid-feedback" style={{ color: "red" }}>
                    Veuillez saisir un nom d'employer.
                  </div>
                )}
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
                  <option value="">Choisissez un salle</option>
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
                disabled={!isFormValid}
              >
                Sauvegarder
              </button>
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

export default ModalAddVide