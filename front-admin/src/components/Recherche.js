import React ,{useState}from 'react'
import {useNavigate} from "react-router-dom"

function Recherche() {
    const [searchItem, setsearchItem] = useState('');
    const history = useNavigate();

    const sidebarItem = [
      
     { name: "Dashboard", path: "/"},
     { name: "Maladie", path: "/maladie"},
     { name: "Materiel", path: "/materiel"},
     { name: "Salle", path: "/salle"},
     { name: "Ration", path: "/ration"},
     { name: "medicament", path: "/vacin"},
     { name: "Stock", path: "/stock"},
     { name: "caract", path: "/caractere"},
     { name: "programme", path: "/programme"},
     { name: "vide", path: "/Vide_sanitaire"}
        
    ];

    const handleSearch = (e) =>{
        setsearchItem(e.target.value);
        const item = sidebarItem.find((i)=>i.name.toLowerCase() === e.target.value.toLowerCase());

        if (item) {
            history(item.path)
           setsearchItem('') 
        }

    }
  return (
    <div className="nav-search">
        <div className="input-group"> 
         <input type="text" className="form-control" placeholder="Rechercher une Page..." value={searchItem} onChange={handleSearch}/>
         <div className="input-group-append">
              <span className="input-group-text" id="search">
                <i className="typcn typcn-zoom"></i>
              </span>
            </div>  
        <ul>
            {sidebarItem.map((item)=>{
                <li key={item.name} onClick={() =>history.push(item.path)}>
                    {item.name}
                </li>
            })}
        </ul>
        </div>
    </div>
  )
}

export default Recherche