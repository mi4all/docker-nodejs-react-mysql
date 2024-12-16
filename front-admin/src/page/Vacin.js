import React, { useEffect, useRef, useContext, useState } from "react";
import ModalAddVcc from "../Modal/ModalAddVcc";
import ModalModVcc from "../Modal/ModalModVcc";
import { Parametre } from "../components/Parametre";
import { initTable } from "../components/table";
import { Button, Pagination } from "react-bootstrap";
import axios from 'axios'
import { toast } from "react-toastify";
import ModalCofirmeVcc from "../Modal/ModalCofirmeVcc";
function Vacin() {
  const { Parametrevisible1 } = useContext(Parametre);
  const [vaccin,setvaccin] = useState([])
  const tableRef = useRef(null);
  const [showConfirm, setShowConfirm] = useState(false); // État pour la modal de confirmation
  const [deleteVaccin, setdeleteVaccin] = useState(null); 
  const handleShowConfirm = (id) => {
  setdeleteVaccin(id); // Définir l'ID de la salle à supprimer
  setShowConfirm(true);
};

// Fermer la modal de confirmation
const handleCloseConfirm = () => setShowConfirm(false);

// Fonction pour confirmer la suppression
const handleConfirmDelete = async () => {
  try {
    const response = await axios.delete(`http://backend:4000/api/Vaccins/supprimer/${deleteVaccin}`);
    console.log(response.data);

    // Mettre à jour la liste des salles après suppression
    setvaccin((prevAffSalle) => prevAffSalle.filter((Index) => Index.id !== deleteVaccin));

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
        tb.column(5).visible(!Parametrevisible1)
        tb.columns.adjust().draw(false)

        
      }


    };
   

    
    
 

  useEffect(()=>{
    const fecthAllvaccin = async ()=>{
        try {
            const res = await fetch("http://backend:4000/api/Vaccins/");
            const rs = await res.json();
            const format = Object.values(rs);
            console.log(format);
            setvaccin(format);
            

        } catch (err) {
            console.log(err)
        }
    };
    fecthAllvaccin();

  },[]);

  useEffect(() =>{
    if (vaccin.length > 0) {
      initializeDataTable()
     
    }
  },[vaccin,Parametrevisible1])

 

  


  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Table du Vaccin</h4>
              {!Parametrevisible1 && <ModalAddVcc />}
              <div className="table-responsive pt-3">
                <table
                  ref={tableRef}
                  id="datatable-responsive"
                  className="table table-striped table-bordered dt-responsive nowrap "
                  cellSpacing="0"
                  width="100%"
                >
                  <thead>
                    <tr>
                      <th >#</th>
                      <th >Nom du traitement</th>
                      <th >Type</th>
                      <th >Frequence</th>
                      <th >Methode</th>
                      <th
                        style={{

                          width:'50px',
                          
                        }}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {vaccin.map(Index=>( 
                   <tr  key={Index.id}>
                   <th >{Index.id}</th>
                   <td>{Index.nom_traitement}</td>
                   <td>{Index.type}</td>
                   <td>{Index.frequence}jour(s)</td>
                   <td>{Index.methode}</td>

                      <td
                        style={{
                          
                          display: !Parametrevisible1 ? "table-cell" : "none",
                        }}
                      >
                        <ModalModVcc Index={Index}/>
                        <button
                          type="button"
                          className="btn    btn-sm btn-move"
                          style={{ marginLeft: 10,height:10}}
                          onClick={() => handleShowConfirm(Index.id)}
                        >
                          <i className="typcn typcn-trash " style={{color:'red'}}></i>
                         
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
      <ModalCofirmeVcc
        show={showConfirm}
        handleClose={handleCloseConfirm}
        handleConfirm={handleConfirmDelete}
        message="Êtes-vous sûr de vouloir supprimer cette vacin ?"
      />
    </div>
  );
}

export default Vacin;
