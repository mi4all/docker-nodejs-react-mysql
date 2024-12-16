import React, { useEffect, useState } from 'react'
import { Link,  useLocation } from 'react-router-dom'
import { useContext } from 'react';
import { Parametre } from './Parametre';
import { Button } from 'react-bootstrap';

function Navbar() {
  const location = useLocation();
  const {Parametrevisible1, showParametre1, hideParametre1} = useContext(Parametre)
  const [notification,setnotification]=useState([])
  const [notificationCount,setnotificationCount]=useState(0)
  const [isAfficher,setisAfficher]=useState(false)
  const [utilisateur, setUtilisateur] = useState(null);

  useEffect(() => {
      // Vérifier si l'utilisateur est dans le localStorage
      const user = JSON.parse(localStorage.getItem("user"));

      if (user) {
          setUtilisateur(user);
      }
  }, []);

  // useEffect(()=>{
  //   const message = localStorage.getItem('alertMessage')
  //   if (message) {
  //     setnotificationCount(1)
  //   }
  //   if (isAfficher) {
  //     setnotification([message])
  //     setnotificationCount(0)

  //     localStorage.removeItem('alertMessage_${pouleID}')
  //   }
  // },[isAfficher])

  

  useEffect(()=>{
    const storedMessage =JSON.parse(localStorage.getItem('notification')) || []
    
    setnotification(storedMessage)
  },[])
const clear = () =>{
  localStorage.removeItem('notification')
 
}
  

  return (
    <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
    
    <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
      
      <a className="navbar-brand brand-logo" href="#"><img src="kit/images/logo.svg" alt="logo"/></a>
      <a className="navbar-brand brand-logo-mini" href="#"><img src="kit/images/logo-mini.svg" alt="logo"/></a>
      <button className="navbar-toggler navbar-toggler align-self-center d-none d-lg-flex" type="button" data-toggle="minimize">
        <span className="typcn typcn-th-menu"></span>
      </button>
    </div>
    <div className="navbar-menu-wrapper d-flex align-items-center justify-content-end">
      <ul className="navbar-nav mr-lg-2">
        <li className={`nav-item  d-none d-lg-flex ${location.pathname === '/Poules' ? 'activeNavbar' : ''}`} >
         
        
          <Link className="nav-link" to='/Poules'>
            Poules
          </Link>
        </li>
        
        <li className="nav-item  d-none d-lg-flex">
          <a className="nav-link " href="#">
            Statistic
          </a>
        </li>
        <li className={`nav-item  d-none d-lg-flex ${location.pathname === '/gestionnaire' ? 'activeNavbar' : ''}`} >
         
        
         <Link className="nav-link" to='/gestionnaire'>
           Gestionnaire
         </Link>
       </li>
      </ul>
      <ul className="navbar-nav navbar-nav-right">
        <li className="nav-item d-none d-lg-flex  mr-2">
          <a className="nav-link" href="#">
            Help
          </a>
        </li>
        <li className="nav-item dropdown d-flex">
          <a className="nav-link count-indicator dropdown-toggle d-flex justify-content-center align-items-center" id="messageDropdown" href="#" data-toggle="dropdown">
            <i className="typcn typcn-message-typing"></i>
            <span className="count bg-success">2</span>
          </a>
          <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="messageDropdown">
            <p className="mb-0 font-weight-normal float-left dropdown-header">Messages</p>
            <a className="dropdown-item preview-item">
              <div className="preview-thumbnail">
                <img src="kit/images/faces/face4.jpg" alt="image" className="profile-pic"/>
              </div>
              <div className="preview-item-content flex-grow">
                <h6 className="preview-subject ellipsis font-weight-normal">David Grey
                </h6>
                <p className="font-weight-light small-text mb-0">
                  The meeting is cancelled
                </p>
              </div>
            </a>
            <a className="dropdown-item preview-item">
              <div className="preview-thumbnail">
                <img src="kit/images/faces/face2.jpg" alt="image" className="profile-pic"/>
              </div>
              <div className="preview-item-content flex-grow">
                <h6 className="preview-subject ellipsis font-weight-normal">Tim Cook
                </h6>
                <p className="font-weight-light small-text mb-0">
                  New product launch
                </p>
              </div>
            </a>
            <a className="dropdown-item preview-item">
              <div className="preview-thumbnail">
                <img src="kit/images/faces/face3.jpg" alt="image" className="profile-pic"/>
              </div>
              <div className="preview-item-content flex-grow">
                <h6 className="preview-subject ellipsis font-weight-normal"> Johnson
                </h6>
                <p className="font-weight-light small-text mb-0">
                  Upcoming board meeting
                </p>
              </div>
            </a>
          </div>
        </li>
        <li className="nav-item dropdown  d-flex">
          <a className="nav-link count-indicator dropdown-toggle d-flex align-items-center justify-content-center" id="notificationDropdown" href="#" onClick={clear} data-toggle="dropdown">
            <i className="typcn typcn-bell mr-0"></i>
            <span className="count bg-danger">{notification.length}</span>
          </a>
         
          <div className="dropdown-menu dropdown-menu-right navbar-dropdown preview-list" aria-labelledby="notificationDropdown">
            <p className="mb-0 font-weight-normal float-left dropdown-header">Notifications</p>
            {notification.length > 0 ?( notification.map((notifList,Index)=>( 
            <a className="dropdown-item preview-item" key={Index}>
              <div className="preview-thumbnail">
                <div className="preview-icon bg-success">
                  <i className="typcn typcn-info-large mx-0"></i>
                </div>
              </div>
              <div className="preview-item-content">
                <h6 className="preview-subject font-weight-normal" key={Index}>{`Poule  ${notifList.pouleID}: ${notifList.message}`}</h6>
                
              
              </div>
            </a>
            ))

          ) : ( 
             <div className="preview-item-content">
                <h6 className="preview-subject font-weight-normal">Aucune notification</h6>
                
              
              </div>
           
          )}
          </div>
         
        </li>
        <li className="nav-item nav-profile dropdown">
          <a className="nav-link dropdown-toggle  pl-0 pr-0" href="#" data-toggle="dropdown" id="profileDropdown">
            <i className="typcn typcn-user-outline mr-0"></i>
            <span className="nav-profile-name">{utilisateur ? ` ${utilisateur.NomComplet}` : "Chargement..."}</span>
          </a>
          <div className="dropdown-menu dropdown-menu-right navbar-dropdown" aria-labelledby="profileDropdown">
             
                 
             

            {!Parametrevisible1 && (  <Button className="dropdown-item" onClick={showParametre1}>
                 <i className="typcn typcn-cog text-primary" ></i>
                   masquer Settings 
              </Button>
          
             )}
             {Parametrevisible1 && (  <Button className="dropdown-item"  onClick={hideParametre1}>
              <i className="typcn typcn-cog text-primary" ></i>
              afficher Settings
                 </Button>
       
          )}
            
            
          
            <Link className="dropdown-item" to='/login'>
            <i className="typcn typcn-power text-primary"></i>
            Logout
            </Link>
          </div>
        </li>
      </ul>
      <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-toggle="offcanvas">
        <span className="typcn typcn-th-menu"></span>
      </button>
    </div>
  </nav>
  )
}

export default Navbar