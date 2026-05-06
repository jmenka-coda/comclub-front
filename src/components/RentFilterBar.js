import { observer } from 'mobx-react-lite';
import React, { useEffect, useMemo, useState } from 'react';
import FilterBar from './FilterBar';
import { rentalStatusLabel } from '../utils/enumLabels';

const RentFilterBar = observer(({ rentals, onFilteredChange }) => {
    const [filtersState, setFiltersState] = useState({})

    const rows = useMemo(
        () =>
            (rentals || []).map((rental) => ({
                ...rental,
                admin: rental.admin?.fullName,
                package: rental.package?.name,
                compModel: rental.computer?.model,
            })),
        [rentals],
    )

    const filters = [
        { key: 'admin', label: 'Администратор' },
        { key: 'package', label: 'Пакет услуг' },
        { key: 'compModel', label: 'Компьютер' },
        { key: 'status', label: 'Статус' },
    ]

    const formatFilterOption = (key, value) => {
        if (key === 'status') return rentalStatusLabel(value)
        return value
    }

    useEffect(() => {
        if (!onFilteredChange) return
        const filteredRentals = rows.filter((rental) =>
            Object.entries(filtersState).every(([key, value]) => !value || String(rental[key]) === String(value)),
        )
        onFilteredChange(filteredRentals)
    }, [rows, filtersState, onFilteredChange])

    return (
        <FilterBar
            objects={rows}
            filters={filters}
            onFilterChange={(key, value) => setFiltersState((prev) => ({ ...prev, [key]: value }))}
            currentFilters={filtersState}
            formatFilterOption={formatFilterOption}
        />
    )
});

export default RentFilterBar;