import React, { useContext, useState, useEffect, useMemo } from 'react'
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/esm/Button';
import { Typeahead } from 'react-bootstrap-typeahead'
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { createRental, fetchComputers, fetchPackages, fetchVisitors } from '../http/rentalAPI';
import Container from 'react-bootstrap/esm/Container';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import { RENTALS_ROUTE } from '../utils/consts';
import toast from 'react-hot-toast';
import { computerStatusLabel } from '../utils/enumLabels';

const Reservation = observer(() => {
    const { user } = useContext(Context)
    const { rental } = useContext(Context)
    const navigate = useNavigate()

    const [startTime, setStartTime] = useState('')

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            package: rental.selectedPackage,
            visitor: rental.selectedVisitor,
            computer: rental.selectedComputer,
            startTime: ''
        }
    });
    const onSubmit = (data) => {
        const time = new Date()
        const [h, m] = startTime.split(':')
        time.setHours(parseInt(h), parseInt(m), 0, 0)

        const rentalData = {
            "adminId": user.user.id,
            "packageId": data.package.id,
            "visitorId": data.visitor.id,
            "computerId": data.computer.id,
            "startTime": time
        }

        const res = createRental(rentalData)
            .then(dat => {
                rental.setSelectedComputer(null)
                rental.setSelectedVisitor(null)
                rental.setSelectedPackage(null)
                setStartTime('')
                navigate(RENTALS_ROUTE)
                toast.success('Сессия создана!')
            })
            .catch(error => {
                console.log('Ошибка:', error)
                const errorMessage = error.response?.data?.message || error.message || 'Произошла ошибка'
                toast.error(errorMessage)
            })
    }


    const [isLoading, setLoading] = useState(true)
    useEffect(() => {
        Promise.all([
            fetchComputers(),
            fetchPackages(),
            fetchVisitors()
        ])
            .then(([computers, packages, visitors]) => {
                rental.setComputers(computers)
                rental.setPackages(packages)
                rental.setVisitors(visitors)
                setLoading(false)
            })
            .catch(error => {
                console.error('Ошибка загрузки:', error)
                setLoading(false)
            })
    }, [])


    const freeComputers = useMemo(
        () => rental.computers.filter((c) => c.status === 'free'),
        [rental.computers],
    )

    if (isLoading) {
        return (
            <Spinner id='spinner-reservation' animation='grow'>
                Загрузка...
            </Spinner>
        )
    }


    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card
                style={{ width: 600 }}
                className="p-5"
            >
                <h2 className="m-auto">Регистрация сессии</h2>
                <Form
                    onSubmit={handleSubmit(onSubmit)}
                    className='d-flex flex-column'
                >
                    <Form.Label className='mt-4'>Название пакета услуг</Form.Label>
                    <Controller
                        name='package'
                        control={control}
                        rules={{ required: 'Выберите пакет услуг' }}
                        render={({ field }) => (
                            <>
                                <Typeahead
                                    className={`mb-1 ${errors.package ? 'is-invalid' : ''}`}
                                    id='package-typeahead'
                                    labelKey={(pkg) => `${pkg.name} (${pkg.price} руб.)`}
                                    onChange={(selected) => {
                                        const value = selected[0] || null;
                                        field.onChange(value);
                                        rental.setSelectedPackage(value);
                                    }}
                                    options={rental.packages}
                                    placeholder='Введите пакет услуг'
                                    selected={field.value ? [field.value] : []}
                                />
                                {errors.package && (
                                    <Form.Text className='text-danger d-block mb-2'>
                                        {errors.package.message}
                                    </Form.Text>
                                )}
                            </>
                        )}
                    />
                    <Controller
                        name='visitor'
                        control={control}
                        rules={{ required: 'Выберите клиента' }}
                        render={({ field }) => (
                            <>
                                <Form.Label >ФИО клиента</Form.Label>
                                <Typeahead
                                    className={`mb-1 ${errors.visitor ? 'is-invalid' : ''}`}
                                    id='visitor-typehead'
                                    labelKey={(visitor) => `${visitor.fullName} (${new Date(visitor.dateOfBirth).toLocaleDateString()})`}
                                    onChange={(selected) => {
                                        field.onChange(selected[0] || null)
                                        rental.setSelectedVisitor(selected[0] || null)
                                    }}
                                    options={rental.visitors}
                                    placeholder='Введите ФИО клиента'
                                    selected={field.value ? [field.value] : []}
                                />
                                {errors.visitor && (
                                    <Form.Text className='text-danger d-block mb-2'>
                                        {errors.visitor.message}
                                    </Form.Text>
                                )}
                            </>
                        )}
                    />
                    <Controller
                        name='computer'
                        control={control}
                        rules={{ required: 'Выберите компьютер' }}
                        render={({ field }) => (
                            <>
                                <Form.Label className='mt-2'>Компьютер</Form.Label>
                                <Typeahead
                                    className={`mb-1 ${errors.computer ? 'is-invalid' : ''}`}
                                    id='computer-typehead'
                                    labelKey={(option) =>
                                        `#${option.id} ${option.brand} (${option.model}) — ${computerStatusLabel(option.status)}`
                                    }
                                    onChange={(selected) => {
                                        field.onChange(selected[0] || null)
                                        rental.setSelectedComputer(selected[0] || null)
                                    }}
                                    options={freeComputers}
                                    placeholder='Введите марку компьютера'
                                    selected={field.value ? [field.value] : []}
                                />
                                {errors.computer && (
                                    <Form.Text className='text-danger d-block mb-2'>
                                        {errors.computer.message}
                                    </Form.Text>
                                )}
                            </>
                        )}
                    />
                    <Form.Label className='mt-2'>Время начала</Form.Label>
                    <Form.Control
                        className='mb-3'
                        type='time'
                        value={startTime}
                        onChange={(e) => {
                            setStartTime(e.target.value)
                        }}
                        required
                    />
                    <Button
                        className='mt-3'
                        type='submit'
                    >
                        Сохранить
                    </Button>
                </Form>
            </Card>
        </Container>
    );
});

export default Reservation;