import React, { useContext, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button';
import Conteiner from 'react-bootstrap/esm/Container';
import { useLocation, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
    const navigate = useNavigate()

    const [fullNameLogin, setFullname] = useState('')
    const [dateOfBirth, setDateBirth] = useState('')
    const [experience, setExpirience] = useState('')
    const [hiringDate, setHiringDate] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if (isLogin) {
                data = await login(fullNameLogin, password)
            }
            else {
                data = await registration(fullNameLogin, dateOfBirth, experience, hiringDate, password)
            }
            user.setUser(user)
            user.setIsAuth(true)        
            navigate(ADMIN_ROUTE)
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <Conteiner
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 54 }}
        >
            <Card
                style={{ width: 600 }}
                className="p-5"
            >
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-3'
                        placeholder={isLogin ? "Введите логин" : "Введите ФИО"}
                        value={fullNameLogin}
                        onChange={e => setFullname(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder="Введите пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                    />

                    {!isLogin && (
                        <>
                            <Form.Control
                                className='mt-3'
                                placeholder="Введите дату рождения"
                                value={dateOfBirth}
                                onChange={e => setDateBirth(e.target.value)}
                            />
                            <Form.Control
                                className='mt-3'
                                placeholder="Введите опыт работы"
                                value={experience}
                                onChange={e => setExpirience(e.target.value)}
                            />
                            <Form.Control
                                className='mt-3'
                                placeholder="Введите дату приема на работу"
                                value={hiringDate}
                                onChange={e => setHiringDate(e.target.value)}
                            />
                        </>
                    )}

                    <Button
                        className='mt-3'
                        variant={"outline-success"}
                        onClick={click}
                    >
                        {isLogin ? 'Войти' : 'Зарегистрироваться'}
                    </Button>
                </Form>
            </Card>
        </Conteiner>
    );
});

export default Auth;