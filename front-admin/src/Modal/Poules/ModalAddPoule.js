import axios from 'axios';
import React, {  useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const ModalAddPoule = () => {
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [categorie,setcategorie]=useState('')
    const [consomation,setconsomation]=useState('')
    const [NombrePoule,setNombrePoule]=useState('')
    const [idRations,setidRations]=useState('')
    const [idSalle,setidSalle]=useState('')
    const [NomRation,setNomRation]=useState([])
    const [idProgramme,setidProgramme]=useState('')
    const [nomProgramme,setnomProgramme]=useState([])
    const [salle,setsalle]=useState([])
    const [Alert,setAlert]=useState({})
    const [id,setid]=useState(null)
    // const [notification,setnotification]=useState([])
   
    // const [notificationCount,setnotificationCount]=useState([])
   
    
    const [loading,setloading]=useState(true)
   
   
  

    useEffect(()=>{
      
        
          fecthnomSalle()
          fecthNomRation()
          fecthNomProgramme()
        
    },[])


   
   

    const fecthNomRation = async () =>{
        const reponse = await axios.get('http://localhost:4000/api/Poules/NomRations');
        setNomRation(reponse.data)
      }
      const fecthnomSalle= async () =>{
        try {
            const reponse = await axios.get('http://localhost:4000/api/Poules/ComboSalle');
            if (reponse.data.length > 0) {
                setsalle(reponse.data)  
            }
            
        } catch (error) {
            console.error('erreur recuperationn date',error) 
        }finally{
            setloading(false)
          }
       
      
      }

      const fecthNomProgramme= async () =>{
        const reponse = await axios.get('http://localhost:4000/api/Poules/NomProgramme');
        setnomProgramme(reponse.data)
      }


      
  const handleSubmit = async (e)=>{
    e.preventDefault();


    try {

        const valiny = await axios.get('http://localhost:4000/api/Poules/ration')
        const stock = valiny.data
        
        
            const quantiteUtilise =NombrePoule*consomation
          

               for (const ration of valiny.data){
                if (ration.quantite_restant < quantiteUtilise) {
                    Swal.fire({
                        icon:'error',
                        title:'Stock insuffisant',
                        text:`La quantite restante pour ${ration.NomRation} est insuffisante pour ajouter ce poule`
                    })
                    return  
                }

               }
               
                
           
          
        
      const reponse = await axios.post('http://localhost:4000/api/Poules/ajout', {
        idRations,
        idSalle,
        categorie,
        consomation,
        NombrePoule,
        idProgramme
       
      
      })
      console.log(reponse.data)
      const pouleID=reponse.data.id
      console.log('id',pouleID)
      setid(pouleID)


      
     
    
      if(reponse.status === 200){
      
        addpouleID(pouleID)
        verificationProgramme(pouleID)
        setidSalle('')
        setidRations('')
        setcategorie('')
        
        setconsomation('')
        
      
        handleClose()
        
        toast.success('ajout avec succes')
        // setTimeout(()=>{
        //   window.location.reload();
        // },1000)
      
       
      }
    } catch (error) {
      console.error('tsy mety:',error)
    }   
}

const addpouleID = (pouleID)=>{
    let pouleIds = JSON.parse(localStorage.getItem('pouleIds')) || []
    if (!pouleIds.includes(pouleID)) {
        pouleIds.push(pouleID)
        localStorage.setItem('pouleIds', JSON.stringify(pouleIds))
    }

    verificationProgramme(pouleID)
}






    const verificationProgramme = async (pouleID) =>{
        console.log('ID TRANSMIT A LA VERIFICATION',pouleID)
        try {
            const reponse = await axios.get(`http://localhost:4000/api/Poules/verifier/${pouleID}`)
            console.log('reponse du backend:',reponse.data)
            const message = reponse.data.message
            
            if (message) {

                 const notification ={pouleID,message}
                

                const current =JSON.parse(localStorage.getItem('notification')) || []
                const updateMessage = [...current,notification]
                    
                
                localStorage.setItem('notification',JSON.stringify(updateMessage))
            }
            
            
        } catch (error) {
            console.error(
                'erreur du message de verification',error
            )
        }
    }


    
   
    // useEffect(()=>{
    //     const intervalID = setInterval(()=>{
    //         const pouleIds = JSON.parse(localStorage.getItem('pouleIds')) || []
    //         pouleIds.forEach((pouleID)=> verificationProgramme(pouleID))
    //     },6000)
    
    //     return () => clearInterval(intervalID)
    // },[])
    
   
     

      
    
 
    
  return (
    <> 

    
    <Button quantite_initial="button" className="btn btn-secondary " onClick={handleShow}>Ajouter</Button>
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
                   <h4 className="card-title">Ajout Poules</h4>
                   <p className="card-description">Basic form layout</p>
                   <form className="forms-sample" onSubmit={handleSubmit}>
                    
                           <label>CATEGORIE POULE</label>
                           <input 
                               quantite_initial="text" 
                               className='form-control'
                               id="exampleInputNomRation1" 
                               placeholder="Entrer un categorie"
                               value={categorie}
                               
                               onChange={(e) => setcategorie(e.target.value)}
                             required
                           />
                          <br></br>
                       
                    
                           <label>Nombre poule</label>
                           <input 
                               type="number" 
                               className='form-control'
                               id="exampleInputNomRation1" 
                               placeholder="Entrer un nombre de poule"
                               value={NombrePoule}
                               onChange={(e)=> setNombrePoule(e.target.value)}
                             required
                           />
                           <br></br>
                          
                       
                    
                           <label>Salles</label>
                           <select
                                className='form-control form-control-lg'
                                id="eventTitle"
                                value={idSalle}
                                onChange={(e) => setidSalle(e.target.value)}
                               
                             required
                            >
                               

                                  
                                <option value="">Choisissez un nom Salles</option>
                              
                                {!loading && Array.isArray(salle)&& salle.map((Index)=>( 
                                <option value={Index.id} key={Index.id}>{Index.nom}</option>
                               
                            ))}
                            </select>
                          
                            <br></br>
                    
                           <label>Nom Ration</label>
                           <select
                                className='form-control form-control-lg'
                                id="eventTitle"
                                value={idRations}
                                onChange={(e) => setidRations(e.target.value)}
                               
                             required
                            >
                               

                                  
                                <option value="">Choisissez un nom Ration</option>
                              
                                {NomRation.map((ration)=>( 
                                <option key={ration.id} value={ration.id}>{ration.NomRation}</option>
                               
                            ))}
                            </select>
                          
                            <br></br>
                    
                           <label>Programme vaccin</label>
                           <select
                                className='form-control form-control-lg'
                                id="eventTitle"
                                value={idProgramme}
                                onChange={(e) => setidProgramme(e.target.value)}
                               
                             required
                            >
                               

                                  
                                <option value="">Choisissez Date du Programme</option>
                              
                                {nomProgramme.map((programme)=>( 
                                <option key={programme.id} value={programme.id}>{new Date(programme.Date).toLocaleDateString('fr-CA')}</option>
                               
                            ))}
                            </select>
                            <br></br>
                           <label>Rations consomme/g</label>
                           <select
                                className='form-control form-control-lg'
                                id="eventTitle"
                                value={consomation}
                                onChange={(e) => setconsomation(e.target.value)}
                               
                             required
                            >
                    
                                <option value="">Choisissez un Ration</option>
                                <option value={15}>15 MIN</option>
                                <option value={18}>18 MOYEN</option>
                                <option value={20}>20 Max</option>
                            </select>
                            <br></br>
                  
                      
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

export default ModalAddPoule