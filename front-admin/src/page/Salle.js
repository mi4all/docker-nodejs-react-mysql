import React, { useContext, useRef, useEffect, useState } from 'react';
import ModalAddSalle from '../Modal/Salle/ModalAddSalle';
import ModalModSalle from '../Modal/Salle/ModalModSalle';
import { Parametre } from '../components/Parametre';
import axios from 'axios';
import ModalConfirme from '../Modal/Salle/ModalConfirme';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL; // URL du backend (Docker)

function Salle() {
  const { Parametrevisible1 } = useContext(Parametre);
  const tableRef = useRef(null);
  const [AffSalle, setAffSalle] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteSalleId, setDeleteSalleId] = useState(null);
  const [show, setShow] = useState(false);
  const [select, setSelect] = useState([]);

  const handleShowConfirm = (id) => {
    setDeleteSalleId(id);
    setShowConfirm(true);
  };

  const handleCloseConfirm = () => setShowConfirm(false);

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/supprimer/${deleteSalleId}`);
      console.log(response.data);

      // Mise à jour de la liste des salles
      setAffSalle((prevAffSalle) =>
        prevAffSalle.filter((salle) => salle.id !== deleteSalleId)
      );

      setShowConfirm(false);
      toast.success('Suppression avec succès');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error("Erreur lors de la suppression de la salle:", error);
    }
  };

  const initializeDataTable = () => {
    if (tableRef.current) {
      if (window.$.fn.DataTable.isDataTable(tableRef.current)) {
        window.$(tableRef.current).DataTable().destroy();
      }
      const tb = window.$("#datatable-responsive").DataTable({
        language: {
          "sEmptyTable": "Aucune donnée disponible dans le tableau",
          "sInfo": "Affichage de l'élément _START_ à _END_ sur _TOTAL_ éléments",
          "sInfoEmpty": "Affichage de l'élément 0 à 0 sur 0 élément",
          "sInfoFiltered": "(filtré à partir de _MAX_ éléments au total)",
          "sLoadingRecords": "Chargement...",
          "sProcessing": "Traitement...",
          "sSearch": "Rechercher :",
          "sZeroRecords": "Aucun élément correspondant trouvé",
          "oPaginate": {
            "sFirst": "Premier",
            "sLast": "Dernier",
            "sNext": "Suivant",
            "sPrevious": "Précédent",
          },
          "oAria": {
            "sSortAscending": ": activer pour trier la colonne par ordre croissant",
            "sSortDescending": ": activer pour trier la colonne par ordre décroissant",
          },
        },
        Pagination: true,
        Search: true,
      });

      tb.column(4).visible(!Parametrevisible1);
      tb.columns.adjust().draw(false);
    }
  };

  useEffect(() => {
    const fetchAllSalle = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/`);
        const rs = await res.json();
        setAffSalle(Object.values(rs));
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllSalle();
  }, []);

  useEffect(() => {
    if (AffSalle.length > 0) {
      initializeDataTable();
    }
  }, [AffSalle, Parametrevisible1]);

  const handleView = async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/supprimer/${id}`);
      setSelect(response.data);
      setShow(true);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const close = () => setShow(false);

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Table de Salle</h4>
              {!Parametrevisible1 && <ModalAddSalle />}

              <div className="table-responsive pt-3">
                <table
                  ref={tableRef}
                  id="datatable-responsive"
                  className="table table-striped table-bordered dt-responsive nowrap"
                  cellspacing="0"
                  width="100%"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nom salle</th>
                      <th>Matériel</th>
                      <th>Nombre de poule</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AffSalle.map((salle) => (
                      <tr key={salle.id}>
                        <td>{salle.id}</td>
                        <td>{salle.nom}</td>
                        <td>{salle.designation}</td>
                        <td>{salle.nombreDePoule} max</td>
                        <td style={{ width: 1, display: !Parametrevisible1 ? "table-cell" : "none" }}>
                          <ModalModSalle Index={salle} />
                          <button
                            type="button"
                            className="btn btn-sm btn-move"
                            style={{ marginLeft: 10, height: 10 }}
                            onClick={() => handleShowConfirm(salle.id)}
                          >
                            <i className="typcn typcn-trash" style={{ color: "red" }}></i>
                          </button>
                          <button
                            type="button"
                            className="btn btn-sm btn-move"
                            style={{ marginLeft: 10, height: 10 }}
                            onClick={() => handleView(salle.id)}
                          >
                            <i className="typcn typcn-eye" style={{ color: "green" }}></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalConfirme
        show={showConfirm}
        handleClose={handleCloseConfirm}
        handleConfirm={handleConfirmDelete}
        message="Êtes-vous sûr de vouloir supprimer cette salle ?"
      />
      <Modal show={show} centered>
        <Modal.Header>
          <Modal.Title>Détails du {select.nom}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Surface:</strong> {select.surface} m²</p>
          <p><strong>Densité:</strong> {select.densite}</p>
          <p><strong>Température:</strong> {select.temperature} °C</p>
          <p><strong>Humidité:</strong> {select.humidite}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>Retour</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Salle;
