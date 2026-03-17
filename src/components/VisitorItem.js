import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import ButtonCardBar from './ButtonCardBar';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { deleteVisitor } from '../http/rentalAPI';
import toast from 'react-hot-toast';


const VisitorItem = observer(({ visitor }) => {
    const { rental } = useContext(Context)
    const [isDeleting, setIsDeleting] = React.useState(false)

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

    return (
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
                <Card.Title>Номер телефона: +{visitor.phone}</Card.Title>
                <Card.Text> Дата рождения: {new Date(visitor.dateOfBirth).toLocaleDateString()} </Card.Text>
                <Card.Text> Дата регистрации: {new Date(visitor.createdAt).toLocaleDateString()} </Card.Text>
                <ButtonCardBar
                    onClickDelete={handleDelete}
                    isSelectedCard={isSelectedCard}
                    onClickSelect={() => {
                        isSelectedCard ? rental.setSelectedVisitor(null) : rental.setSelectedVisitor(visitor)
                    }}
                    isDeleting={isDeleting}
                />
            </Card.Body>
        </Card>
    );
});

export default VisitorItem;