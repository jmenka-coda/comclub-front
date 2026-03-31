import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const CreateModal = ({ show, handleClose, children, onSave }) => {
    const [validated, setValidated] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const handleValidate = async (event) => {
        event.preventDefault(); // 👈 Всегда вызывайте preventDefault

        console.log("Form submitted");

        const form = event.currentTarget;
        const isValid = form.checkValidity();

        console.log("Form validity:", isValid);

        if (!isValid) {
            console.log("Form is invalid");
            event.stopPropagation();
            setValidated(true);
            return;
        }

        console.log("Form is valid, calling onSave");
        setValidated(true);

        if (onSave) {
            setIsSaving(true);
            try {
                await onSave();
                console.log("onSave completed successfully");
                // Закрываем модалку только после успешного сохранения
                handleClose();
            } catch (error) {
                console.error("Error in onSave:", error);
            } finally {
                setIsSaving(false);
            }
        }
    }

    return (
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
                    <Button
                        variant="secondary"
                        onClick={handleClose}
                        disabled={isSaving}
                    >
                        Отмена
                    </Button>
                    <Button
                        type="submit"
                        variant="primary"
                        disabled={isSaving}
                    >
                        {isSaving ? 'Сохранение...' : 'Сохранить'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default CreateModal;