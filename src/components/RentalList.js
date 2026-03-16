import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/esm/Row';
import RentalItem from './RentalItem';

const RentalList = ({ rentals }) => {

    return (
        <Row className="d-flex">
            {rentals.map(rental => 
                <RentalItem key={rental.id} rental={rental}/>
            )}
        </Row>
    );
};

export default RentalList;