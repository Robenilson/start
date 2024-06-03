
import { Button, Modal } from 'react-bootstrap';
function ModalComponet( props ) {
    return (
        <Modal show={props.show} onHide={props.onHide}  >
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-body">
                    {props.children}
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>Fechar</Button>
                <Button variant="success" onClick={props.save}>Salvar</Button>
            </Modal.Footer>
        </Modal>
    );
}
export default ModalComponet
;
