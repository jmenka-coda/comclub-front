import React, { useContext } from "react";
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Context } from "../index";
import { observer } from "mobx-react-lite"
import { COMPUTER_ROUTE, LOGIN_ROUTE, PACKAGESERVICE_ROUTE, REGISTRATION_ROUTE, RENTALS_ROUTE, RESERVATION_ROUTE, VISITOR_ROUTE } from "../utils/consts";
import { useNavigate } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { HiUser } from "react-icons/hi2";
import { FaComputer } from "react-icons/fa6";
import { MdOutlineShoppingBag } from "react-icons/md";


const NavBar = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" data-bs-theme="dark" expand="lg">
            <Container>
                <Navbar.Brand href="/"><HiUser />{user.user.login}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {user.isAuth ? (
                        <>
                            <Nav className="me-auto">
                                <Nav.Link href={VISITOR_ROUTE}>Посетители</Nav.Link>
                                <NavDropdown title="Сессии" id="basic-nav-dropdown">
                                    <NavDropdown.Item href={RESERVATION_ROUTE}>Заполнить регистрацию</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href={RENTALS_ROUTE}>Показать все</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link href={PACKAGESERVICE_ROUTE}><MdOutlineShoppingBag />Пакеты услуг</Nav.Link>
                                <Nav.Link href={COMPUTER_ROUTE}><FaComputer className="me-1" />Компьютеры</Nav.Link>
                            </Nav>
                            <Nav className="ms-auto">
                                <Button
                                    variant={"outline-light"}
                                    onClick={() => logOut()}
                                >
                                    Выйти
                                </Button>
                            </Nav>
                        </>
                    ) : (
                        <Nav className="ms-auto">
                            <Button
                                variant={"outline-light"}
                                onClick={() => navigate(LOGIN_ROUTE)}
                            >
                                Войти
                            </Button>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
})

export default NavBar;