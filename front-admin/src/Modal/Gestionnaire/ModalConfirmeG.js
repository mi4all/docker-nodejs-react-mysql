import React from 'react'
import { Modal, Button } from "react-bootstrap";
function ModalConfirmeG({ show, handleClose, handleConfirm, message }) {
  return (
    <Modal show={show} centered>
    <Modal.Header >
      <Modal.Title>Confirmation</Modal.Title>
    </Modal.Header>
    <Modal.Body>{message}</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Annuler
      </Button>
      <Button variant="danger" onClick={handleConfirm}>
        Supprimer
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default ModalConfirmeG