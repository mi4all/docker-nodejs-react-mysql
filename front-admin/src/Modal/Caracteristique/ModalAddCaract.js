import axios from 'axios';
import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

function ModalAddCaract() {
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [surface, setsurface] = useState('');
    const [nombreDePoule, setnombreDePoule] = useState('');
    const [humidite, sethumidite] = useState('');
    const [lumiere, setlumiere] = useState('');
    const [intensite, setintensite] = useState('');
    const [temperature, settemperature] = useState('');
    //controlleur input
    const [surfaceTouched, setsurfaceTouched] = useState(false);
    const [nombreDePouleTouched, setnombreDePouleTouched] = useState(false);
    const [humiditeTouched, sethumiditeTouched] = useState(false);
    const [lumiereTouched, setlumiereTouched] = useState(false);
    const [intensiteTouched, setintensiteTouched] = useState(false);
    const [temperatureTouched, settemperatureTouched] = useState(false);

    const [surfaceError, setsurfaceError] = useState(false);
    const [nombreDePouleError, setnombreDePouleError] = useState(false);
    const [humiditeError, sethumiditeError] = useState(false);
    const [lumiereError, setlumiereError] = useState(false);
    const [intensiteError, setintensiteError] = useState(false);
    const [temperatureError, settemperatureError] = useState(false);

    //click sur l'input
    const handlesurfaceBlur = () => {
        setsurfaceTouched(true);
        if (surface.trim() === '') {
            setsurfaceError(true);
        } else {
            setsurfaceError(false);
        }
    };

    const handlenombreDePouleBlur = () => {
        setnombreDePouleTouched(true);
        if (nombreDePoule.trim() === '') {
            setnombreDePouleError(true);
        } else {
            setnombreDePouleError(false);
        }
    };
    const handlehumiditeBlur = () => {
        sethumiditeTouched(true);
        if (humidite.trim() === '') {
            sethumiditeError(true);
        } else {
            sethumiditeError(false);
        }
    };
    const handleintensiteBlur = () => {
        setintensiteTouched(true);
        if (intensite.trim() === '') {
            setintensiteError(true);
        } else {
            setintensiteError(false);
        }
    };
    const handlelumiere = () => {
        setlumiereTouched(true);
        if (lumiere.trim() === '') {
            setlumiereError(true);
        } else {
            setlumiereError(false);
        }
    };

    const handletemperatureBlur = () => {
        settemperatureTouched(true);
        if (temperature.trim() === '') {
            settemperatureError(true);
        } else {
            settemperatureError(false);
        }
    };
    
 //virification si tous les champs est remplir
 const isFormValid = surface.trim() !== '' && nombreDePoule.trim() !== '' && temperature.trim() !== '' && humidite.trim() !== ''
 && intensite.trim() !== '' && lumiere.trim() !== '';





 const handleSubmit = async (e)=>{
    e.preventDefault();


    try {
      const reponse = await axios.post('http://localhost:4000/api/caractere/ajout', {
        surface,
        nombreDePoule,
        humidite,
        lumiere,
        intensite,
        temperature
      })

      console.log(reponse)
     
      if(reponse.status === 200){
        setsurface('')
        setnombreDePoule('')
        sethumidite('')
        setlumiere('')
        settemperature('')
        setintensite('')
      
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
                        
                            <label>Surface</label>
                            <input 
                                type="text" 
                                className={`form-control ${surfaceTouched && surfaceError ? 'is-invalid' : ''}`} 
                                id="exampleInputsurface1" 
                                placeholder="Surface en m2"
                                value={surface}
                                onChange={(e) => setsurface(e.target.value)} // Mettre à jour l'état
                                onBlur={handlesurfaceBlur} // Vérifie la validité au blur
                            />
                            {surfaceTouched && surfaceError && (
                                <div className="invalid-feedback" style={{ color: 'red' }}>
                                    Veuillez saisir un surface.
                                </div>
                            )}
                             <br></br>
                        
                            <label>Nombre des poules</label>
                            <input 
                                type="text" 
                                className={`form-control ${nombreDePouleTouched && nombreDePouleError ? 'is-invalid' : ''}`} 
                                id="exampleInputnbrpoule1" 
                                placeholder="nombre poule ..."
                                value={nombreDePoule}
                                onChange={(e) => setnombreDePoule(e.target.value)} // Mettre à jour l'état
                                onBlur={handlenombreDePouleBlur} // Vérifie la validité au blur
                            />
                            {nombreDePouleTouched && nombreDePouleError && (
                                <div className="invalid-feedback" style={{ color: 'red' }}>
                                    Veuillez saisir nombres des poules.
                                </div>
                            )}
                           <br></br>
                        
                            <label>Temperature</label>
                            <input 
                                type="text" 
                                className={`form-control ${temperatureTouched && temperatureError ? 'is-invalid' : ''}`} 
                                id="exampleInputtemperature1" 
                                placeholder="Temperacture en C..."
                                value={temperature}
                                onChange={(e) => settemperature(e.target.value)} // Mettre à jour l'état
                                onBlur={handletemperatureBlur} // Vérifie la validité au blur
                            />
                            {temperatureTouched && temperatureError && (
                                <div className="invalid-feedback" style={{ color: 'red' }}>
                                    Veuillez saisir un Temperature.
                                </div>
                            )}
                             <br></br>
                        
                            <label>humidite</label>
                            <input 
                                type="text" 
                                className={`form-control ${humiditeTouched && humiditeError ? 'is-invalid' : ''}`} 
                                id="exampleInputUsername1" 
                                placeholder="humidite..."
                                value={humidite}
                                onChange={(e) => sethumidite(e.target.value)} // Mettre à jour l'état
                                onBlur={handlehumiditeBlur} // Vérifie la validité au blur
                            />
                            {humiditeTouched && humiditeError && (
                                <div className="invalid-feedback" style={{ color: 'red' }}>
                                    Veuillez saisir un humidite.
                                </div>
                            )}
                          <br></br>
                        
                            <label>Intensite</label>
                            <input 
                                type="text" 
                                className={`form-control ${intensiteTouched && intensiteError ? 'is-invalid' : ''}`} 
                                id="exampleInputUsername1" 
                                placeholder="Intensite w/h..."
                                value={intensite}
                                onChange={(e) => setintensite(e.target.value)} // Mettre à jour l'état
                                onBlur={handleintensiteBlur} // Vérifie la validité au blur
                            />
                            {intensiteTouched && intensiteError && (
                                <div className="invalid-feedback" style={{ color: 'red' }}>
                                    Veuillez saisir un Intensite.
                                </div>
                            )}
                            <br></br>
                        
                            <label>Lumiere</label>
                            <input 
                                type="text" 
                                className={`form-control ${lumiereTouched && lumiereError ? 'is-invalid' : ''}`} 
                                id="exampleInputUsername1" 
                                placeholder="lumiere par w..."
                                value={lumiere}
                                onChange={(e) => setlumiere(e.target.value)} // Mettre à jour l'état
                                onBlur={handlelumiere} // Vérifie la validité au blur
                            />
                            {lumiereTouched && lumiereError && (
                                <div className="invalid-feedback" style={{ color: 'red' }}>
                                    Veuillez saisir un lumiere.
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

export default ModalAddCaract