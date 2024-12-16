import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';


const ModalAaddPMald = () => {
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const[entre,setentre]=useState([])
    const[symptome,setsymptome]=useState([])
    const [idPoules,setidPoules] = useState('')
    const [idMaladie,setidMaladie] = useState('')
    const [DateTrouve,setDateTrouve]=useState('')
    const [nombrePoule,setnombrePoule]=useState('')
    const [loading,setloading]=useState(true)
   
    useEffect(()=>{
      const fecthDate = async () =>{
        try {
          const reponse = await axios.get('http://localhost:4000/fotoana');
          if (reponse.data.length > 0) {
            setentre(reponse.data)
              console.log('date',reponse.data)
          }
        } catch (error) {
          console.error('erreur recuperationn date',error)
        }finally{
          setloading(false)
        }
        
      }


      const fetchSymptome = async () =>{
        try {
          const reponse = await axios.get('http://localhost:4000/aretina');
          if (reponse.data.length > 0) {
            setsymptome(reponse.data)
            console.log('symptome',reponse.data)
          }
        } catch (error) {
          console.error('erreur recuperationn date',error)
        }finally{
          setloading(false)
        }
        
      }
      fecthDate()
      fetchSymptome()
    
      },[])

  

     
      
    
    

    


      const handleSubmit = async (e)=>{
        e.preventDefault();
  
  
        try {
          const reponse = await axios.post('http://localhost:4000/xxxx', {
            idMaladie,
            idPoules,
            DateTrouve,
            nombrePoule
           
           
          
          })
          console.log(reponse)
         
          
            setShow(false);
            setentre('')
            setnombrePoule('')
            setsymptome('')
            setDateTrouve('')

            toast.success("ajout avec succes");
            setTimeout(() => {
              window.location.reload();
            }, 1000);
        
        } catch (error) {
          console.error('tsy mety:',error)
        }
       
        
    }
    console.log(entre)
    console.log(symptome)

  
  return (
    <>
      <Button
        symptomes="button"
        className="btn btn-secondary "
        onClick={handleShow}
      >
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
                marginTop: "-20px", // Ajusté pour le positionnement
              }}
              onClick={handleClose}
            ></i>
            <h4 className="card-title">Ajout du Poule Malade</h4>
          
            <form className="forms-sample" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Date d'entre du poule</label>
                <select
                  className="form-control form-control-lg"
                  id="eventTitle"
                  value={idPoules}
                  onChange={(e) => setidPoules(e.target.value)}
                  name="idPoules"
                  required
                >
                  <option value="">Choisissez un Date</option>
                     {!loading && Array.isArray(entre) && entre.map((poule) => (
                    <option key={poule.id} value={poule.id}>
                      {new Date(poule.date_entre).toLocaleDateString('fr-CA')}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Symptome</label>
                <select
                  className="form-control form-control-lg"
                  id="eventTitle"
                  value={idMaladie}
                  onChange={(e) => setidMaladie(e.target.value)}
                  name="idMaladie"
                  required
                >
                  <option value="">Choisissez une Symptome</option>
                  {!loading && Array.isArray(symptome) && symptome.map((maladie) => (
                    <option key={maladie.id} value={maladie.id}>
                      {maladie.symptomes}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Nombre des poules Malade</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputnom_maladies1"
                  placeholder="Nom du nobmre poule malde"
                  value={nombrePoule}
                  onChange={(e) => setnombrePoule(e.target.value)}
                required
                nombrePoule
                />
              </div>
              <div className="form-group">
                <label>Date de troube</label>
                <input
                  type="date"
                  className="form-control"
                  id="exampleInputnom_maladies1"
                
                  value={DateTrouve}
                  onChange={(e) => setDateTrouve(e.target.value)}
                
                  required
                />
              </div>
              <Button
                type="submit"
                className="btn btn-secondary mr-2"
                
              >
                Submit
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

export default ModalAaddPMald