import React, { useContext, useState } from 'react'
import Card from 'react-bootstrap/Card';
import ButtonCardBar from './ButtonCardBar';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { deletePackage, updatePackage } from '../http/rentalAPI';
import toast from 'react-hot-toast';
import { specTypeLabel, timeDayLabel } from '../utils/enumLabels';
import CreateModal from './CreateModal';
import ModalPackage from './ModalPackage';

const PackageItem = observer(({ packageService }) => {
    const { rental } = useContext(Context)
    const [isDeleting, setIsDeleting] = React.useState(false)
    const [show, setShow] = useState(false)
    const [formData, setFormData] = useState({
        ...packageService,
        timeMinutes: String(parseInt(packageService.timeMinutes / 60)).padStart(2, '0') + ':' + String(packageService.timeMinutes % 60).padStart(2, '0')
    })

    const onSave = async () => {
        try {
            let time = 0;
            const [h, m] = formData.timeMinutes.split(':');
            time = parseInt(h) * 60 + parseInt(m);
    
            const updatedPackage = await updatePackage(
                packageService.id,
                { ...formData, timeMinutes: time }
            );
            
            toast.success('Пакет успешно изменен!');
    
            const updatedPackages = rental.packages.map(pkg =>
                pkg.id === packageService.id ? updatedPackage : pkg
            );
            
            rental.setPackages(updatedPackages);
    
            console.log('Обновлённый пакет:', updatedPackage);
        } catch (error) {
            toast.error('Ошибка: ' + error.message);
        }
    }

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            await deletePackage(packageService.id)

            const updatedPkg = rental.packages.filter(p => p.id !== packageService.id)
            rental.setPackages(updatedPkg)

            if (isSelectedCard) {
                rental.setSelectedPackage(null)
            }
            toast.success('Пакет успешно удален!')
        } catch (error) {
            console.error('Ошибка удаления пакета:', error)
            toast.error('Этот пакет связан с сессиями')
        } finally {
            setIsDeleting(false)
        }
    }

    const isSelectedCard = packageService.id === rental.selectedPackage?.id

    return (
        <>
            <CreateModal
                title={'Изменение пакета услуг'}
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

            <Card
                className={`mb-4 ${isSelectedCard ? 'border-success shadow-lg' : ''}`}
                style={{
                    transition: 'all 0.3s ease',
                    transform: isSelectedCard ? 'scale(1.02)' : 'scale(1)',
                }}
                key={packageService.id}
            >
                <Card.Header as="h4">Название пакета услуг: "{packageService.name}"</Card.Header>
                <Card.Body>
                    <div>
                        <Card.Text>Продолжительность (минут): {packageService.timeMinutes}</Card.Text>
                        <Card.Text>Характеристики компьютера: {specTypeLabel(packageService.typeSpecifComp)}</Card.Text>
                        <Card.Text>Время дня: {timeDayLabel(packageService.timeDay)}</Card.Text>
                        <Card.Text>Стоимость: {packageService.price} руб</Card.Text>
                    </div>
                    <ButtonCardBar
                        onClickDelete={handleDelete}
                        isSelectedCard={isSelectedCard}
                        onClickSelect={() => {
                            isSelectedCard ? rental.setSelectedPackage(null) : rental.setSelectedPackage(packageService)
                        }}
                        isDeleting={isDeleting}
                        onClickChange={() => setShow(true)}
                    />
                </Card.Body>
            </Card>
        </>
    );
});

export default PackageItem;