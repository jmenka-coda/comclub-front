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
import { createComputer, createSpecification, fetchSpecifications } from '../http/rentalAPI';
import { Context } from '..';


const CompFilterBar = observer(({ computers }) => {
    const { rental } = useContext(Context)
    const [show, setShow] = useState(false)
    const [newScf, setNewScf] = useState(true)
    const [formData, setFormData] = useState({
        brand: "Br1",
        model: "M1",
        specificationId: 0,
        typeSpecifComp: "",
        monitor: "Mon1",
        RAM: "Ram1",
        graphicsCard: "gr1"
    })

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
        let specifId = formData.specificationId

        if (newScf) {
            const specif = await createSpecification({
                typeSpecifComp: formData.typeSpecifComp,
                monitor: formData.monitor,
                RAM: formData.RAM,
                graphicsCard: formData.graphicsCard
            })

            specifId = specif.id
        }

        const computer = await createComputer({
            model: formData.model,
            brand: formData.brand,
            specificationId: specifId
        })
            .then(data => {
                setFormData({
                    brand: "",
                    model: "",
                    specificationId: 0,
                    typeSpecifComp: "",
                    monitor: "",
                    RAM: "",
                    graphicsCard: ""
                })
            })
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
                onSave={onSave}
                children={
                    <>
                        <Form.Label>Бренд</Form.Label>
                        <Form.Control
                            className='mb-3'
                            required
                            type="text"
                            placeholder="Бренд"
                            value={formData.brand}
                            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                        />
                        <Form.Control.Feedback type="invalid"> Заполните бренд! </Form.Control.Feedback>
                        <Form.Label>Модель</Form.Label>
                        <Form.Control
                            className='mb-3'
                            required
                            type="text"
                            placeholder="Модель"
                            value={formData.model}
                            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
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
                                value={formData.typeSpecifComp}
                                onChange={(e) => setFormData({ ...formData, typeSpecifComp: e.target.value })}
                            >
                                <option value=""> Выберите тип </option>
                                <option value="weak">Слабый</option>
                                <option value="average">Средний</option>
                                <option value="powerful">Мощный</option>
                            </Form.Select>
                            <Form.Label>Монитор</Form.Label>
                            <Form.Control
                                className='mb-3'
                                required
                                type="text"
                                placeholder="Монитор"
                                value={formData.monitor}
                                onChange={(e) => setFormData({ ...formData, monitor: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid"> Заполните монитор! </Form.Control.Feedback>
                            <Form.Label>ОЗУ</Form.Label>
                            <Form.Control
                                className='mb-3'
                                required
                                type="text"
                                placeholder="ОЗУ"
                                value={formData.RAM}
                                onChange={(e) => setFormData({ ...formData, RAM: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid"> Заполните ОЗУ! </Form.Control.Feedback>
                            <Form.Label>Видеокарта</Form.Label>
                            <Form.Control
                                className='mb-3'
                                required
                                type="text"
                                placeholder="Видеокарта"
                                value={formData.graphicsCard}
                                onChange={(e) => setFormData({ ...formData, graphicsCard: e.target.value })}
                            />
                            <Form.Control.Feedback type="invalid"> Заполните модель видеокарты! </Form.Control.Feedback>
                        </> : <>
                            <Typeahead
                                className={`mb-1`}
                                id='specification-typeahead'
                                labelKey={(spc) => `${spc.typeSpecifComp}, ${spc.monitor}, ${spc.RAM}, ${spc.graphicsCard}`}
                                onChange={(selected) => {
                                    setFormData({ ...formData, specificationId: selected[0].id })
                                    console.log(formData)
                                }}
                                options={rental.specifications}
                                placeholder='Выберите сборку'
                            />
                        </>}
                    </>
                }
            />

            <FilterBar
                objects={computers}
                filters={filters}
                btn={
                    <Button
                        className='me-2'
                        variant="success"
                        onClick={() => setShow(true)}
                    >
                        Создать компьютер
                    </Button>
                }
            />
        </>
    );
});

export default CompFilterBar;