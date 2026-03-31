import { observer } from 'mobx-react-lite';
import React, { use, useContext, useEffect, useState } from 'react';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card'
import { FiFilter } from "react-icons/fi";
import FilterBar from './FilterBar';
import CreateModal from './CreateModal';
import { Typeahead } from 'react-bootstrap-typeahead'
import { fetchSpecifications } from '../http/rentalAPI';
import { Context } from '..';


const CompFilterBar = observer(({ computers }) => {
    const { rental } = useContext(Context)
    const [show, setShow] = useState(false)
    const [newScf, setNewScf] = useState(true)
    const [spc, setSpecification] = useState([])

    useEffect(() => {
        fetchSpecifications()
            .then(data => {
                rental.setSpecification(data)
            })
            .catch(error => {
                console.error('Ошибка загрузки:', error)
            })
    }, [])

    const onSave = async () => {
        
    }

    const filters = [
        { key: 'brand', label: 'Бренд' },
        { key: 'model', label: 'Модель' },
        { key: 'status', label: 'Статус' },
        { key: 'typeSpecifComp', label: 'Тип' }
    ];

    return (
        <>
            <CreateModal
                show={show}
                handleClose={() => setShow(false)}
                children={
                    <>
                        <Form.Label>Бренд</Form.Label>
                        <Form.Control
                            className='mb-3'
                            required
                            type="text"
                            placeholder="Бренд"
                        />
                        <Form.Control.Feedback type="invalid"> Заполните бренд! </Form.Control.Feedback>
                        <Form.Label>Модель</Form.Label>
                        <Form.Control
                            className='mb-3'
                            required
                            type="text"
                            placeholder="Модель"
                        />
                        <Form.Control.Feedback type="invalid"> Заполните модель! </Form.Control.Feedback>
                        <Form.Check
                            label="Новая сборка"
                            onClick={(event) => setNewScf(event.target.checked)}
                            defaultChecked={true}
                        />
                        {newScf ? <>
                            <Form.Label>Характеристики:</Form.Label>
                            <Form.Select
                                className='mb-3 mt-3'
                                required
                                type="text"
                                placeholder="Бренд"
                            >
                                <option value="1">Слабый</option>
                                <option value="2">Средний</option>
                                <option value="3">Мощный</option>
                            </Form.Select>
                            <Form.Label>Монитор</Form.Label>
                            <Form.Control
                                className='mb-3'
                                required
                                type="text"
                                placeholder="Монитор"
                            />
                            <Form.Control.Feedback type="invalid"> Заполните монитор! </Form.Control.Feedback>
                            <Form.Label>ОЗУ</Form.Label>
                            <Form.Control
                                className='mb-3'
                                required
                                type="text"
                                placeholder="ОЗУ"
                            />
                            <Form.Control.Feedback type="invalid"> Заполните ОЗУ! </Form.Control.Feedback>
                            <Form.Label>Видеокарта</Form.Label>
                            <Form.Control
                                className='mb-3'
                                required
                                type="text"
                                placeholder="Видеокарта"
                            />
                            <Form.Control.Feedback type="invalid"> Заполните модель видеокарты! </Form.Control.Feedback>
                        </> : <>
                            <Typeahead
                                className={`mb-1`}
                                id='specification-typeahead'
                                labelKey={(spc) => `${spc.typeSpecifComp}, ${spc.monitor}, ${spc.RAM}, ${spc.graphicsCard}`}
                                onChange={(selected) => {
                                    rental.setSelectedPackage(selected[0] || null);
                                }}
                                options={rental.specifications}
                                placeholder='Выберите сборку'
                            />
                        </>}
                    </>
                }
            />

            <FilterBar objects={computers} filters={filters} btn={
                <Button
                    className='me-2'
                    variant="success"
                    //onClick={handleCreate}
                    onClick={() => setShow(true)}
                >
                    Создать
                </Button>}
            />
        </>
    );
});

export default CompFilterBar;