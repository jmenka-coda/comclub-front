import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { observer } from 'mobx-react-lite';

const SearchBar = observer(() => {

    return (
        <Row className="mb-3 align-items-center g-2">
            <Col>
                <InputGroup>
                    <Form.Control
                        placeholder="Введите имя"
                        aria-label="Recipient's username"
                    />
                    <Button variant="outline-secondary">
                        Найти
                    </Button>
                </InputGroup>
            </Col>
            <Col xs="auto">
                <Button
                    variant="success"
                    className="ms-2"
                >
                    Создать
                </Button>
            </Col>
        </Row>
    );
});

export default SearchBar;