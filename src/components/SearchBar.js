import React, { useContext, useState, useEffect } from 'react'
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

const SearchBar = observer(({ visitors, onFilteredChange }) => {
    const { rental } = useContext(Context)
    const [show, setShow] = useState(false)
    const [searchName, setSearchName] = useState('')
    const [formData, setFormData] = useState({
        fullName: "",
        dateOfBirth: "",
        phone: ""
    })

    useEffect(() => {
        const searchTerm = searchName.toLowerCase().trim();
        
        if (!searchTerm) {
            onFilteredChange(visitors);
        } else {
            const filtered = visitors.filter(v =>
                v.fullName.toLowerCase().includes(searchTerm)
            );
            onFilteredChange(filtered);
        }
    }, [searchName, visitors, onFilteredChange]);

    const onSave = async () => {
        try {
            const newVisitor = await createVisitor(formData);
            toast.success(`Клиент ${formData.fullName} успешно добавлен!`);
            
            const updatedVisitors = [...visitors, newVisitor];
            rental.setVisitors(updatedVisitors);
            onFilteredChange(updatedVisitors)
            
            setFormData({
                fullName: "",
                dateOfBirth: "",
                phone: ""
            });
            
            setShow(false);
            setSearchName(''); // Сбрасываем поиск
        } catch (error) {
            toast.error('Ошибка при добавлении клиента');
            console.error(error);
        }
    }

    return (
        <>
            <CreateModal
                show={show}
                handleClose={() => setShow(false)}
                onSave={onSave}
            >
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
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                />
                
                <Form.Label>Номер телефона</Form.Label>
                <div style={{ maxWidth: '300px' }}>
                    <PhoneInput
                        international
                        defaultCountry='BY'
                        className='mb-3'
                        required
                        value={formData.phone}
                        onChange={(phoneValue) => setFormData({ ...formData, phone: phoneValue || '' })}
                    />
                </div>
            </CreateModal>

            <Row className="mb-3 align-items-center g-2">
                <Col>
                    <InputGroup>
                        <Form.Control
                            placeholder="Поиск по имени"
                            value={searchName}
                            onChange={e => {
                                setSearchName(e.target.value);
                            }}
                        />
                        <Button variant="outline-secondary">
                            Найти ({visitors.length})
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