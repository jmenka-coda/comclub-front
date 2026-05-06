import React, { useCallback, useEffect, useRef, useState } from 'react'
import Container from 'react-bootstrap/esm/Container'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import { observer } from 'mobx-react-lite'
import { fetchActiveRentals, fetchRentalReminders } from '../http/rentalAPI'
import RentFilterBar from '../components/RentFilterBar'
import ActiveRentalItem from '../components/ActiveRentalItem'
import toast from 'react-hot-toast'

const ActiveRentals = observer(() => {
    const [loading, setLoading] = useState(true)
    const [rentals, setRentals] = useState([])
    const [filteredRentals, setFilteredRentals] = useState([])
    const shownReminderKeysRef = useRef(new Set())

    const loadRentals = useCallback(async () => {
        try {
            const data = await fetchActiveRentals()
            setRentals(data)
            setFilteredRentals(data)
        } catch (error) {
            toast.error('Не удалось загрузить активные сессии')
        } finally {
            setLoading(false)
        }
    }, [])

    const loadReminders = useCallback(async () => {
        try {
            const reminders = await fetchRentalReminders(15)
            reminders.forEach((item) => {
                const key = `${item.rentalId}-${item.type}`
                if (!shownReminderKeysRef.current.has(key)) {
                    shownReminderKeysRef.current.add(key)
                    toast(item.message, { icon: '⏰' })
                }
            })
        } catch (error) {
            // intentionally silent for background polling
        }
    }, [])

    useEffect(() => {
        loadRentals()
        loadReminders()
        const rentalsTimer = setInterval(loadRentals, 30000)
        const remindersTimer = setInterval(loadReminders, 30000)
        return () => {
            clearInterval(rentalsTimer)
            clearInterval(remindersTimer)
        }
    }, [loadRentals, loadReminders])

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Загрузка активных сессий...</p>
            </Container>
        )
    }

    return (
        <Container className='mt-3'>
            <Row>
                <Col xs={3}>
                    <RentFilterBar rentals={rentals} onFilteredChange={setFilteredRentals} />
                </Col>
                <Col>
                    <Row>
                        {filteredRentals.map((rtl) => (
                            <ActiveRentalItem key={rtl.id} rtl={rtl} onChanged={loadRentals} />
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
})

export default ActiveRentals
