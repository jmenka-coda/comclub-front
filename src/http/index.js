import axios from "axios"

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

$authHost.interceptors.request.use((config) => {
    config.headers = config.headers || {};
    
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.authorization = `Bearer ${token}`;
    }
    
    return config;
});

export {
    $host,
    $authHost
}