import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card'
import { FiFilter } from "react-icons/fi";
import { useLocation } from 'react-router-dom';
import { COMPUTER_ROUTE, PACKAGESERVICE_ROUTE, RENTALS_ROUTE, VISITOR_ROUTE } from '../utils/consts';
import CreateModal from './CreateModal';

const FilterBar = observer(({ objects, filters, btn }) => {

    return (
        <>
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
                        const uniqueValue = ['-']
                        const val = [...new Set(objects.map(obj => obj[filter.key]))]
                        val.map((x) => uniqueValue.push(x))

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
                {btn}
            </Row>
        </>
    );
});

export default FilterBar;