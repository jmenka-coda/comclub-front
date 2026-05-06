import { observer } from 'mobx-react-lite'
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '..'
import { fetchSpecifications } from '../http/rentalAPI'
import Container from 'react-bootstrap/esm/Container'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/esm/Row'
import Col from 'react-bootstrap/esm/Col'
import SpecFilterBar from '../components/SpecFilterBar'
import SpecificationItem from '../components/SpecificationItem'

const Specifications = observer(() => {
    const { rental } = useContext(Context)
    const [loading, setLoading] = useState(true)
    const [filteredSpecifications, setFilteredSpecifications] = useState([])

    useEffect(() => {
        fetchSpecifications()
            .then((data) => {
                rental.setSpecification(data)
                setFilteredSpecifications(data)
            })
            .finally(() => setLoading(false))
    }, [rental])

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Загрузка характеристик...</p>
            </Container>
        )
    }

    return (
        <Container className='mt-3'>
            <Row>
                <Col xs={3}>
                    <SpecFilterBar specifications={rental.specifications} onFilteredChange={setFilteredSpecifications} />
                </Col>
                <Col>
                    {filteredSpecifications.map((specification) => (
                        <SpecificationItem key={specification.id} specification={specification} />
                    ))}
                </Col>
            </Row>
        </Container>
    )
})

export default Specifications
