import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Context } from '..'
import FilterBar from './FilterBar'
import CreateModal from './CreateModal'
import { createSpecification } from '../http/rentalAPI'
import toast from 'react-hot-toast'

const SpecFilterBar = observer(({ specifications, onFilteredChange }) => {
    const { rental } = useContext(Context)
    const [show, setShow] = useState(false)
    const [filtersState, setFiltersState] = useState({})
    const [formData, setFormData] = useState({
        typeSpecifComp: 'weak',
        monitor: '',
        RAM: '',
        graphicsCard: '',
    })

    useEffect(() => {
        if (!onFilteredChange) return
        const filtered = specifications.filter((item) =>
            Object.entries(filtersState).every(([key, value]) => !value || String(item[key]) === String(value)),
        )
        onFilteredChange(filtered)
    }, [specifications, filtersState, onFilteredChange])

    const onSave = async () => {
        const created = await createSpecification(formData)
        rental.setSpecification([...rental.specifications, created])
        toast.success('Характеристика создана')
        setFormData({
            typeSpecifComp: 'weak',
            monitor: '',
            RAM: '',
            graphicsCard: '',
        })
    }

    const filters = [
        { key: 'typeSpecifComp', label: 'Тип компьютера' },
        { key: 'monitor', label: 'Монитор' },
        { key: 'RAM', label: 'ОЗУ' },
        { key: 'graphicsCard', label: 'Видеокарта' },
    ]

    return (
        <>
            <CreateModal title="Создание характеристики" show={show} handleClose={() => setShow(false)} onSave={onSave}>
                <Form.Label>Тип компьютера</Form.Label>
                <Form.Select className='mb-3' required value={formData.typeSpecifComp} onChange={(e) => setFormData({ ...formData, typeSpecifComp: e.target.value })}>
                    <option value="weak">Слабый</option>
                    <option value="average">Средний</option>
                    <option value="powerful">Мощный</option>
                </Form.Select>
                <Form.Label>Монитор</Form.Label>
                <Form.Control className='mb-3' required value={formData.monitor} onChange={(e) => setFormData({ ...formData, monitor: e.target.value })} />
                <Form.Label>ОЗУ</Form.Label>
                <Form.Control className='mb-3' required value={formData.RAM} onChange={(e) => setFormData({ ...formData, RAM: e.target.value })} />
                <Form.Label>Видеокарта</Form.Label>
                <Form.Control className='mb-3' required value={formData.graphicsCard} onChange={(e) => setFormData({ ...formData, graphicsCard: e.target.value })} />
            </CreateModal>

            <FilterBar
                objects={specifications}
                filters={filters}
                onFilterChange={(key, value) => setFiltersState((prev) => ({ ...prev, [key]: value }))}
                currentFilters={filtersState}
                btnCreate={
                    <Button variant='success' onClick={() => setShow(true)}>
                        Создать характеристику
                    </Button>
                }
            />
        </>
    )
})

export default SpecFilterBar
