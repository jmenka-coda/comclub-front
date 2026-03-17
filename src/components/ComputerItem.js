import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import ButtonCardBar from './ButtonCardBar';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { deleteComputer } from '../http/rentalAPI';
import Spinner from 'react-bootstrap/Spinner';
import toast from 'react-hot-toast'

const ComputerItem = observer(({ computer, specification }) => {
    const { rental } = useContext(Context)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            await deleteComputer(computer.id)

            const updatedComputers = rental.computers.filter(c => c.id !== computer.id)
            rental.setComputers(updatedComputers)
            
            if (isSelectedCard) {
                rental.setSelectedComputer(null)
            }
        } catch (error) {           
            console.error('Ошибка удаления компьютера:', error)
            toast.error('Этот компьютер связан с сессиями')
        } finally {
            setIsDeleting(false)
        }
    }

    const isSelectedCard = computer.id === rental.selectedComputer?.id

    if (isDeleting) {
        return (
            <Card className="mb-4 opacity-50">
                <Card.Body className="text-center">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2">Удаление...</p>
                </Card.Body>
            </Card>
        )
    }

    return (
        <>
            <Card
                className={`mb-4 ${isSelectedCard ? 'border-success shadow-lg' : ''}`}
                style={{
                    transition: 'all 0.3s ease',
                    transform: isSelectedCard ? 'scale(1.02)' : 'scale(1)'
                }}
                key={computer.id}
            >
                <Card.Header as="h4">
                    Номер компьютера: №{computer.id}
                </Card.Header>

                <Card.Body>
                    <Row>
                        <Col md={8}>
                            <Card.Text><strong>Бренд:</strong> {computer.brand}</Card.Text>
                            <Card.Text><strong>Модель:</strong> {computer.model}</Card.Text>
                            <Card.Text>
                                <strong>Статус:</strong>{' '}
                                <span> {computer.status} </span>
                            </Card.Text>
                            <Card.Text>
                                <strong>Дата установки:</strong> {new Date(computer.createdAt).toLocaleDateString()}
                            </Card.Text>
                        </Col>
                    </Row>

                    <Accordion className='mt-3'>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>
                                Характеристики ({specification?.typeSpecifComp || 'не указаны'})
                            </Accordion.Header>
                            <Accordion.Body>
                                <div><strong>Монитор:</strong> {specification?.monitor || 'не указан'}</div>
                                <div><strong>Память:</strong> {specification?.RAM || 'не указана'}</div>
                                <div><strong>Видеокарта:</strong> {specification?.graphicsCard || 'не указана'}</div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>

                    <ButtonCardBar
                        onClickDelete={handleDelete}
                        onClickSelect={() => isSelectedCard
                            ? rental.setSelectedComputer(null)
                            : rental.setSelectedComputer(computer)
                        }
                        isSelectedCard={isSelectedCard}
                        isDeleting={isDeleting}
                    />
                </Card.Body>
            </Card>
        </>
    );
});

export default ComputerItem;