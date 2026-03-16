import { observer } from 'mobx-react-lite';
import React from 'react';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import FilterBar from './FilterBar';

const PackFilterBar = observer(({ packages }) => {
    const filters = [
        { key: 'timeMinutes', label: 'Продолжительность (минут)' },
        { key: 'typeSpecifComp', label: 'Тип компьютера' },
        { key: 'timeDay', label: 'Время суток' },
        { key: 'price', label: 'Стоимость' }
    ];

    return (
        <FilterBar objects={packages} filters={filters}/>
    );
});

export default PackFilterBar;