import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import SearchBar from '../components/SearchBar';
import { Context } from '..';
import VisitorItem from '../components/VisitorItem';
import { fetchVisitors } from '../http/rentalAPI';
import { observer } from 'mobx-react-lite';
import Spinner from 'react-bootstrap/Spinner';

const Visitors = observer(() => {
    const {rental} = useContext(Context)
    const [loading, setLoading] = useState(true)
    const [filteredVisitors, setFilteredVisitors] = useState([])

    useEffect(() => {
        fetchVisitors()
            .then(data => {
                rental.setVisitors(data)
                setFilteredVisitors(data)
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
                <p>Загрузка клиентов...</p>
            </Container>
        )
    }


    return (
        <Container className='mt-3'>
                <SearchBar visitors={rental.visitors} onFilteredChange={setFilteredVisitors} />
                {filteredVisitors.map(visitor =>
                    <VisitorItem key={visitor.id} visitor={visitor} />
                )}
        </Container>
    );
});

export default Visitors;