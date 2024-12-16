
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';


function ModalUpdatePoule({Index}) {
    const [show, setShow] = useState(false);
const handleClose = () => setShow(false);
const handleShow = () => setShow(true);
const [dateAquis,setdateAquis]=useState(Index.dateAquis)
const [idSalle,setidSalle]=useState(Index.idSalle)
const [nomSalle,setnomSalle]=useState([])
const [nombre,setnombre]=useState(Index.nombre)
const[categorie,setcategorie]=useState(Index.categorie)
const[jour,setjour]=useState(Index.jour)



useEffect(()=>{
   
    
    fetchSalle()
  },[])


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

    try {
        const reponse = await axios.put(`http://localhost:4000/api/poule/Modifier/${Index.id}`,
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
    <button type="button"
       className="btn  btn-sm btn-move"
       onClick={handleShow}
       style={{height:10,color:'blue',}}
      
       >
        <i class="typcn typcn-edit"></i>
      </button>
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
        <h4 className="card-title">Modification du Poule</h4>

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
            <option key={Index.idSalle} value={Index.idSalle}>{Index.nom}</option>
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
          <label for="exampleInputEmail1">age du poule(jour)</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputdesignation1"
            placeholder="categorie..."
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

export default ModalUpdatePoule