import React, { useEffect,  useState } from "react";

import ModalAaddPMald from '../Modal/PouleMalade/ModalAddPMald'
import axios from "axios";


 


 

function Table() {
 const [AffichagePouleMalade,setAffichagePouleMalade]=useState([])
 useEffect(()=>{
  const fecthAllMaladies = async ()=>{
    try {
      const res = await axios.get("http://backend:4000/GetAll");
       
      setAffichagePouleMalade(res.data);
        console.log(res.data);
        

    } catch (err) {
        console.log(err)
    }
};
fecthAllMaladies();

 },[])

   

    
      
      // Déterminer la couleur de la barre en fonction de l'état
      
  return (
    
    <div className="content-wrapper">
    <div className="row">
      
       <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Table du Vaccin</h4>
              {/* {!Parametrevisible1 && <ModalAaddMaladie />} */}
              <ModalAaddPMald/>

             
              <div className="table-responsive pt-3">
                <table
                  // ref={tableRef}
                  id="datatable-responsive"
                  className="table table-striped table-bordered dt-responsive nowrap"
                  cellspacing="0"
                  width="100%"
                >
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Date_entre</th>
                      <th>nombre_poule</th>
                      <th>date_trouve</th>
                      <th>Nom_Maladie</th>
                      <th>Traitements</th>
                      <th>symptomes</th>
                      <th
                        // style={{
                        //   width: 1,
                        //   display: !Parametrevisible1 ? "table-cell" : "none",
                        // }}
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {AffichagePouleMalade.map(Index=>( 
                   <tr key={Index.id}>
                   <td>{Index.id}</td>
                   <td>{Index.date_entre}</td>
                   <td>{Index.nombre}</td>
                   <td>{Index.Date_Trouve}</td>
                   <td>{Index.nom_maladies}</td>
                   <td>{Index.traitements}</td>
                   <td>{Index.symptomes}</td>

                      {/* <td
                        style={{
                          
                          display: !Parametrevisible1 ? "table-cell" : "none",
                        }}
                      >
                        <ModalModMaladie Index={Index}/>
                        <button
                          type="button"
                          className="btn    btn-sm btn-move"
                          style={{ marginLeft: 10,height:10}}
                          onClick={() => handleShowConfirm(Index.id)}
                        >
                          <i className="typcn typcn-trash " style={{color:'red'}}></i>
                         
                        </button>
                      </td> */}
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    
     
    </div>
  </div>
  )
}

export default Table