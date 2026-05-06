import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes';
import { ADMIN_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { Context } from '../index';


const AppRouter = () => {
    const {user} = useContext(Context)

    return (
        <Routes>
            {user.isAuth === true && authRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component />}/>
            )}
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component />}/>
            )}
            <Route path="*" element={<Navigate to={user.isAuth ? ADMIN_ROUTE : LOGIN_ROUTE} replace />}/>
        </Routes>
    );
};

export default AppRouter;