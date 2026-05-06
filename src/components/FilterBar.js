import { observer } from 'mobx-react-lite';
import React from 'react';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Card from 'react-bootstrap/Card'
import { FiFilter } from "react-icons/fi";

const FilterBar = observer(({ objects, filters, onFilterChange, currentFilters = {}, btnCreate, formatFilterOption }) => {

    const getUniqueValues = (key) => {
        const values = objects
            .map(obj => obj[key])
            .filter(value => value !== null && value !== undefined && value !== '');
        return ['', ...new Set(values)];
    };

    return (
        <Row
            className="align-items-center g-2"
            style={{
                position: 'sticky',
                top: '63px',
                zIndex: 50
            }}
        >
            <Card className='p-3'>
                <div className="mb-2">
                    <FiFilter /> Параметры поиска
                </div>
                
                {filters.map((filter) => (
                    <FloatingLabel
                        key={filter.key}
                        controlId={`floatingSelect-${filter.key}`}
                        label={filter.label}
                        className="mb-2"
                    >
                        <Form.Select
                            value={currentFilters[filter.key] || ''}
                            onChange={(e) => onFilterChange(filter.key, e.target.value)}
                        >
                            <option value="">Все</option>
                            {getUniqueValues(filter.key).map((value, index) => (
                                value !== '' && (
                                    <option key={index} value={value}>
                                        {formatFilterOption ? formatFilterOption(filter.key, value) : value}
                                    </option>
                                )
                            ))}
                        </Form.Select>
                    </FloatingLabel>
                ))}
                
                {btnCreate && (
                    <div className="mt-3">
                        {btnCreate}
                    </div>
                )}
            </Card>
        </Row>
    );
});

export default FilterBar;