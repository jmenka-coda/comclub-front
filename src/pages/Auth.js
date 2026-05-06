import React, { useContext, useState } from 'react'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/esm/Button';
import Conteiner from 'react-bootstrap/esm/Container';
import { Navigate, useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE } from '../utils/consts';
import { login } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';

const Auth = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const [loginValue, setLoginValue] = useState('')
    const [password, setPassword] = useState('')

    if (user.isAuth) {
        return <Navigate to={ADMIN_ROUTE} replace />
    }

    const click = async () => {
        try {
            const data = await login(loginValue, password)
            user.setUser(data)
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
                <h2 className="m-auto">Авторизация</h2>
                <Form className='d-flex flex-column'>
                    <Form.Control
                        className='mt-3'
                        placeholder="Введите логин"
                        value={loginValue}
                        onChange={e => setLoginValue(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder="Введите пароль"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                    />

                    <Button
                        className='mt-3'
                        variant={"outline-success"}
                        onClick={click}
                    >
                        Войти
                    </Button>
                </Form>
            </Card>
        </Conteiner>
    );
});

export default Auth;