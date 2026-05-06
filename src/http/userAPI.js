import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode"

/** Создание администратора главным (JWT текущего пользователя; ответ без нового токена). */
export const registerAdministratorByChief = async (fullName, dateOfBirth, experience, hiringDate, password) => {
    const { data } = await $authHost.post('auth/registration', {
        fullName,
        dateOfBirth,
        experience,
        hiringDate,
        password,
    })
    return data
}

export const login = async (login, password) => {
    const {data} = await $host.post('auth/login', {login, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('auth/check')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const fetchInfo = async (id) => {
    const {data} = await $authHost.get(`administrators/${id}`)
    return data
}