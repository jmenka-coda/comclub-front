import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import ButtonCardBar from './ButtonCardBar';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

const ComputerItem = observer(({ computer, specification }) => {
    const { rental } = useContext(Context)
    
    const isSelectedCard = computer.id === rental.selectedComputer?.id

    return (
        <Card
            className={`mb-4 ${isSelectedCard ? 'border-success shadow-lg' : ''}`}
            style={{
                transition: 'all 0.3s ease',
                transform: isSelectedCard ? 'scale(1.02)' : 'scale(1)'
            }}
            key={computer.id}
        >
            <Card.Header as="h4">Номер компьютера: №{computer.id}</Card.Header>
            <Card.Body>
                <div>
                    <Card.Text>Бренд: {computer.brand}</Card.Text>
                    <Card.Text>Модель: {computer.model}</Card.Text>
                    <Card.Text>Статус: {computer.status}</Card.Text>
                    <Card.Text>Дата установки: {new Date(computer.createdAt).toLocaleDateString()}</Card.Text>
                    <Accordion className='mt-2'>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Характеристики ({specification.typeSpecifComp})</Accordion.Header>
                            <Accordion.Body>
                                <div>Монитор: {specification.monitor}</div>
                                <div>Память: {specification.RAM}</div>
                                <div>Видеокарта: {specification.graphicsCard}</div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <ButtonCardBar
                    isSelectedCard={isSelectedCard}
                    onClickSelect={() => {
                        isSelectedCard ? rental.setSelectedComputer(null) : rental.setSelectedComputer(computer)
                    }}
                />
            </Card.Body>
        </Card>
    );
});

export default ComputerItem;