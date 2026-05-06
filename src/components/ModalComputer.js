import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import Form from 'react-bootstrap/Form';
import { Typeahead } from 'react-bootstrap-typeahead'
import { Context } from '..';
import { specTypeLabel } from '../utils/enumLabels';


const ModalComputer = observer(({ formData, setFormData, newScf, setNewScf, isEdit = false }) => {
    const { rental } = useContext(Context)

    return (
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
            {!isEdit && (
                <Form.Check
                    label="Новая сборка"
                    onClick={(event) => setNewScf(event.target.checked)}
                    defaultChecked={true}
                />
            )}
            {!isEdit && (newScf ? <>
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
                    labelKey={(spc) => `${specTypeLabel(spc.typeSpecifComp)}, ${spc.monitor}, ${spc.RAM}, ${spc.graphicsCard}`}
                    onChange={(selected) => {
                        if (selected[0]) {
                            setFormData({ ...formData, specificationId: selected[0].id })
                        }
                    }}
                    options={rental.specifications}
                    placeholder='Выберите сборку'                
                />
            </>)}
        </>
    );
});

export default ModalComputer;