import React from 'react'
import ModalAddPoule from '../Modal/Poules/ModalAddPoule'


function Poule() {
  // const [notif,setnotif]=useState([])
  // useEffect(()=>{
  //   const historique = JSON.parse(localStorage.getItem('notification')) || []
  //   setnotif(historique)

  //   const showAlertSequence =async () =>{
  //     for (const notification of historique)
  //       await  Swal.fire({
  //         title: `Alert de Programme pour le poule ID ${notification.pouleID}`,
  //         text: notification.message,
  //         icon: 'info',
  //         confirmButtonText: 'OK'
  //       })
  //       localStorage.removeItem('notification')
  //   }

  //   showAlertSequence()
    
    
   
  // },[])
  

  return (
    <div className="content-wrapper">
      <div className="row">
       <ModalAddPoule/>
      </div>
      </div>
  )
}

export default Poule