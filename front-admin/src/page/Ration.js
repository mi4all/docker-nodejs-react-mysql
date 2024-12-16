import React, {useState, useEffect, useRef, useContext } from "react";

import { Parametre } from "../components/Parametre";
import axios from "axios";
import ModalAddRation from "../Modal/Ration/ModalAddRation";
import ModalMOdRation from "../Modal/Ration/ModalModRation";
import ModalConfirmeRation from "../Modal/Ration/ModalConfirmeRation";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function Ration() {
  const { Parametrevisible1 } = useContext(Parametre);
  const tableRef = useRef(null);
  const [rations, setRation] = useState([]);
  const [alert, setalert] = useState([]);
  const [error, seterror] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false); // État pour la modal de confirmation
  const [deleteRation, setdeleteRation] = useState(null); 
  
  const handleShowConfirm = (id) => {
  setdeleteRation(id); // Définir l'ID de la salle à supprimer
  setShowConfirm(true);
};

// Fermer la modal de confirmation
const handleCloseConfirm = () => setShowConfirm(false);

// Fonction pour confirmer la suppression
const handleConfirmDelete = async () => {
  try {
    const response = await axios.delete(`http://backend:4000/api/Rations//supprimer/${deleteRation}`);
    console.log(response.data);

    

   
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
 
    useEffect(() => {
         
      const fecthRations = async()=>{
        try {
           // Exécuter la requête uniquement si la quantité consommée a changé
         const reponse =  await axios.get('http://backend:4000/api/Rations/')
         console.log( reponse.data.rations)
         
          
            setRation(reponse.data.rations)
            
           
        } catch (error) {
          console.log(error)
        }
      }
         
               
      fecthRations()     
      }, []);

      console.log("rations:",rations)
      useEffect(() =>{
        if (rations.length > 0) {
          initializeDataTable()
         
        }
      },[rations,Parametrevisible1])

    
     const getCouleurBar = (etat)=>{
      switch(etat){
        case "vert":
          return 'bg-success';
        case 'jaune':
          return 'bg-warning';
        case 'rouge':
          return 'bg-danger';
        default:
          return '';
      }
     }

    

     const  alertDisplay = localStorage.getItem('alertdisplay') === 'true'
     
      rations.map((valiny)=>{
        if (valiny.pourcentageRestant <=30 && !alertDisplay) {
          Swal.fire({
            icon:'error',
            title:` Rations ${valiny.nom}`,
            text:` Stock en cours d'epuiser ${valiny.nom}: ${valiny.pourcentageRestant}`,
            confirmButtonText:'Ok'
          })
          localStorage.setItem('alertdisplay','true')
        }
       })
    

     

     

     

 

  return (
    <div className="content-wrapper">
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
             
            <div className="card-body">
              <h4 className="card-title">Table du Ration</h4>
              <div
                style={{
                  display:'flex',
                  gap:'15px',
                  marginLeft:'200px'
                }}
              
              > 
              <div
                style={{
                  width:'20px',
                  height:'20px',
                  borderRadius:'50%',
                  backgroundColor: 'green',
                   marginLeft:'50px'
                }}
              
              >
             
              </div>
              <span>superieur 50%</span>
              <div
                style={{
                  width:'20px',
                  height:'20px',
                  borderRadius:'50%',
                  backgroundColor: 'orange',
                   marginLeft:'50px'
                }}
              
              >
             
              </div>
              <span>inferier ou egale 50%</span>
              <div
                style={{
                  width:'20px',
                  height:'20px',
                  borderRadius:'50%',
                  backgroundColor: 'red',
                   marginLeft:'50px'
                }}
              
              >
             
              </div>
              <span>inferier ou egale 20%</span>



              </div>
              {/* {!Parametrevisible1 && <ModalAddVcc />} */}
              {!Parametrevisible1 && <ModalAddRation />}

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
                      <th>Nom_Rations</th>
                      <th>Stock_restant</th>
                      <th>Quantite_Initial</th>
                      <th>Quantite_Restant</th>
                      <th>Quantite_Utilise</th>
                      <th>Prevision(jour)</th>
                      <th
                        style={{
                          
                          display: !Parametrevisible1 ? "table-cell" : "none",
                        }}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rations.map((Index) => (
                      <tr key={Index.id}>
                        <td>{Index.id}</td>
                        <td>{Index.nom}</td>
                        <td>
                          <div
                            className="progress"
                            style={{
                              width: "100%",
                              height: "20px",
                              backgroundColor: "#ccc",
                              borderRadius: "5px",
                              overflow: "hidden",
                            }}
                          >
                            <div
                              className={`progress-bar ${getCouleurBar(
                                Index.etat
                              )}`}
                              role="progressbar"
                              style={{
                                width: `${Index.pourcentageRestant}%`,
                                transition: "width 0.5s",
                              }}
                              aria-valuenow={Index.pourcentageRestant}
                              aria-valuemin="0"
                              aria-valuemax="100"
                            >
                              {Index.pourcentageRestant}%
                            </div>
                          </div>
                        </td>
                        <td>{Index.quantiteInitial}g</td>
                        <td>{Index.quantiteRestante}g</td>
                        <td>{Index.quantiteUtilise}g</td>
                        <td>{Index.dureRestanteStock}jour(s)</td>

                        <td
                          style={{
                           
                            display: !Parametrevisible1 ? "table-cell" : "none",
                          }}
                        >
                         <ModalMOdRation Index={Index} />
                           
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
      <ModalConfirmeRation
        show={showConfirm}
        handleClose={handleCloseConfirm}
        handleConfirm={handleConfirmDelete}
        message="Êtes-vous sûr de vouloir supprimer cette ration ?"
      />
    </div>
  );
}

export default Ration;
