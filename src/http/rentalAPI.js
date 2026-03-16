import { $authHost, $host } from "./index";

export const createComputer = async () => {
    const {data} = await $authHost.post('computers', {})
    return data
}

export const fetchComputers = async () => {
    const {data} = await $authHost.get('computers')
    return data
}

export const createVisitor = async () => {
    const {data} = await $authHost.post('visitor', {})
    return data
}

export const fetchVisitors = async () => {
    const {data} = await $authHost.get('visitor')
    return data
}

export const createPackage = async () => {
    const {data} = await $authHost.post('package-service', {})
    return data
}

export const fetchPackages = async () => {
    const {data} = await $authHost.get('package-service')
    return data
}

export const createRental = async (rental) => {
    const {data} = await $authHost.post('rentals', rental)
    return data
}

export const fetchRentals = async () => {
    const {data} = await $authHost.get('rentals')
    return data
}

