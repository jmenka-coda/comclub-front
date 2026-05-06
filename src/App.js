import React, { useContext, useEffect, useRef, useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from './components/NavBar';
import { observer } from 'mobx-react-lite';
import { Context } from './index';
import { check } from './http/userAPI';
import Spinner from 'react-bootstrap/esm/Spinner';
import { Toaster, toast } from 'react-hot-toast';
import { fetchRentalReminders } from './http/rentalAPI';

const App = observer(() => {
  const { user } = useContext(Context)
  const [loading, setLoading] = useState(true)
  const shownReminderKeysRef = useRef(new Set())

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    check()
      .then(data => {
        user.setUser(data);
        user.setIsAuth(true);
      })
      .catch(() => {
        user.setIsAuth(false);
      })
      .finally(() => setLoading(false));

  }, []);

  useEffect(() => {
    if (!user.isAuth) return undefined

    const loadReminders = async () => {
      try {
        const reminders = await fetchRentalReminders(10)
        reminders.forEach((item) => {
          const key = `${item.rentalId}-${item.type}`
          if (!shownReminderKeysRef.current.has(key)) {
            shownReminderKeysRef.current.add(key)
            toast(item.message, { icon: '⏰' })
          }
        })
      } catch (error) {
        // silent polling
      }
    }

    loadReminders()
    const timer = setInterval(loadReminders, 30000)
    return () => clearInterval(timer)
  }, [user.isAuth]);

  if (loading) {
    return <Spinner animation={"grow"} />
  }

  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;