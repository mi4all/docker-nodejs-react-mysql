import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap'; // Assurez-vous d'importer ces composants
import { toast } from 'react-toastify';

function ModalAddVcc({onAddVaccine}) {
    // États pour les champs du formulaire
    const [show,setShow] = useState(false);
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const [nom_traitement, setnom_traitement] = useState('');
    const [type, settype] = useState('');
    const [methode, setmethode] = useState('');
    const [nom_traitementTouched, setnom_traitementTouched] = useState(false);
    const [methodeTouched, setmethodeTouched] = useState(false);
    const [typeTouched, settypeTouched] = useState(false);
    const [nom_traitementError, setnom_traitementError] = useState(false);
    const [typeError, settypeError] = useState(false);
    const [methodeError, setmethodeError] = useState(false);
    const [frequence,setfrequence]=useState('')

    const handlenom_traitementBlur = () => {
        setnom_traitementTouched(true);
        // Vérifie si le champ est vide ou contient seulement des espaces
        if (nom_traitement.trim() === '') {
            setnom_traitementError(true);
        } else {
            setnom_traitementError(false);
        }
    };

    const handletypeBlur = () => {
        settypeTouched(true);
        // Vérifie si le champ est vide
        if (type === '') {
            settypeError(true);
        } else {
            settypeError(false);
        }
    };
    const handlemethodeBlur = () => {
        setmethodeTouched(true);
        // Vérifie si le champ est vide
        if (methode === '') {
            setmethodeError(true);
        } else {
            setmethodeError(false);
        }
    };

    const handleSubmit = async (e)=>{
        e.preventDefault();
  
  
        try {
          const reponse = await axios.post('/api/Vaccins/ajout', {
            nom_traitement,
            type,
            frequence,
            methode,
           
           
          
          })
          console.log(reponse)
         
          if(reponse.status === 200){
            setShow(false);
            setnom_traitement(""); 
            settype("");
            setmethode('') 
            setnom_traitementTouched(false); 
            settypeTouched(false); 
            setnom_traitementError(false); 
            settypeError(false); 

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

    // Vérifiez si tous les champs sont remplis
    const isFormValid = nom_traitement.trim() !== '' && type !== ''&& methode !== '';

    return (
      <> 
     <Button type="button" className="btn btn-secondary " onClick={handleShow}>Ajouter</Button>
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
                    <h4 className="card-title">Ajout du vaccin</h4>
                    {/* <p className="card-description">Basic form layout</p> */}
                    <form className="forms-sample" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Nom du traitement</label>
                            <input 
                                type="text" 
                                className={`form-control ${nom_traitementTouched && nom_traitementError ? 'is-invalid' : ''}`} 
                                id="exampleInputnom_traitement1" 
                                placeholder="Nom du traitement"
                                value={nom_traitement}
                                onChange={(e) => setnom_traitement(e.target.value)} // Mettre à jour l'état
                                onBlur={handlenom_traitementBlur} // Vérifie la validité au blur
                            />
                            {nom_traitementTouched && nom_traitementError && (
                                <div className="invalid-feedback" style={{ color: 'red' }}>
                                    Veuillez saisir un nom de traitement.
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label>Methode du traitement</label>
                            <input 
                                type="text" 
                                className={`form-control ${methodeTouched && methodeError ? 'is-invalid' : ''}`} 
                                id="exampleInputnom_traitement1" 
                                placeholder="Nom du methode"
                                value={methode}
                                onChange={(e) => setmethode(e.target.value)} // Mettre à jour l'état
                                onBlur={handlemethodeBlur} // Vérifie la validité au blur
                            />
                            {methodeTouched && methodeError && (
                                <div className="invalid-feedback" style={{ color: 'red' }}>
                                    Veuillez saisir un methode.
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Type</label>
                            <select
                                className={`form-control form-control-lg ${typeTouched && typeError ? 'is-invalid' : ''}`}
                                id="eventTitle"
                                value={type}
                                onChange={(e) => settype(e.target.value)} // Mettre à jour l'état
                                onBlur={handletypeBlur} // Vérifie la validité au blur
                            >
                                <option value="">Choisissez un type</option>
                                <option value="vaccin">Vaccin </option>
                                <option value="vitamine">vitamine</option>
                            </select>
                            {typeTouched && typeError && (
                                <div className="invalid-feedback" style={{ color: 'red' }}>
                                    Veuillez sélectionner un type.
                                </div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Frequence(jour)</label>
                            <input 
                                type="number" 
                                className={`form-control ${methodeTouched && methodeError ? 'is-invalid' : ''}`} 
                                id="exampleInputnom_traitement1" 
                                placeholder="Frequence par jour"
                                value={frequence}
                                onChange={(e) => setfrequence(e.target.value)} // Mettre à jour l'état
                                onBlur={handlemethodeBlur} // Vérifie la validité au blur
                            />
                            {methodeTouched && methodeError && (
                                <div className="invalid-feedback" style={{ color: 'red' }}>
                                    Veuillez saisir un frequence.
                                </div>
                            )}
                        </div>
                        <Button 
                            type="submit" 
                            className="btn btn-secondary mr-2" 
                            disabled={!isFormValid} 
                            onClick={onAddVaccine}
                        >
                            Sauvegarder
                        </Button> 
                        <Button className="btn btn-light" onClick={handleClose}>Retour</Button>
                    </form>
                </div>
            </div>
        </Modal>
        </>
    );
}

export default ModalAddVcc;

