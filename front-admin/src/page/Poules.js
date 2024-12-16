import React, { useContext, useRef, useEffect, useState } from 'react'
import ModalAjtPoule from '../Modal/Poule/ModalAjtPoule'
import { Parametre } from '../components/Parametre';
import { toast } from 'react-toastify';
import { Modal,Button } from 'react-bootstrap';
import axios from 'axios';
import ModalUpdatePoule from '../Modal/Poule/ModalUpdatePoule';
import ModalConfirmPoule from '../Modal/Poule/ModalConfirmPoule';

function Poules() {
  const { Parametrevisible1 } = useContext(Parametre);
  const tableRef = useRef(null);
 const [AffPoule,setAffPoule] = useState([])
 const [showConfirm, setShowConfirm] = useState(false); // État pour la modal de confirmation
 const [deletePouleId, setdeletePouleId] = useState(null); 
 const handleShowConfirm = (id) => {
  setdeletePouleId(id); // Définir l'ID de la salle à supprimer
  setShowConfirm(true);
};

const handleCloseConfirm = () => setShowConfirm(false);

const handleConfirmDelete = async () => {
  try {
    const response = await axios.delete(`http://backend:4000/api/Poule/supprimer/${deletePouleId}`);
    console.log(response.data);

    

    // Fermer la modal de confirmation
    setShowConfirm(false);
    toast.success('suppression avec succes')
    setTimeout(()=>{
      window.location.reload();
    },1000)
  } catch (error) {
    console.error("Erreur lors de la suppression de la salle:", error);
  }
};






 const initializeDataTable = () => {
  if (tableRef.current) {
  
    if (window.$.fn.DataTable.isDataTable(tableRef.current)) {
      window.$(tableRef.current).DataTable().destroy(); // Détruire l'instance existante
    }
    const tb = window.$("#datatable-responsive").DataTable({
      

      language: {
        "sEmptyTable":     "Aucune donnée disponible dans le tableau",
        "sInfo":           "Affichage de l'élément _START_ à _END_ sur _TOTAL_ éléments",
        "sInfoEmpty":      "Affichage de l'élément 0 à 0 sur 0 élément",
        "sInfoFiltered":   "(filtré à partir de _MAX_ éléments au total)",
        "sInfoPostFix":    "",
        "sInfoThousands":  ",",
        "sLengthMenu":     "Afficher _MENU_ éléments",
        "sLoadingRecords": "Chargement...",
        "sProcessing":     "Traitement...",
        "sSearch":         "Rechercher :",
        "sZeroRecords":    "Aucun élément correspondant trouvé",
        "oPaginate": {
          "sFirst":    "Premier",
          "sLast":     "Dernier",
          "sNext":     "Suivant",
          "sPrevious": "Précédent"
        },
        "oAria": {
          "sSortAscending":  ": activer pour trier la colonne par ordre croissant",
          "sSortDescending": ": activer pour trier la colonne par ordre décroissant"
        }
      },
      Pagination:true,
      Search:true,
    });
   
    tb.column(7).visible(!Parametrevisible1)
    tb.columns.adjust().draw(false)

    
  }


};

useEffect(()=>{
  const fecthAllPoule = async ()=>{
      try {
          const res = await fetch("http://backend:4000/api/Poule/");
          const rs = await res.json();
          const format = Object.values(rs);
          setAffPoule(format);
   
         

      } catch (err) {
          console.log(err)
      }
  };
  fecthAllPoule();

},[]);

useEffect(() =>{
  if (AffPoule.length > 0) {
    initializeDataTable()
  }

},[AffPoule,Parametrevisible1])




  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Table des Poules</h4>
              {!Parametrevisible1 && <ModalAjtPoule />}

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
                      <th>Date_aquisation</th>
                      <th>catégorie</th>
                      <th>Nombre</th>
                      <th>Salle</th>
                      <th>Age</th>
                      <th>Semaine</th>
                      <th
                        style={{
                          width: 1,
                          display: !Parametrevisible1 ? "table-cell" : "none",
                        }}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {AffPoule.map((Index) => (
                      <tr key={Index.id}>
                        <td>{Index.id}</td>
                        <td>{Index.dateAquis}</td>
                        <td>{Index.categorie}</td>
                        <td>{Index.nombre}</td>
                        <td>{Index.nom}</td>
                        <td>{Index.jour}jour</td>
                        <td>{Index.Semaine}</td>

                        <td
                          style={{
                            display: !Parametrevisible1 ? "table-cell" : "none",
                          }}
                        >
                          <ModalUpdatePoule Index={Index} />
                          <button
                            type="button"
                            className="btn    btn-sm btn-move"
                            style={{ marginLeft: 10, height: 10 }}
                            onClick={() => handleShowConfirm(Index.id)}
                          >
                            <i
                              className="typcn typcn-trash "
                              style={{ color: "red" }}
                            ></i>
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
      <div className="theme-setting-wrapper">
        <div id="settings-trigger">
          <i className="typcn typcn-cog-outline"></i>
        </div>
        <div id="theme-settings" className="settings-panel">
          <i className="settings-close typcn typcn-delete-outline"></i>
          <p className="settings-heading">SIDEBAR SKINS</p>
          <div className="sidebar-bg-options" id="sidebar-light-theme">
            <div className="img-ss rounded-circle bg-light border mr-3"></div>
            Light
          </div>
          <div className="sidebar-bg-options selected" id="sidebar-dark-theme">
            <div className="img-ss rounded-circle bg-dark border mr-3"></div>
            Dark
          </div>
          <p className="settings-heading mt-2">HEADER SKINS</p>
          <div className="color-tiles mx-0 px-4">
            <div className="tiles success"></div>
            <div className="tiles warning"></div>
            <div className="tiles danger"></div>
            <div className="tiles primary"></div>
            <div className="tiles info"></div>
            <div className="tiles dark"></div>
            <div className="tiles default border"></div>
          </div>
        </div>
      </div>
      <ModalConfirmPoule
          show={showConfirm}
          handleClose={handleCloseConfirm}
          handleConfirm={handleConfirmDelete}
          message="Êtes-vous sûr de vouloir supprimer cette Poule ?"
        />
    </div>
  );
}

export default Poules