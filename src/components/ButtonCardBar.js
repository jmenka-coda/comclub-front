import React from 'react'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { RENTALS_ROUTE } from '../utils/consts';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';


const ConfirmDeleteModal = ({ show, onHide, onConfirm, isDeleting }) => (
    <Modal show={show} onHide={onHide} centered>
        <Modal.Header closeButton>
            <Modal.Title>Подтверждение удаления</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Вы уверены, что хотите удалить этот компьютер?</p>
            <p className="text-muted small">Это действие нельзя отменить.</p>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onHide} disabled={isDeleting}>
                Отмена
            </Button>
            <Button variant="danger" onClick={onConfirm} disabled={isDeleting}>
                {isDeleting ? (
                    <>
                        <Spinner size="sm" animation="border" className="me-2" />
                        Удаление...
                    </>
                ) : 'Удалить'}
            </Button>
        </Modal.Footer>
    </Modal>
);

const ButtonCardBar = observer(({
    onClickDelete,
    onClickSelect,
    isSelectedCard,
    isDeleting = false
}) => {
    const [modalShow, setModalShow] = React.useState(false);
    const location = useLocation();

    const handleDelete = async () => {
        await onClickDelete();
        setModalShow(false);
    }

    return (
        <Row className='align-items-center mt-3'>
            <Col>
                <Button
                    className='me-3'
                    variant="warning"
                    disabled={isDeleting}
                >
                    Изменить
                </Button>

                <Button
                    variant="danger"
                    onClick={() => setModalShow(true)}
                    disabled={isDeleting}
                >
                    {isDeleting ? 'Удаление...' : 'Удалить'}
                </Button>
            </Col>

            <ConfirmDeleteModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                onConfirm={handleDelete}
                isDeleting={isDeleting}
            />

            {location.pathname !== RENTALS_ROUTE && (
                <Col xs='auto'>
                    <Button
                        variant={isSelectedCard ? "secondary" : "primary"}
                        onClick={onClickSelect}
                        disabled={isDeleting}
                    >
                        {isSelectedCard ? 'Убрать выбор' : 'Выбрать в сессию'}
                    </Button>
                </Col>
            )}
        </Row>
    );
});

export default ButtonCardBar;