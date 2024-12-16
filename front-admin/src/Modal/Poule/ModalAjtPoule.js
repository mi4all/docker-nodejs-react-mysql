
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'


function ModalAjtPoule() {
    const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const [dateAquis,setdateAquis]=useState('')
const [idSalle,setidSalle]=useState('')
const [nomSalle,setnomSalle]=useState([])
const [nombre,setnombre]=useState('')
const[categorie,setcategorie]=useState('')
const[jour,setjour]=useState('')
const [maxPoulesSalle, setMaxPoulesSalle] = useState(null);


useEffect(()=>{
   
    
    fetchSalle()
  },[])
  

// Fonction pour récupérer le nombre maximal de poules dans une salle
const fetchMaxPoules = async (idSalle) => {
  try {
    const response = await axios.get(`http://localhost:4000/api/poule/max/${idSalle}`);
    console.log(response.data)
    return response.data;
     // Supposons que l'API renvoie un champ maxPoules
  } catch (error) {
    console.error("Erreur lors de la récupération du nombre maximal de poules :", error);
    return null;
  }
};


  const fetchSalle = async () =>{
   
    try {
      const reponse = await axios.get('http://localhost:4000/api/vide_sanitaire/comboMat');
      setnomSalle(reponse.data)
     console.log(reponse.data)
     
    
    } catch (error) {
      console.log(error.data)
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const maxPoules = await fetchMaxPoules(idSalle); 
    console.log('nombre:',maxPoules ,'saisie',nombre)
    if (maxPoules !== null && parseInt(nombre) > maxPoules) {
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: `Le nombre de poules ne peut pas dépasser ${maxPoules} pour la salle sélectionnée.`,
      });
      return; // Bloquer la soumission si la condition n'est pas respectée
    }
    try {
      const reponse = await axios.post(
        "http://localhost:4000/api/poule/ajout",
        {
          idSalle,
          nombre,
          categorie,
          dateAquis,
          jour
          
        }
      );

      console.log(reponse);

      if (reponse.status === 200) {
        setnombre("");
        setidSalle("");
        setcategorie("");
        setdateAquis('')
        setjour('')
      

        handleClose();

        toast.success("ajout avec succes");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("tsy mety");
    }
  };

  
  return (
    <>
    <Button type="button" className="btn btn-secondary " onClick={handleShow}>
      Ajouter
    </Button>
    <Modal show={show} centered>
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
        <h4 className="card-title">Ajout du Poule</h4>

        <form className="forms-sample" onSubmit={handleSubmit}>
          <label>date Aquisation</label>
          <input
            type="date"
            className="form-control"
            id="exampleInputdesignation1"
            placeholder="dateAquis..."
            value={dateAquis}
            onChange={(e) => setdateAquis(e.target.value)} // Mettre à jour l'état
            required
          />

          <br></br>

          <label for="exampleInputEmail1">Salle</label>
          <select
            className="form-control form-control-lg"
            id="eventTitle"
            value={idSalle}
            onChange={(e) => setidSalle(e.target.value)}
            name="vaccin"
            required
          >
            <option value="">Choisissez un salle</option>
            {nomSalle.map((item) => (
              <option key={item.id} value={item.id}>
                {item.nom}
              </option>
            ))}
          </select>
          <br></br>
          <label for="exampleInputEmail1">nombre</label>
          <input
            type="number"
            className="form-control"
            id="exampleInputdesignation1"
            placeholder="nombre..."
            value={nombre}
            onChange={(e) => setnombre(e.target.value)} // Mettre à jour l'état
            required
          />
          <br></br>
          <label for="exampleInputEmail1">Categorie</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputdesignation1"
            placeholder="categorie..."
            value={categorie}
            onChange={(e) => setcategorie(e.target.value)} // Mettre à jour l'état
            required
          />
          <br></br>
          <label for="exampleInputEmail1">Age du Poule(jour)</label>
          <input
            type="number"
            className="form-control"
            id="exampleInputdesignation1"
            placeholder="...age du poule"
            value={jour}
            onChange={(e) => setjour(e.target.value)} // Mettre à jour l'état
            required
          />
          <br></br>

          <Button
            type="submit"
            className="btn btn-secondary mr-2"

            // onClick={onAddVaccine}
          >
            Sauvegarder
          </Button>
          <Button className="btn btn-light" onClick={handleClose}>
            Retour
          </Button>
        </form>
      </div>
    </Modal>
  </>
  )
}

export default ModalAjtPoule