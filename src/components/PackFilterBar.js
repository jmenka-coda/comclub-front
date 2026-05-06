import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useState } from 'react';
import { specTypeLabel, timeDayLabel } from '../utils/enumLabels';
import Button from 'react-bootstrap/Button';
import FilterBar from './FilterBar';
import { Context } from '..';
import CreateModal from './CreateModal';
import { createPackage } from '../http/rentalAPI';
import toast from 'react-hot-toast';
import ModalPackage from './ModalPackage';

const PackFilterBar = observer(({ packages, onFilteredChange }) => {
    const { rental } = useContext(Context)
    const [show, setShow] = useState(false)
    const [filtersState, setFiltersState] = useState({})
    const [formData, setFormData] = useState({
        name: "",
        timeMinutes: "",
        typeSpecifComp: "",
        timeDay: "",
        price: 0
    })

    const filters = [
        { key: 'timeMinutes', label: 'Продолжительность (минут)' },
        { key: 'typeSpecifComp', label: 'Тип компьютера' },
        { key: 'timeDay', label: 'Время суток' },
        { key: 'price', label: 'Стоимость' }
    ];

    const onSave = async () => {
        let time = 0
        const [h, m] = formData.timeMinutes.split(':')
        time = parseInt(h) * 60 + parseInt(m)

        const pck = await createPackage({ ...formData, timeMinutes: time })
        toast.success(`Пакет услуг "${formData.name}" успешно создан!`)

        rental.setPackages([...rental.packages, pck])

        setFormData({
            name: "",
            timeMinutes: "",
            typeSpecifComp: "",
            timeDay: "",
            price: 0
        })
    }

    useEffect(() => {
        if (!onFilteredChange) return
        const filteredPackages = packages.filter((pkg) => {
            return Object.entries(filtersState).every(([key, value]) => {
                if (!value) return true
                return String(pkg[key]) === String(value)
            })
        })
        onFilteredChange(filteredPackages)
    }, [packages, filtersState, onFilteredChange])

    const formatFilterOption = (key, value) => {
        if (key === 'timeDay') return timeDayLabel(value)
        if (key === 'typeSpecifComp') return specTypeLabel(value)
        return value
    }

    return (
        <>
            <CreateModal
                title={'Создание пакета услуг'}
                show={show}
                handleClose={() => setShow(false)}
                onSave={onSave}
                children={
                    <ModalPackage
                        formData={formData}
                        setFormData={setFormData}
                    />
                }
            />

            <FilterBar
                objects={packages}
                filters={filters}
                onFilterChange={(key, value) => setFiltersState((prev) => ({ ...prev, [key]: value }))}
                currentFilters={filtersState}
                formatFilterOption={formatFilterOption}
                btnCreate={
                    <Button
                        className='me-2'
                        variant='success'
                        onClick={() => setShow(true)}
                    >
                        Создать пакет услуг
                    </Button>
                }
            />
        </>
    );
});

export default PackFilterBar;