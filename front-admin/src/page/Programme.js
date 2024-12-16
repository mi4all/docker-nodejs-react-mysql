import React, { useEffect, useState } from 'react'
import {Button, Modal} from "react-bootstrap";
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {Calendar,momentLocalizer} from 'react-big-calendar'
import moment from "moment"
import axios from 'axios';
import { toast } from 'react-toastify';
const localizer = momentLocalizer(moment)

export default function Programme() {
 const [selectedEvent, setSelectedEvent] = useState(null); // Stocke l'événement sélectionné
const [showModal, setShowModal] = useState(false);
 const [events, setEvents] = useState([]);


 

  useEffect(()=>{
    axios.get('http://backend:4000/api/prod/affiche')
    .then(response => {
      // Transformer les données en format attendu par React Big Calendar
      const formattedEvents = response.data.map(event => ({
        title: event.title,
        start: new Date(event.start), // Convertir la date en objet Date
        end: new Date(event.start),   // Même date pour début/fin
        categorie: event.categorie,
        idVaccin:event.idVaccin,
        frequence:event.frequence,
        idPoule:event.idPoule,
        id:event.id,
        Fait:event.Fait
      }));
      setEvents(formattedEvents);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des événements :', error);
    });

  },[])


  const handleSelectEvent = (event) => {
    setSelectedEvent(event); // Stocker l'événement sélectionné
    setShowModal(true); // Ouvrir la modal
  };

  const eventPropGetter = (event) => {
    const backgroundColor = event.Fait ? "#6cc644" : "#f44336"; // Vert pour "fait", rouge pour "non fait"
    const style = {
      backgroundColor,
      color: "white",
      borderRadius: "5px",
      border: "none",
    };
    return { style };
  };

  const handleMarkAsDoneAndAddProgramme = () => {
   
  
    axios
      .post('http://backend:4000/api/prod/marquer_fait', {
        id: selectedEvent.id, // ID du programme actuel
        idPoule: selectedEvent.idPoule, // ID de la poule
        idTraitement: selectedEvent.idVaccin, // ID du traitement
        dateDernier: selectedEvent.start, // Date actuelle comme dateDernier
        frequence:selectedEvent.frequence, // Fréquence (en jours)
      })
      .then(() => {
        toast.success('programme fait avec success')
        axios.get('http://backend:4000/api/prod/affiche')
        .then(response => {
          // Transformer les données en format attendu par React Big Calendar
          const formattedEvents = response.data.map(event => ({
            title: event.title,
            start: new Date(event.start), // Convertir la date en objet Date
            end: new Date(event.start),   // Même date pour début/fin
            categorie: event.categorie,
            idVaccin:event.idVaccin,
            frequence:event.frequence,
            idPoule:event.idPoule,
            id:event.id,
            Fait:event.Fait
          }));
          setEvents(formattedEvents);
        })
         
        setShowModal(false);
        
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour et de l’ajout du programme :', error);
        alert('Erreur lors de la mise à jour du programme.');
      });
  };
  

  
  
  return (
    <div class="content-wrapper">
      <div className="row">
        <div class="col-lg-12 grid-margin stretch-card">
          <div class="card">
          <div
              style={{
                display:'flex',
                gap:'15px',
                marginLeft:'280px',
                marginTop:'20px'
                
              }}
              
              > 
              <div
                style={{
                  width:'20px',
                  height:'20px',
                  borderRadius:'50%',
                  backgroundColor: '#6cc644',
                   marginLeft:'50px'
                }}
              
              >
             
              </div>
              <span>Programme Fait</span>
              <div
                style={{
                  width:'20px',
                  height:'20px',
                  borderRadius:'50%',
                  backgroundColor: 'red',
                   marginLeft:'50px',
                  
                }}
              
              >
             
              </div>
              <span>Programme pas encore Fait</span>
              </div>
            <div class="card-body">
              <h4 class="card-title">Bordered table</h4>
             
              {/* Calendrier */}
              <div style={{ height: "500px" }}>
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: "100%" }}
                  onSelectEvent={handleSelectEvent}
                  eventPropGetter={eventPropGetter}
                />

                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Détails de l'Événement</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {selectedEvent ? (
                      <div>
                        <p>
                          <strong>Événement :</strong> {selectedEvent.title}
                        </p>
                        <p>
                          <strong>Date :</strong>{" "}
                          {moment(selectedEvent.start).format("YYYY-MM-DD")}
                        </p>
                        <p>
                          <strong>Catégorie de Poule :</strong>{" "}
                          {selectedEvent.categorie}
                        </p>
                        <p>
                          <strong>Status :</strong>{" "}
                          {selectedEvent.Fait ? "Fait" : "Non fait"}
                        </p>
                      </div>
                    ) : (
                      <p>Aucun événement sélectionné.</p>
                    )}
                  </Modal.Body>
                  <Modal.Footer>
                    {!selectedEvent?.Fait && ( // N'afficher le bouton que si l'événement n'est pas marqué comme fait
                      <Button variant="success" onClick={handleMarkAsDoneAndAddProgramme}>
                        Marquer comme fait
                      </Button>
                    )}
                    <Button
                      variant="danger"
                      onClick={() => setShowModal(false)}
                    >
                      Fermer
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="theme-setting-wrapper">
        <div id="settings-trigger">
          <i class="typcn typcn-cog-outline"></i>
        </div>
        <div id="theme-settings" class="settings-panel">
          <i class="settings-close typcn typcn-delete-outline"></i>
          <p class="settings-heading">SIDEBAR SKINS</p>
          <div class="sidebar-bg-options" id="sidebar-light-theme">
            <div class="img-ss rounded-circle bg-light border mr-3"></div>
            Light
          </div>
          <div class="sidebar-bg-options selected" id="sidebar-dark-theme">
            <div class="img-ss rounded-circle bg-dark border mr-3"></div>
            Dark
          </div>
          <p class="settings-heading mt-2">HEADER SKINS</p>
          <div class="color-tiles mx-0 px-4">
            <div class="tiles success"></div>
            <div class="tiles warning"></div>
            <div class="tiles danger"></div>
            <div class="tiles primary"></div>
            <div class="tiles info"></div>
            <div class="tiles dark"></div>
            <div class="tiles default border"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
