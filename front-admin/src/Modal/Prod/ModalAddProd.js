import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";

function ModalAddProd() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [recurence, setrecurence] = useState("");
  const [idPoule,setidPoule]=useState('')
  const [idvaccin,setidvaccin]=useState('')
  const [poule,setpoule]=useState([])
  const [vaccin,setvaccin]=useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const reponse = await axios.post(
        "http://backend:4000/api/prod/ajout",
        {
          idvaccin,
          idPoule,
          recurence,
          
        }
      );

      console.log(reponse);

      if (reponse.status === 200) {
        setidPoule("");
        setidvaccin("");
        setrecurence("");
      

        handleClose();

        toast.success("ajout avec succes");
        // setTimeout(() => {
        //   window.location.reload();
        // }, 1000);
      }
    } catch (error) {
      console.error("tsy mety");
    }
  };

  useEffect(()=>{
   
    categorie()
    fetchvaccin()
  },[])


  const categorie = async () =>{
    try {
      const reponse = await axios.get('http://backend:4000/api/prod/categoriePoule');
     setpoule(reponse.data)
     console.log(reponse.data)
     
    
    } catch (error) {
      console.log(error.data)
    }
    
   
  }

  const fetchvaccin = async () =>{
    try {
      const reponse = await axios.get('http://backend:4000/api/prod/NomVaccin');
     setvaccin(reponse.data)
     console.log(reponse.data)
     
    
    } catch (error) {
      console.log(error.data)
    }
    
   
  }

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
          <h4 className="card-title">Ajout du programme</h4>

          <form className="forms-sample" onSubmit={handleSubmit}>
            <label>Recurence</label>
            <input
              type="number"
              className="form-control"
              id="exampleInputdesignation1"
              placeholder="recurence..."
              value={recurence}
              onChange={(e) => setrecurence(e.target.value)} // Mettre à jour l'état
            />

            <br></br>

            <label for="exampleInputEmail1">Poule</label>
            <select
              className="form-control form-control-lg"
              id="eventTitle"
              value={idPoule}
              onChange={(e) => setidPoule(e.target.value)}
              name="vaccin"
              required
            >
              <option value="">Choisissez un Categorie</option>
              {poule.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.categorie}:{new Date(item.dateAquis).toLocaleDateString('fr-CA')}
                </option>
              ))}
            </select>
            <br></br>
            <label for="exampleInputEmail1">Poule</label>
            <select
              className="form-control form-control-lg"
              id="eventTitle"
              value={idvaccin}
              onChange={(e) => setidvaccin(e.target.value)}
              name="vaccin"
              required
            >
              <option value="">Choisissez un vaccin</option>
              {vaccin.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.nom_traitement}
                </option>
              ))}
            </select>
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
  );
}

export default ModalAddProd;
