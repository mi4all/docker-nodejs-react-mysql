import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

function ModalModSalle({ Index }) {
  const [show, setShow] = useState(false);
  const [nom, setNom] = useState(Index.nom);
  const [idcaract, setIdcaract] = useState(Index.idcaract);
  const [idmat, setIdmat] = useState(Index.idmat);
  const [materiel, setMateriel] = useState([]);
  const [surface, setSurface] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${API_BASE_URL}/Modifier/${Index.id}`, { nom, idcaract, idmat });
      if (response.status === 200) {
        handleClose();
        toast.success('Salle modifiée avec succès !');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.error('Erreur lors de la modification de la salle :', error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-sm btn-move"
        onClick={handleShow}
        style={{ height: 10, color: 'blue' }}
      >
        <i className="typcn typcn-edit"></i>
      </button>

      <Modal show={show}>
        <div className="card">
          <div className="card-body">
            <i
              className="settings-close typcn typcn-delete-outline"
              style={{ marginLeft: '100%', color: 'red' }}
              onClick={handleClose}
            ></i>
            <h4 className="card-title">Modifier une Salle</h4>
            <form className="forms-sample" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom Salle</label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Caractéristique</label>
                <select
                  className="form-control form-control-lg"
                  value={idcaract}
                  onChange={(e) => setIdcaract(e.target.value)}
                  required
                >
                  <option key={Index.idcaract} value={Index.idcaract}>
                    {Index.surface}
                  </option>
                  {surface.map((sal) => (
                    <option key={sal.id} value={sal.id}>
                      {sal.surface}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Matériel</label>
                <select
                  className="form-control form-control-lg"
                  value={idmat}
                  onChange={(e) => setIdmat(e.target.value)}
                  required
                >
                  <option key={Index.idmat} value={Index.idmat}>
                    {Index.designation}
                  </option>
                  {materiel.map((mat) => (
                    <option key={mat.id} value={mat.id}>
                      {mat.designation}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-secondary mr-2">
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
export default ModalModSalle;
