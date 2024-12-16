import React, { useState,useRef,useEffect,useContext} from 'react'
import ModalAddGestionnaire from '../Modal/Gestionnaire/ModalAddGestionnaire'
import ModalModGestionnaire from '../Modal/Gestionnaire/ModalModGestionnaire';
import { Parametre } from '../components/Parametre';
import ModalConfirmeG from '../Modal/Gestionnaire/ModalConfirmeG';
import axios from 'axios';
import { toast } from 'react-toastify';

const Gestionnaire = () => {

    const [AffGestionnarire,setAffGestionnaire]=useState([])
    const { Parametrevisible1 } = useContext(Parametre);
    const tableRef = useRef(null);

    const [showConfirm, setShowConfirm] = useState(false); // État pour la modal de confirmation
    const [deleteGestionID, setdeleteGestionID] = useState(null); 

    const handleShowConfirm = (id) => {
    setdeleteGestionID(id); // Définir l'ID de la salle à supprimer
     setShowConfirm(true);
   };

   const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`http://backend:4000/api/utilisateur/supprimer/${deleteGestionID}`);
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


   
   const handleCloseConfirm = () => setShowConfirm(false);

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
        const fecthAllPoule = async ()=>{
            try {
                const res = await fetch("http://backend:4000/api/utilisateur/");
                const rs = await res.json();
                const format = Object.values(rs);
                setAffGestionnaire(format);
         
               
      
            } catch (err) {
                console.log(err)
            }
        };
        fecthAllPoule();
      
      },[]);
      
      useEffect(() =>{
        if (AffGestionnarire.length > 0) {
          initializeDataTable()
        }
      
      },[AffGestionnarire,Parametrevisible1])
  return (
    <div className="content-wrapper">
    <div className="row">
     
     <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Table des Gestionnaire</h4>
              {!Parametrevisible1 && <ModalAddGestionnaire/>}

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
                      <th>Nom d'utilisateur</th>
                      <th>email</th>
                      <th>Role</th>
                      <th>Nom complet</th>
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
                    {AffGestionnarire.map((Index) => (
                      <tr key={Index.id}>
                        <td>{Index.idGestionnaire}</td>
                        <td>{Index.nomUtilisateur}</td>
                        <td>{Index.email}</td>
                        <td>{Index.isAdmin === 1 ? "Administrateur" : "Gestionnaire"}</td>
                        <td>{Index.NomComplet}</td>

                        <td
                          style={{
                            display: !Parametrevisible1 ? "table-cell" : "none",
                          }}
                        >
                          <ModalModGestionnaire Index={Index} />
                          <button
                            type="button"
                            className="btn    btn-sm btn-move"
                            style={{ marginLeft: 10, height: 10 }}
                            onClick={() => handleShowConfirm(Index.idGestionnaire)}
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
      <ModalConfirmeG
          show={showConfirm}
          handleClose={handleCloseConfirm}
          handleConfirm={handleConfirmDelete}
          message="Êtes-vous sûr de vouloir supprimer cette gestionnaire ?"
        />
    </div>
  )
}

export default Gestionnaire