import Modal from 'react-bootstrap/Modal';
import Button from "react-bootstrap/Button";

const ModalComponent=(props)=>{

    return(
        <Modal show={props.showModal} onHide={props.handleCloseModal}>
        <Modal.Header closeButton>
            <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>props.post.body</Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={props.handleCloseModal}>
            Close
            </Button>
            <Button variant="primary" onClick={props.handleCloseModal}>
            Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
    )
    
}

export default ModalComponent;
