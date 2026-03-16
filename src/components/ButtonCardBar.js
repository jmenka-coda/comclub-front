import React, { useContext } from 'react'
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Button from 'react-bootstrap/esm/Button';
import { useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { RENTALS_ROUTE } from '../utils/consts';

const ButtonCardBar = observer(({ onClickSelect, isSelectedCard }) => {
    const location = useLocation();

    return (
        <Row className='align-items-center'>
            <Col>
                <Button
                    className='mt-3 me-3'
                    variant="warning"
                >
                    Изменить
                </Button>
                <Button
                    className='mt-3'
                    variant="danger"
                >
                    Удалить
                </Button>
            </Col>
            {location.pathname !== RENTALS_ROUTE && <Col xs='auto' className='align-self-end' >
                <Button
                    variant="primary"
                    onClick={onClickSelect}
                >
                    {isSelectedCard ? 'Убрать выбор' : "Выбрать в сессию" }
                </Button>
            </Col>}
        </Row>
    )
});

export default ButtonCardBar;