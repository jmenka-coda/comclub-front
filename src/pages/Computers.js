import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '..';
import { fetchComputers } from '../http/rentalAPI';
import Container from 'react-bootstrap/esm/Container';
import Spinner from 'react-bootstrap/Spinner';
import ComputerItem from '../components/ComputerItem';
import SearchBar from '../components/SearchBar';
import CompFilterBar from '../components/CompFilterBar';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';


const Computers = observer(() => {
    const { rental } = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchComputers()
            .then(data => {
                rental.setComputers(data)
                setLoading(false)
            })
            .catch(error => {
                console.error('Ошибка загрузки:', error)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Загрузка компьютеров...</p>
            </Container>
        )
    }


    return (
        <Container className='mt-3'>
            <Row>
                <Col xs={3}>
                    <CompFilterBar computers={rental.computers.map(comp => ({
                        ...comp,
                        typeSpecifComp: comp.specification?.typeSpecifComp
                    }))} />
                </Col>
                <Col>
                    {rental.computers.map(computer =>
                        <ComputerItem key={computer.id} computer={computer} specification={computer.specification} />
                    )}
                </Col>
            </Row>
        </Container>
    );
});

export default Computers;