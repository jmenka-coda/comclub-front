import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { fetchInfo } from '../http/userAPI';
import Spinner from 'react-bootstrap/esm/Spinner';


const Admin = observer(() => {
    const { user } = useContext(Context)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchInfo(user.user.id)
            .then(data => {
                user.setInfo(data)
                setLoading(false)
            }
            ).catch(error => {
                console.error('Ошибка загрузки:', error)
                setLoading(false)
            })
    }, [])


    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Загрузка клиентов...</p>
            </Container>
        )
    }

    return (
        <Container>
            {!user.isLogin ?
                <>
                    <h2 className=''>Профиль</h2>
                    <ListGroup as="ol" numbered>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">ФИО</div>
                                {user.info.fullName}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Логин</div>
                                {user.info.login}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Дата рождения</div>
                                {new Date(user.info.dateOfBirth).toLocaleDateString()}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Опыт работы</div>
                                {user.info.experience}
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">Дата принятия на работу</div>
                                {new Date(user.info.hiringDate).toLocaleDateString()}
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                </>
                :
                <div>fgf</div>
            }
        </Container>
    );
});

export default Admin;