import { observer } from 'mobx-react-lite';
import React from 'react';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import FilterBar from './FilterBar';

const RentFilterBar = observer(({ rentals }) => {
    
    rentals = rentals.map(rental => ({
        ...rental,
        admin: rental.admin.fullName,
        package: rental.package.name,
        compModel: rental.computer.model
    }))

    const filters = [
        { key: 'admin', label: 'Администратор' },
        { key: 'package', label: 'Пакет услуг' },
        { key: 'compModel', label: 'Компьютер' },
        { key: 'status', label: 'Статус' }
    ];

    return (
        <FilterBar objects={rentals} filters={filters} />
    );
    
});

export default RentFilterBar;