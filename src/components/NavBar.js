import React, { useContext } from "react";
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { Context } from "../index";
import { observer } from "mobx-react-lite"
import { ACTIVE_RENTALS_ROUTE, CHIEF_REGISTER_ROUTE, COMPUTER_ROUTE, LOGIN_ROUTE, PACKAGESERVICE_ROUTE, RENTALS_ROUTE, RESERVATION_ROUTE, SPECIFICATION_ROUTE, VISITOR_ROUTE } from "../utils/consts";
import { Link, useNavigate } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import { HiUser } from "react-icons/hi2";
import { FaComputer } from "react-icons/fa6";
import { MdOutlineShoppingBag } from "react-icons/md";


const NavBar = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        localStorage.removeItem('token')
        user.setUser({})
        user.setIsAuth(false)
        navigate(LOGIN_ROUTE)
    }

    return (
        <Navbar
            bg="dark"
            data-bs-theme="dark"
            expand="lg"
            style={{
                position: 'sticky',
                top: '0px',
                zIndex: 100
            }}
        >
            <Container>
                <Navbar.Brand as={Link} to="/"><HiUser />{user.user.login}</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    {user.isAuth ? (
                        <>
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to={VISITOR_ROUTE}>Посетители</Nav.Link>
                                <NavDropdown title="Сессии" id="basic-nav-dropdown">
                                    <NavDropdown.Item as={Link} to={RESERVATION_ROUTE}>Заполнить регистрацию</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to={ACTIVE_RENTALS_ROUTE}>Активные сессии</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item as={Link} to={RENTALS_ROUTE}>Показать все</NavDropdown.Item>
                                </NavDropdown>
                                <Nav.Link as={Link} to={PACKAGESERVICE_ROUTE}><MdOutlineShoppingBag />Пакеты услуг</Nav.Link>
                                <Nav.Link as={Link} to={COMPUTER_ROUTE}><FaComputer className="me-1" />Компьютеры</Nav.Link>
                                <Nav.Link as={Link} to={SPECIFICATION_ROUTE}>Характеристики</Nav.Link>
                                {user.user?.isChief && (
                                    <Nav.Link as={Link} to={CHIEF_REGISTER_ROUTE}>Новый администратор</Nav.Link>
                                )}
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