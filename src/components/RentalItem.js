import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/esm/Col';
import ButtonCardBar from './ButtonCardBar';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { deleteRental } from '../http/rentalAPI';
import toast from 'react-hot-toast';
import { rentalStatusLabel } from '../utils/enumLabels';

const RentalItem = observer(({ rtl }) => {
    const { rental } = useContext(Context)
    const { user } = useContext(Context)
    const [isDeleting, setIsDeleting] = React.useState(false)

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            await deleteRental(rtl.id)

            const updatedRental = rental.rentals.filter(p => p.id !== rtl.id)
            rental.setRentals(updatedRental)

            toast.success('Сессия успешно удалена!')
        } catch (error) {
            console.error('Ошибка удаления сесии:', error)
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <Col xs={6}>
            <Card className='mb-4'>
                <Card.Header as="h4">Код сессии: #{rtl.id}</Card.Header>
                <Card.Body>
                    <div>
                        <Card.Text><strong>Администратор: </strong>{rtl.admin.fullName} {rtl.admin.id === user.user.id ? '(Вы)' : ''}</Card.Text>
                        <Card.Text><strong>Пакет услуг:</strong> {rtl.package.name}</Card.Text>
                        <Card.Text><strong>Клиент: </strong>{rtl.visitor.fullName}</Card.Text>
                        <Card.Text><strong>Компьютер: </strong>{rtl.computer.brand} ({rtl.computer.model})</Card.Text>
                        <Card.Text><strong>Статус: </strong>{rentalStatusLabel(rtl.status)}</Card.Text>
                        <Card.Text><strong>Полная стоимость:</strong> {rtl.totalCost} руб</Card.Text>
                        <Card.Text><strong>Время начала:</strong> {new Date( rtl.startTime).toLocaleTimeString()}</Card.Text>
                    </div>
                    <ButtonCardBar
                        onClickDelete={handleDelete}
                        isDeleting={isDeleting}
                    />
                </Card.Body>
            </Card>
        </Col>
    );
});

export default RentalItem;