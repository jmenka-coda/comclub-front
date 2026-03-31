import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const CreateModal = ({ show, handleClose, children, onSave }) => {
    const [validated, setValidated] = useState(false)

    const handleValidate = async (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault()
            event.stopPropagation()
            setValidated(true)
            return
        }

        setValidated(true)

        try {
            await onSave();
        } catch (error) {
            
        }
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Создание</Modal.Title>
                </Modal.Header>
                <Form
                    noValidate
                    validated={validated}
                    onSubmit={handleValidate}                    
                >
                    <Modal.Body>
                        {children}
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Отмена
                        </Button>
                        <Button type="submit" variant="primary">
                            Сохранить
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
};

export default CreateModal;