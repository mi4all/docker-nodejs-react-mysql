import axios from "axios";
import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";

function ModalModVcc({ Index }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [nom_traitement, setnom_traitement] = useState(Index.nom_traitement);
  const [type, settype] = useState(Index.type);
  const [methode, setmethode] = useState(Index.methode);
  const [frequence,setfrequence]= useState(Index.frequence)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reponse = await axios.put(
        `http://backend:4000/api/Vaccins/Modifier/${Index.id}`,
        {
          nom_traitement,
          methode,
          type,
          frequence
        }
      );
      console.log(reponse);
      if (reponse) {
        handleClose();

        toast.success("Modification avec succes");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error("tsy mety:", error);
    }
  };
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
                marginTop: "100%",
              }}
              onClick={handleClose}
            ></i>
            <h4 className="card-title">Modifier une Traitement</h4>

            <form className="forms-sample" onSubmit={handleSubmit}>
              <div className="form-group">
                <label for="exampleInputUsername1">Nom traitement</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername1"
                  value={nom_traitement}
                  onChange={(e) => setnom_traitement(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Frequence(jour)</label>
                <input
                  type="number"
                  className='form-control '
                    
                  id="exampleInputnom_traitement1"
                  placeholder="Frequence par jour"
                  value={frequence}
                  onChange={(e) => setfrequence(e.target.value)} // Mettre à jour l'état
                 // Vérifie la validité au blur
                />
                
              </div>

              <div className="form-group">
                <label for="exampleInputEmail1">Methode</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputEmail1"
                  value={methode}
                  onChange={(e) => setmethode(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Type du traitement</label>
                <select
                  className="form-control form-control-lg"
                  id="eventTitle"
                  value={type}
                  onChange={(e) => settype(e.target.value)}
                >
                  <option value="">Choisissez un type</option>
                  <option value="vaccin">Vaccin </option>
                  <option value="vitamine">vitamine</option>
                </select>
              </div>

              <button type="submit" className="btn btn-secondary mr-2">
                Modifier
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

export default ModalModVcc;
