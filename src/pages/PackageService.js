import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react'
import { Context } from '..';
import { fetchComputers, fetchPackages } from '../http/rentalAPI';
import Container from 'react-bootstrap/esm/Container';
import Spinner from 'react-bootstrap/Spinner';
import PackageItem from '../components/PackageItem';
import PackFilterBar from '../components/PackFilterBar';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';


const PackageService = observer(() => {
    const { rental } = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchPackages()
            .then(data => {
                rental.setPackages(data)
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
                <p>Загрузка услуг...</p>
            </Container>
        )
    }


    return (
        <Container className='mt-3'>
            <Row>
                <Col xs={3}>
                    <PackFilterBar packages={rental.packages} />
                </Col>
                <Col>
                    {rental.packages.map(packageService =>
                        <PackageItem key={packageService.id} packageService={packageService} />
                    )}
                </Col>
            </Row>
        </Container>
    );
});

export default PackageService;