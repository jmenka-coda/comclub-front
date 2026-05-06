import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import { Context } from '..';
import { fetchRentals } from '../http/rentalAPI';
import { observer } from 'mobx-react-lite';
import Spinner from 'react-bootstrap/Spinner';
import RentalList from '../components/RentalList';
import RentFilterBar from '../components/RentFilterBar';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

const Rentals = observer(() => {
    const { rental } = useContext(Context)
    const [loading, setLoading] = useState(true)
    const [filteredRentals, setFilteredRentals] = useState([])

    useEffect(() => {
        fetchRentals()
            .then(data => {
                rental.setRentals(data)
                setFilteredRentals(data)
                setLoading(false)
            })
            .catch(error => {
                console.error('Ошибка загрузки:', error)
                setLoading(false)
            })
    }, [rental])

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Загрузка сессий...</p>
            </Container>
        )
    }


    return (
        <Container className='mt-3'>
            <Row>
                <Col xs={3}>
                    <RentFilterBar rentals={rental.rentals} onFilteredChange={setFilteredRentals} />
                </Col>
                <Col>
                    <RentalList rentals={filteredRentals}></RentalList>
                </Col>
            </Row>
        </Container>
    );
});

export default Rentals;