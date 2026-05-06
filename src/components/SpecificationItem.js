import React, { useContext, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import ButtonCardBar from './ButtonCardBar'
import CreateModal from './CreateModal'
import { deleteSpecification, updateSpecification } from '../http/rentalAPI'
import toast from 'react-hot-toast'
import { specTypeLabel } from '../utils/enumLabels'

const SpecificationItem = observer(({ specification }) => {
    const { rental } = useContext(Context)
    const [isDeleting, setIsDeleting] = useState(false)
    const [showEdit, setShowEdit] = useState(false)
    const [formData, setFormData] = useState({ ...specification })

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            await deleteSpecification(specification.id)
            rental.setSpecification(rental.specifications.filter((spc) => spc.id !== specification.id))
            toast.success('Характеристика удалена')
        } catch (error) {
            toast.error('Нельзя удалить: характеристика связана с компьютером')
        } finally {
            setIsDeleting(false)
        }
    }

    const handleUpdate = async () => {
        const updated = await updateSpecification(specification.id, formData)
        rental.setSpecification(rental.specifications.map((spc) => (spc.id === specification.id ? updated : spc)))
        toast.success('Характеристика обновлена')
        setShowEdit(false)
    }

    return (
        <>
            <CreateModal
                title="Изменение характеристики"
                show={showEdit}
                handleClose={() => setShowEdit(false)}
                onSave={handleUpdate}
            >
                <Form.Label>Тип компьютера</Form.Label>
                <Form.Select
                    className='mb-3'
                    required
                    value={formData.typeSpecifComp}
                    onChange={(e) => setFormData({ ...formData, typeSpecifComp: e.target.value })}
                >
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

            <Card className='mb-4'>
                <Card.Header as="h5">Характеристика #{specification.id}</Card.Header>
                <Card.Body>
                    <Card.Text><strong>Тип:</strong> {specTypeLabel(specification.typeSpecifComp)}</Card.Text>
                    <Card.Text><strong>Монитор:</strong> {specification.monitor}</Card.Text>
                    <Card.Text><strong>ОЗУ:</strong> {specification.RAM}</Card.Text>
                    <Card.Text><strong>Видеокарта:</strong> {specification.graphicsCard}</Card.Text>
                    <ButtonCardBar
                        onClickDelete={handleDelete}
                        isDeleting={isDeleting}
                        onClickChange={() => setShowEdit(true)}
                    />
                </Card.Body>
            </Card>
        </>
    )
})

export default SpecificationItem
