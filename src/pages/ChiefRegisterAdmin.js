import React, { useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/esm/Container';
import { Navigate } from 'react-router-dom';
import { ADMIN_ROUTE } from '../utils/consts';
import { registerAdministratorByChief } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import toast from 'react-hot-toast';

const ChiefRegisterAdmin = observer(() => {
    const { user } = useContext(Context);
    const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDateBirth] = useState('');
    const [experience, setExperience] = useState('');
    const [hiringDate, setHiringDate] = useState('');
    const [password, setPassword] = useState('');

    if (!user.isAuth) {
        return <Navigate to="/login" replace />;
    }
    if (!user.user?.isChief) {
        return <Navigate to={ADMIN_ROUTE} replace />;
    }

    const submit = async () => {
        try {
            await registerAdministratorByChief(
                fullName,
                dateOfBirth,
                Number.parseFloat(String(experience).replace(',', '.')) || 0,
                hiringDate,
                password,
            );
            toast.success('Администратор создан. Новый сотрудник может войти по выданному логину.');
            setFullName('');
            setDateBirth('');
            setExperience('');
            setHiringDate('');
            setPassword('');
        } catch (error) {
            const msg =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                (typeof error?.response?.data === 'string' ? error.response.data : null) ||
                error?.message ||
                'Ошибка';
            toast.error(String(msg));
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: 'calc(100vh - 54px)' }}>
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto mb-3">Новый администратор</h2>
                <p className="text-muted small">
                    Доступно только главному администратору. После создания сотрудник входит со своим логином и паролем
                    (логин формируется на сервере из ФИО).
                </p>
                <Form className="d-flex flex-column">
                    <Form.Control className="mt-2" placeholder="ФИО" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                    <Form.Control className="mt-3" placeholder="Дата рождения (ГГГГ-ММ-ДД)" value={dateOfBirth} onChange={(e) => setDateBirth(e.target.value)} />
                    <Form.Control className="mt-3" placeholder="Опыт работы (лет)" value={experience} onChange={(e) => setExperience(e.target.value)} />
                    <Form.Control className="mt-3" placeholder="Дата приёма на работу (ГГГГ-ММ-ДД)" value={hiringDate} onChange={(e) => setHiringDate(e.target.value)} />
                    <Form.Control className="mt-3" placeholder="Пароль для входа" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                    <Button className="mt-3" variant="outline-success" type="button" onClick={submit}>
                        Создать администратора
                    </Button>
                </Form>
            </Card>
        </Container>
    );
});

export default ChiefRegisterAdmin;
