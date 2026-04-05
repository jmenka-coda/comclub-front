import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import CreateModal from './CreateModal';
import PhoneInput from 'react-phone-number-input'
import toast from 'react-hot-toast';
import { createVisitor } from '../http/rentalAPI';

const SearchBar = observer(() => {
    const { rental } = useContext(Context)
    const [show, setShow] = useState(false)
    const [formData, setFormData] = useState({
        fullName: "",
        dateOfBirth: "",
        phone: ""
    })

    const onSave = async () => {

        const visitor = await createVisitor(formData)
            .then(data => {
                toast.success(`Клиент ${formData.fullName} успешно добвален!`)

                rental.setVisitors([...rental.visitors, formData])

                setFormData({
                    fullName: "",
                    dateOfBirth: "",
                    phone: ""
                })
            })
    }

    return (
        <>
            <CreateModal
                show={show}
                handleClose={() => setShow(false)}
                onSave={onSave}
                children={
                    <>
                        <Form.Label>ФИО</Form.Label>
                        <Form.Control
                            className='mb-3'
                            required
                            type="text"
                            placeholder="ФИО"
                            value={formData.fullName}
                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        />
                        <Form.Label>Дата рождения</Form.Label>
                        <Form.Control
                            className='mb-3'
                            required
                            type="date"
                            placeholder="Дата рождения"
                            value={formData.dateOfBirth}
                            onChange={(e) => {
                                console.log(e.target.value)
                                setFormData({ ...formData, dateOfBirth: e.target.value })
                            }}
                        />
                        <Form.Label>Номер телефона</Form.Label>
                        <div style={{ maxWidth: 30 }}>
                            <PhoneInput
                                international
                                defaultCountry='BY'
                                className='mb-3'
                                required
                                value={formData.phone}
                                onChange={(phoneValue) => setFormData({ ...formData, phone: phoneValue || '' })}
                            />
                        </div>
                        <Form.Control.Feedback type="invalid"> Заполните все поля! </Form.Control.Feedback>
                    </>
                }
            />

            <Row className="mb-3 align-items-center g-2">
                <Col>
                    <InputGroup>
                        <Form.Control
                            placeholder="Введите имя"
                            aria-label="Recipient's username"
                        />
                        <Button variant="outline-secondary">
                            Найти
                        </Button>
                    </InputGroup>
                </Col>
                <Col xs="auto">
                    <Button
                        variant="success"
                        className="ms-2"
                        onClick={() => setShow(true)}
                    >
                        Создать клиента
                    </Button>
                </Col>
            </Row>
        </>
    );
});

export default SearchBar;