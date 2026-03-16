import { observer } from 'mobx-react-lite';
import React from 'react';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card'
import { FiFilter } from "react-icons/fi";
import FilterBar from './FilterBar';

const CompFilterBar = observer(({ computers }) => {
    const filters = [
        { key: 'brand', label: 'Бренд' },
        { key: 'model', label: 'Модель' },
        { key: 'status', label: 'Статус' },
        { key: 'typeSpecifComp', label: 'Тип' }
    ];

    return (
        <FilterBar objects={computers} filters={filters} />
    );
});

export default CompFilterBar;