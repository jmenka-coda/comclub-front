import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card'
import ButtonCardBar from './ButtonCardBar';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { deleteVisitor, updateVisitor } from '../http/rentalAPI';
import toast from 'react-hot-toast';
import CreateModal from './CreateModal';
import Form from 'react-bootstrap/Form';


const VisitorItem = observer(({ visitor }) => {
    const { rental } = useContext(Context)
    const [isDeleting, setIsDeleting] = React.useState(false)
    const [showEdit, setShowEdit] = React.useState(false)
    const [formData, setFormData] = React.useState({
        fullName: visitor.fullName,
        dateOfBirth: visitor.dateOfBirth?.slice(0, 10) || '',
        phone: visitor.phone || '',
    })

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            await deleteVisitor(visitor.id)

            const updatedPkg = rental.visitors.filter(p => p.id !== visitor.id)
            rental.setVisitors(updatedPkg)
            
            if (isSelectedCard) {
                rental.setSelectedVisitor(null)
            }
            toast.success('Клиент успешно удален!')
        } catch (error) {           
            console.error('Ошибка удаления клиента:', error)
            toast.error('Этот клиент связан с сессиями')
        } finally {
            setIsDeleting(false)
        }
    }


    const isSelectedCard = visitor.id === rental.selectedVisitor?.id

    const handleUpdate = async () => {
        const updated = await updateVisitor(visitor.id, formData)
        rental.setVisitors(rental.visitors.map((v) => (v.id === visitor.id ? updated : v)))
        toast.success('Клиент успешно изменен!')
        setShowEdit(false)
    }

    return (
        <>
            <CreateModal
                title={'Изменение клиента'}
                show={showEdit}
                handleClose={() => setShowEdit(false)}
                onSave={handleUpdate}
            >
                <Form.Label>ФИО</Form.Label>
                <Form.Control
                    className='mb-3'
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
                <Form.Label>Дата рождения</Form.Label>
                <Form.Control
                    className='mb-3'
                    required
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                />
                <Form.Label>Номер телефона</Form.Label>
                <Form.Control
                    className='mb-3'
                    required
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
            </CreateModal>

            <Card
                className={`mb-4 ${isSelectedCard ? 'border-success shadow-lg' : ''}`}
                style={{
                    transition: 'all 0.3s ease',
                    transform: isSelectedCard ? 'scale(1.02)' : 'scale(1)',
                }}            
                key={visitor.id}
            >            
                <Card.Header as="h3">{visitor.fullName}</Card.Header>
                <Card.Body>
                    <Card.Title>Номер телефона: {visitor.phone}</Card.Title>
                    <Card.Text> Дата рождения: {new Date(visitor.dateOfBirth).toLocaleDateString()} </Card.Text>
                    <Card.Text> Дата регистрации: {new Date(visitor.createdAt).toLocaleDateString()} </Card.Text>
                    <ButtonCardBar
                        onClickDelete={handleDelete}
                        isSelectedCard={isSelectedCard}
                        onClickSelect={() => {
                            isSelectedCard ? rental.setSelectedVisitor(null) : rental.setSelectedVisitor(visitor)
                        }}
                        isDeleting={isDeleting}
                        onClickChange={() => setShowEdit(true)}
                    />
                </Card.Body>
            </Card>
        </>
    );
});

export default VisitorItem;