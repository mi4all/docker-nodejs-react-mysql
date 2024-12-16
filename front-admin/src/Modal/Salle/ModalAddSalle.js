import axios from 'axios';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // URL du backend (Docker)

function ModalAddSalle({ onAddSalle }) {
  const [show, setShow] = useState(false);
  const [nom, setNom] = useState('');
  const [idcaract, setIdcaract] = useState('');
  const [idmat, setIdmat] = useState('');
  const [materiel, setMateriel] = useState([]);
  const [surface, setSurface] = useState([]);
  const [nomTouched, setNomTouched] = useState(false);
  const [nomError, setNomError] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleUsernameBlur = () => {
    setNomTouched(true);
    setNomError(nom.trim() === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/ajout`, { nom, idcaract, idmat });
      if (response.status === 200) {
        setNom('');
        setIdcaract('');
        setIdmat('');
        handleClose();
        toast.success('Salle ajoutée avec succès !');
        onAddSalle();
      }
    } catch (error) {
      console.error('Erreur lors de l’ajout de la salle :', error);
    }
  };

  const isFormValid = nom.trim() !== '' && idcaract !== '' && idmat !== '';

  return (
    <>
      <Button type="button" className="btn btn-secondary" onClick={handleShow}>
        Ajouter
      </Button>

      <Modal show={show} centered>
        <div className="card">
          <div className="card-body">
            <i
              className="settings-close typcn typcn-delete-outline"
              style={{ marginLeft: '100%', color: 'red' }}
              onClick={handleClose}
            ></i>
            <h4 className="card-title">Ajout de Salle</h4>
            <form className="forms-sample" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nom de la Salle</label>
                <input
                  type="text"
                  className={`form-control form-control-sm ${nomTouched && nomError ? 'is-invalid' : ''}`}
                  placeholder="Nom de la Salle"
                  value={nom}
                  onChange={(e) => setNom(e.target.value)}
                  onBlur={handleUsernameBlur}
                  required
                />
                {nomTouched && nomError && (
                  <div className="invalid-feedback" style={{ color: 'red' }}>
                    Veuillez saisir un nom de salle.
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Matériel</label>
                <select
                  className="form-control form-control-lg"
                  value={idmat}
                  onChange={(e) => setIdmat(e.target.value)}
                  required
                >
                  <option value="">Choisissez un matériel</option>
                  {materiel.map((mat) => (
                    <option key={mat.id} value={mat.id}>
                      {mat.designation}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Caractéristique</label>
                <select
                  className="form-control form-control-lg"
                  value={idcaract}
                  onChange={(e) => setIdcaract(e.target.value)}
                  required
                >
                  <option value="">Choisissez une caractéristique</option>
                  {surface.map((sal) => (
                    <option key={sal.id} value={sal.id}>
                      Surface: {sal.surface}m², Densité: {sal.densite}, Nombre de Poules: {sal.nombreDePoule}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-secondary mr-2" disabled={!isFormValid}>
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

export default ModalAddSalle;
