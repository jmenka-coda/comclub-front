import { $authHost, $host } from "./index";
import { jwtDecode } from "jwt-decode"

export const registration = async (fullName, dateOfBirth, experience, hiringDate, password) => {
    const {data} = await $host.post('auth/registration', {fullName, dateOfBirth, experience, hiringDate, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
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