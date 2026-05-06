import React, { useContext, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/esm/Col'
import Button from 'react-bootstrap/Button'
import { observer } from 'mobx-react-lite'
import { Context } from '..'
import { completeRental, startRental } from '../http/rentalAPI'
import toast from 'react-hot-toast'
import { rentalStatusLabel } from '../utils/enumLabels'

const ActiveRentalItem = observer(({ rtl, onChanged }) => {
    const { user } = useContext(Context)
    const [isLoading, setIsLoading] = useState(false)

    const handleStart = async () => {
        try {
            setIsLoading(true)
            await startRental(rtl.id)
            toast.success('Сессия запущена')
            onChanged?.()
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Не удалось запустить сессию')
        } finally {
            setIsLoading(false)
        }
    }

    const handleComplete = async () => {
        try {
            setIsLoading(true)
            await completeRental(rtl.id)
            toast.success('Сессия завершена')
            onChanged?.()
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Не удалось завершить сессию')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Col xs={6}>
            <Card className='mb-4'>
                <Card.Header as="h4">Активная сессия #{rtl.id}</Card.Header>
                <Card.Body>
                    <Card.Text><strong>Администратор: </strong>{rtl.admin.fullName} {rtl.admin.id === user.user.id ? '(Вы)' : ''}</Card.Text>
                    <Card.Text><strong>Пакет услуг:</strong> {rtl.package.name}</Card.Text>
                    <Card.Text><strong>Клиент:</strong> {rtl.visitor.fullName}</Card.Text>
                    <Card.Text><strong>Компьютер:</strong> {rtl.computer.brand} ({rtl.computer.model})</Card.Text>
                    <Card.Text><strong>Статус:</strong> {rentalStatusLabel(rtl.status)}</Card.Text>
                    <Card.Text><strong>Стоимость:</strong> {Number(rtl.totalCost || 0).toFixed(2)} руб</Card.Text>
                    <Card.Text><strong>Начало:</strong> {new Date(rtl.startTime).toLocaleString()}</Card.Text>
                    <Card.Text><strong>Окончание:</strong> {rtl.endTime ? new Date(rtl.endTime).toLocaleString() : 'не задано'}</Card.Text>

                    <div className='d-flex gap-2 mt-3'>
                        <Button disabled={isLoading || rtl.status !== 'waiting'} onClick={handleStart} variant='success'>
                            Начать сессию
                        </Button>
                        <Button disabled={isLoading || rtl.status !== 'active'} onClick={handleComplete} variant='primary'>
                            Завершить сессию
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
})

export default ActiveRentalItem
