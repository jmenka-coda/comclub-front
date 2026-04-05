import { observer } from 'mobx-react-lite';
import React, { useContext, useState } from 'react';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FilterBar from './FilterBar';
import { Context } from '..';
import CreateModal from './CreateModal';
import { createPackage } from '../http/rentalAPI';
import toast from 'react-hot-toast';

const PackFilterBar = observer(({ packages }) => {
    const { rental } = useContext(Context)
    const [show, setShow] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        timeMinutes: "",
        typeSpecifComp: "",
        timeDay: "",
        price: 0
    })

    const filters = [
        { key: 'timeMinutes', label: 'Продолжительность (минут)' },
        { key: 'typeSpecifComp', label: 'Тип компьютера' },
        { key: 'timeDay', label: 'Время суток' },
        { key: 'price', label: 'Стоимость' }
    ];

    const onSave = async () => {
        let time = 0
        const [h, m] = formData.timeMinutes.split(':')
        time = parseInt(h) * 60 + parseInt(m)

        const pck = await createPackage({ ...formData, timeMinutes: time })
            .then(data => {
                toast.success(`Пакет услуг "${formData.name}" успешно создан!`)

                rental.setPackages([...rental.packages, formData])

                setFormData({
                    name: "",
                    timeMinutes: "",
                    typeSpecifComp: "",
                    timeDay: "",
                    price: 0
                })                
            })
    }

    return (<>
        <CreateModal
            show={show}
            handleClose={() => setShow(false)}
            onSave={onSave}
            children={
                <>
                    <Form.Label>Название</Form.Label>
                    <Form.Control
                        className='mb-3'
                        required
                        type="text"
                        placeholder="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Form.Label>Время</Form.Label>
                    <Form.Control
                        className='mb-3'
                        required
                        type="time"
                        placeholder="Время"
                        value={formData.timeMinutes}
                        onChange={(e) => setFormData({ ...formData, timeMinutes: e.target.value })}
                    />
                    <Form.Label>Тип компьютера</Form.Label>
                    <Form.Select
                        className='mb-3'
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
                    <Form.Label>Время суток</Form.Label>
                    <Form.Select
                        className='mb-3'
                        required
                        type="text"
                        placeholder="Бренд"
                        value={formData.timeDay}
                        onChange={(e) => setFormData({ ...formData, timeDay: e.target.value })}
                    >
                        <option value=""> Выберите время суток </option>
                        <option value="morning">Утренний</option>
                        <option value="afternoon">Обеденный</option>
                        <option value="evening">Вечерний</option>
                        <option value="night">Ночной</option>
                    </Form.Select>
                    <Form.Label>Стоимость</Form.Label>
                    <Form.Control
                        className='mb-3'
                        required
                        type="number"
                        min={0}
                        step={0.01}
                        placeholder="Стоимость"
                        value={formData.price}
                        onChange={(e) => {
                            setFormData({ ...formData, price: parseFloat(parseFloat(e.target.value).toFixed(2)) });
                        }}
                    />
                    <Form.Control.Feedback type="invalid"> Заполните все поля! </Form.Control.Feedback>
                </>
            }
        />

        <FilterBar
            objects={packages}
            filters={filters}
            btn={
                <Button
                    className='me-2'
                    variant='success'
                    onClick={() => setShow(true)}
                >
                    Создать пакет услуг
                </Button>
            }
        />
    </>
    );
});

export default PackFilterBar;