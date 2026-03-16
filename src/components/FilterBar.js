import { observer } from 'mobx-react-lite';
import React from 'react';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card'
import { FiFilter } from "react-icons/fi";
import { useLocation } from 'react-router-dom';
import { COMPUTER_ROUTE, PACKAGESERVICE_ROUTE, RENTALS_ROUTE, VISITOR_ROUTE } from '../utils/consts';

const FilterBar = observer(({ objects, filters }) => {
    const location = useLocation()

    return (
        <Row
            className="align-items-center g-2"
            style={{
                position: 'sticky',
                top: '10px',
                zIndex: 100
            }}
        >
            <Card className='p-2'>
                <div>  <FiFilter /> Параметры поиска</div>
                {filters.map((filter) => {
                    const uniqueValue = [...new Set(objects.map(obj => obj[filter.key]))];

                    return (
                        <FloatingLabel
                            controlId='floatingSelect'
                            label={filter.label}
                        >
                            <Form.Select
                                key={filter.key}
                                className='mt-2'
                                aria-label="Default select example"
                            >
                                {uniqueValue.map((value, index) => (
                                    <option value={index}>{value}</option>
                                ))}
                            </Form.Select>
                        </FloatingLabel>
                    );
                })}
            </Card>

            <Button className='me-2' variant="success" >
                Создать 
                {location.pathname === COMPUTER_ROUTE ? ' компьютер' :
                    location.pathname === PACKAGESERVICE_ROUTE ? ' пакет услуг' :
                        location.pathname === VISITOR_ROUTE ? ' клиента' : ' сессию'
                }
                
            </Button>
        </Row>
    );
});

export default FilterBar;