import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/esm/Col';
import ButtonCardBar from './ButtonCardBar';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { deleteRental } from '../http/rentalAPI';

const RentalItem = observer(({ rental }) => {
    const {user} = useContext(Context)
    
    return (
        <Col xs={6}>
            <Card className='mb-4'>
                <Card.Header as="h4">Код сессии: #{rental.id}</Card.Header>
                <Card.Body>
                    <div>
                        <Card.Text>Администратор: {rental.admin.fullName} {rental.admin.id === user.user.id ? '(Вы)' : ''}</Card.Text>
                        <Card.Text>Пакет услуг: {rental.package.name}</Card.Text>
                        <Card.Text>Клиент: {rental.visitor.fullName}</Card.Text>
                        <Card.Text>Компьютер: {rental.computer.brand} ({rental.computer.model})</Card.Text>
                        <Card.Text>Статус: {rental.status}</Card.Text>
                        <Card.Text>Полная стоимость: {rental.totalCost} руб</Card.Text>
                    </div>
                    <ButtonCardBar
                        onClickDelete={() => deleteRental(rental.id)}
                    />
                </Card.Body>
            </Card>
        </Col>
    );
});

export default RentalItem;