import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { computerStatusLabel, specTypeLabel } from '../utils/enumLabels';
import Button from 'react-bootstrap/Button';
import FilterBar from './FilterBar';
import CreateModal from './CreateModal';
import { createComputer, createSpecification, fetchComputers, fetchSpecifications } from '../http/rentalAPI';
import { Context } from '..';
import ModalComputer from './ModalComputer';

const CompFilterBar = observer(({ computers, onFilteredChange }) => {
    const { rental } = useContext(Context)
    const [show, setShow] = useState(false)
    const [newScf, setNewScf] = useState(true)
    const [filters, setFilters] = useState({
        brand: '',
        model: '',
        status: '',
        typeSpecifComp: ''
    })
    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        specificationId: 0,
        typeSpecifComp: "",
        monitor: "",
        RAM: "",
        graphicsCard: ""
    })

    useEffect(() => {
        fetchSpecifications()
            .then((data) => {
                rental.setSpecification(data)
            })
            .catch((error) => {
                console.error('Ошибка загрузки:', error)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Фильтрация компьютеров
    const filtration = (filterKey, filterValue) => {
        setFilters(prev => ({
            ...prev,
            [filterKey]: filterValue
        }));
    }

    // Получаем отфильтрованные компьютеры
    const getFilteredComputers = () => {
        let filtered = computers;
        
        Object.keys(filters).forEach(key => {
            if (filters[key] && filters[key] !== '') {
                filtered = filtered.filter(computer => 
                    computer[key] === filters[key]
                );
            }
        });
        
        return filtered;
    }

    useEffect(() => {
        if (onFilteredChange) {
            onFilteredChange(getFilteredComputers());
        }
    }, [filters, computers, onFilteredChange])

    const onSave = async () => {
        let specifId = formData.specificationId

        if (newScf) {
            const specif = await createSpecification({
                typeSpecifComp: formData.typeSpecifComp,
                monitor: formData.monitor,
                RAM: formData.RAM,
                graphicsCard: formData.graphicsCard
            })

            specifId = specif.id
        }

        await createComputer({
            model: formData.model,
            brand: formData.brand,
            specificationId: specifId
        })

        const refreshedComputers = await fetchComputers()
        rental.setComputers(refreshedComputers)
        
        setFormData({
            brand: "",
            model: "",
            specificationId: 0,
            typeSpecifComp: "",
            monitor: "",
            RAM: "",
            graphicsCard: ""
        });
        
        setShow(false);
    }

    const filterConfigs = [
        { key: 'brand', label: 'Бренд' },
        { key: 'model', label: 'Модель' },
        { key: 'status', label: 'Статус' },
        { key: 'typeSpecifComp', label: 'Тип' }
    ];

    const formatFilterOption = (key, value) => {
        if (key === 'status') return computerStatusLabel(value)
        if (key === 'typeSpecifComp') return specTypeLabel(value)
        return value
    }

    return (
        <>
            <CreateModal
                show={show}
                handleClose={() => setShow(false)}
                onSave={onSave}
            >
                <ModalComputer
                    formData={formData}
                    setFormData={setFormData}
                    newScf={newScf}
                    setNewScf={setNewScf}
                />
            </CreateModal>

            <FilterBar
                objects={computers}
                filters={filterConfigs}
                onFilterChange={filtration}
                currentFilters={filters}
                formatFilterOption={formatFilterOption}
                btnCreate={
                    <Button
                        className='me-2'
                        variant="success"
                        onClick={() => setShow(true)}
                    >
                        Создать компьютер
                    </Button>
                }
            />            
        </>
    );
});

export default CompFilterBar;