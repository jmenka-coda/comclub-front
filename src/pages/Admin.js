import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/esm/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import { Context } from '..';
import { observer } from 'mobx-react-lite';
import { fetchInfo } from '../http/userAPI';
import Spinner from 'react-bootstrap/esm/Spinner';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import toast from 'react-hot-toast';
import {
    downloadComputersUsageReport,
    downloadPlannedRentalReceipt,
    fetchAverageNumbers,
    fetchBestAdmins,
    fetchDiagramData,
    fetchVisitorsByAdmin,
    fetchVisitorsEvening,
    fetchVisitorsThreeHours,
} from '../http/databaseRequestAPI';
import { fetchRentals } from '../http/rentalAPI';
import { computerStatusLabel, rentalStatusLabel } from '../utils/enumLabels';


const Admin = observer(() => {
    const { user } = useContext(Context)
    const [loading, setLoading] = useState(true)
    const [results, setResults] = useState({})
    const [rentalId, setRentalId] = useState('')
    const [rentalReceiptList, setRentalReceiptList] = useState([])
    const [periodHours, setPeriodHours] = useState('3')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')

    useEffect(() => {
        if (!user.isAuth || !user.user?.id) {
            setLoading(false)
            return
        }
        fetchInfo(user.user.id)
            .then((data) => {
                user.setInfo(data)
                setLoading(false)
            })
            .catch((error) => {
                console.error('Ошибка загрузки:', error)
                setLoading(false)
            })
    }, [user.isAuth, user.user?.id])

    useEffect(() => {
        if (!user.isAuth) return
        fetchRentals()
            .then((list) => {
                const open = (list || []).filter((r) => r.status === 'waiting' || r.status === 'active')
                setRentalReceiptList(open)
            })
            .catch(() => {})
    }, [user.isAuth])

    const setResult = (key, value) => {
        setResults((prev) => ({ ...prev, [key]: value }))
    }

    const runQuery = async (key, loader) => {
        try {
            const data = await loader()
            setResult(key, data)
            toast.success('Запрос выполнен')
        } catch (error) {
            const msg =
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                (typeof error?.response?.data === 'string' ? error.response.data : null) ||
                error?.message ||
                'Ошибка выполнения запроса'
            toast.error(String(msg))
        }
    }

    const timeDayRu = {
        morning: 'Утро',
        afternoon: 'День',
        evening: 'Вечер',
        night: 'Ночь',
    }

    const specTypeRu = {
        weak: 'Слабый ПК',
        average: 'Средний ПК',
        powerful: 'Мощный ПК',
    }

    const sectionRu = {
        by_time_day: 'По времени суток',
        by_duration: 'По длительности пакета',
    }

    const formatValue = (key, value) => {
        if (value === null || value === undefined || value === '') {
            return '—'
        }
        let num = value
        if (typeof value === 'string' && value.trim() !== '' && !Number.isNaN(Number(value))) {
            num = Number(value)
        }
        if (typeof num === 'number' && !Number.isNaN(num)) {
            if (key === 'timeDay' && typeof value === 'string') {
                return timeDayRu[value] || value
            }
            if (key === 'status' && typeof value === 'string') {
                const ru = rentalStatusLabel(value)
                if (ru !== value) return ru
                return computerStatusLabel(value)
            }
            if (key === 'typeSpecifComp' && typeof value === 'string') {
                return specTypeRu[value] || value
            }
            if (key === 'section' && typeof value === 'string') {
                return sectionRu[value] || value
            }
            if (key.includes('hours') || key.includes('час') || key === 'duration_hours' || key === 'avg_hours') {
                return `${num.toFixed(2)} ч`
            }
            if (
                key.includes('price') ||
                key.includes('cost') ||
                key.includes('стоим') ||
                key.includes('выруч') ||
                key === 'avg_price' ||
                key === 'totalCost'
            ) {
                return `${num.toFixed(2)} руб`
            }
            if (key === 'phone' || key === 'experience' || key === 'count' || key === 'active_sessions') {
                return String(num)
            }
            return num % 1 === 0 ? String(num) : num.toFixed(2)
        }
        if (key === 'timeDay' && typeof value === 'string') {
            return timeDayRu[value] || value
        }
        if (key === 'status' && typeof value === 'string') {
            const ru = rentalStatusLabel(value)
            if (ru !== value) return ru
            return computerStatusLabel(value)
        }
        if (key === 'typeSpecifComp' && typeof value === 'string') {
            return specTypeRu[value] || value
        }
        if (key === 'section' && typeof value === 'string') {
            return sectionRu[value] || value
        }
        return String(value)
    }

    const keyNames = {
        fullName: 'ФИО',
        login: 'Логин',
        dateOfBirth: 'Дата рождения',
        phone: 'Телефон',
        id: 'Идентификатор',
        admin_name: 'Администратор',
        active_sessions: 'Число активных сессий',
        avg_hours: 'Средняя длительность (часы)',
        avg_price: 'Средняя выручка (руб.)',
        timeDay: 'Время суток',
        duration_hours: 'Длительность (часы)',
        duration_label: 'Период аренды',
        name: 'Название пакета',
        count: 'Количество сессий',
        section: 'Раздел отчёта',
        createdAt: 'Создано',
        updatedAt: 'Обновлено',
        rentalId: 'Сессия',
        type: 'Тип напоминания',
        message: 'Сообщение',
        minutesLeft: 'Осталось минут',
        minutesLate: 'Просрочено минут',
        typeSpecifComp: 'Тип компьютера',
        monitor: 'Монитор',
        RAM: 'ОЗУ',
        graphicsCard: 'Видеокарта',
        brand: 'Бренд',
        model: 'Модель',
        status: 'Статус',
        startTime: 'Начало',
        endTime: 'Окончание',
        totalCost: 'Стоимость',
    }

    const getLabel = (key) => keyNames[key] || key

    const renderResult = (value) => {
        if (!value) {
            return <div className="text-muted">Результат появится здесь</div>
        }
        if (Array.isArray(value)) {
            if (value.length === 0) {
                return <div className="text-muted">Нет данных</div>
            }
            return (
                <div>
                    {value.map((row, index) => (
                        <Card key={index} className="mb-2">
                            <Card.Body>
                                {Object.entries(row).map(([k, v]) => (
                                    <div key={k}><strong>{getLabel(k)}:</strong> {formatValue(k, v)}</div>
                                ))}
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            )
        }
        if (typeof value === 'object') {
            return (
                <Card className="mb-2">
                    <Card.Body>
                        {Object.entries(value).map(([k, v]) => (
                            <div key={k}><strong>{getLabel(k)}:</strong> {formatValue(k, v)}</div>
                        ))}
                    </Card.Body>
                </Card>
            )
        }
        return <div>{formatValue('value', value)}</div>
    }

    const renderResultAccordion = (title, value) => (
        <Accordion className='mt-3'>
            <Accordion.Item eventKey="0">
                <Accordion.Header>{title}</Accordion.Header>
                <Accordion.Body style={{ maxHeight: 'min(50vh, 420px)', overflowY: 'auto' }}>
                    {renderResult(value)}
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )

    if (loading) {
        return (
            <Container className="text-center mt-5">
                <Spinner animation="border" variant="primary" />
                <p>Загрузка профиля...</p>
            </Container>
        )
    }

    return (
        <Container>
            {user.isAuth ?
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

                    <h3 className='mt-4'>Запросы к базе данных</h3>
                    <p className='text-muted small'>Ниже — готовые выборки из БД. Результат открывается в блоке под кнопкой.</p>
                    <Row className='g-3 mt-1'>
                        <Col md={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Клиенты в активных сессиях (по администратору)</Card.Title>
                                    <Card.Text>Уникальные посетители, у которых сейчас статус сессии «активна», для выбранного администратора (вы).</Card.Text>
                                    <Button variant='primary' onClick={() => runQuery('visitorsByAdmin', () => fetchVisitorsByAdmin(user.user.id))}>Выполнить запрос</Button>
                                    {renderResultAccordion('Показать результат', results.visitorsByAdmin)}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Клиенты с длительной арендой (от 3 часов)</Card.Title>
                                    <Card.Text>Посетители с пакетом от 180 минут и статусом сессии «ожидает» или «активна».</Card.Text>
                                    <Button variant='primary' onClick={() => runQuery('visitorsThreeHours', fetchVisitorsThreeHours)}>Выполнить запрос</Button>
                                    {renderResultAccordion('Показать результат', results.visitorsThreeHours)}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Клиенты с вечерним пакетом</Card.Title>
                                    <Card.Text>Посетители, у которых выбран пакет с временем суток «вечер» и сессия не завершена.</Card.Text>
                                    <Button variant='primary' onClick={() => runQuery('visitorsEvening', fetchVisitorsEvening)}>Выполнить запрос</Button>
                                    {renderResultAccordion('Показать результат', results.visitorsEvening)}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Средние показатели по пакетам</Card.Title>
                                    <Card.Text>Средняя длительность в часах и средняя цена: отдельно по времени суток и по длительности пакета.</Card.Text>
                                    <Button variant='primary' onClick={() => runQuery('averageNumbers', fetchAverageNumbers)}>Выполнить запрос</Button>                                    
                                    {renderResultAccordion('Показать результат', results.averageNumbers)}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Распределение сессий по пакетам</Card.Title>
                                    <Card.Text>Число сессий по названию пакета для выбранной длительности (в часах).</Card.Text>
                                    <Form.Label className='small text-muted mb-1'>Длительность пакета, часы</Form.Label>
                                    <Form.Control
                                        className='mb-2'
                                        type='number'
                                        min={1}
                                        value={periodHours}
                                        onChange={(e) => setPeriodHours(e.target.value)}
                                    />
                                    <Button variant='primary' onClick={() => runQuery('diagramData', () => fetchDiagramData(periodHours))}>Выполнить запрос</Button>
                                    {renderResultAccordion('Показать результат', results.diagramData)}
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Рейтинг администраторов по активным сессиям</Card.Title>
                                    <Card.Text>Топ администраторов по количеству сессий в статусе «активна».</Card.Text>
                                    <Button variant='primary' onClick={() => runQuery('bestAdmins', fetchBestAdmins)}>Выполнить запрос</Button>
                                    {renderResultAccordion('Показать результат', results.bestAdmins)}
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>

                    <h3 className='mt-4'>Отчёты</h3>
                    <Row className='g-3 mt-1 mb-4'>
                        <Col md={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Чек запланированной аренды (Word)</Card.Title>
                                    <Form.Label className="small text-muted mb-1">Сессия (аренда)</Form.Label>
                                    <Form.Select className="mb-2" value={rentalId} onChange={(e) => setRentalId(e.target.value)}>
                                        <option value="">Выберите сессию…</option>
                                        {rentalReceiptList.map((r) => (
                                            <option key={r.id} value={r.id}>
                                                #{r.id} — {new Date(r.startTime).toLocaleString('ru-RU')} — {rentalStatusLabel(r.status)}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Button
                                        onClick={async () => {
                                            if (!rentalId) {
                                                toast.error('Введите ID аренды')
                                                return
                                            }
                                            try {
                                                await downloadPlannedRentalReceipt(rentalId)
                                                toast.success('Файл сохранен')
                                            } catch (error) {
                                                toast.error(error?.response?.status === 404 ? 'Аренда не найдена' : 'Не удалось сформировать файл')
                                            }
                                        }}
                                    >
                                        Сформировать и скачать
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6}>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Отчет использования компьютеров (Excel)</Card.Title>
                                    <Card.Text>Укажите период (необязательно) и скачайте отчет.</Card.Text>
                                    <Form.Control
                                        className='mb-2'
                                        type='date'
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                    />
                                    <Form.Control
                                        className='mb-2'
                                        type='date'
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                    />
                                    <Button
                                        onClick={async () => {
                                            try {
                                                await downloadComputersUsageReport(fromDate, toDate)
                                                toast.success('Файл сохранен')
                                            } catch (error) {
                                                toast.error('Не удалось сформировать отчет')
                                            }
                                        }}
                                    >
                                        Сформировать и скачать
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </>
                :
                <div>Требуется авторизация</div>
            }
        </Container>
    );
});

export default Admin;