import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card';
import ButtonCardBar from './ButtonCardBar';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { deletePackage } from '../http/rentalAPI';
import toast from 'react-hot-toast';

const PackageItem = observer(({ packageService }) => {
    const { rental } = useContext(Context)
    const [isDeleting, setIsDeleting] = React.useState(false)

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            await deletePackage(packageService.id)

            const updatedPkg = rental.package.filter(p => p.id !== packageService.id)
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
                    <Card.Text>Характеристики компьютера: {packageService.typeSpecifComp}</Card.Text>
                    <Card.Text>Время дня: {packageService.timeDay}</Card.Text>
                    <Card.Text>Стоимость: {packageService.price} руб</Card.Text>
                </div>
                <ButtonCardBar
                    onClickDelete={handleDelete}
                    isSelectedCard={isSelectedCard}
                    onClickSelect={() => {
                        isSelectedCard ? rental.setSelectedPackage(null) : rental.setSelectedPackage(packageService)
                    }}
                    isDeleting={isDeleting}
                />
            </Card.Body>
        </Card>
    );
});

export default PackageItem;