import { $authHost, $host } from "./index";

export const createComputer = async (computer) => {
    const {data} = await $authHost.post('computers', computer)
    return data
}
export const fetchComputers = async () => {
    const {data} = await $authHost.get('computers')
    return data
}
export const deleteComputer = async (id) => {
    const {data} = await $authHost.delete(`computers/${id}`)
    return data
}


export const createVisitor = async (visitor) => {
    const {data} = await $authHost.post('visitor', visitor)
    return data
}

export const fetchVisitors = async () => {
    const {data} = await $authHost.get('visitor')
    return data
}
export const deleteVisitor = async (id) => {
    const {data} = await $authHost.delete(`visitor/${id}`)
    return data
}



export const createPackage = async (pkg) => {
    const {data} = await $authHost.post('package-service', pkg)
    return data
}

export const fetchPackages = async () => {
    const {data} = await $authHost.get('package-service')
    return data
}
export const deletePackage = async (id) => {
    const {data} = await $authHost.delete(`package-service/${id}`)
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
export const deleteRental = async (id) => {
    const {data} = await $authHost.delete(`rentals/${id}`)
    return data
}


export const createSpecification = async (specification) => {
    const {data} = await $authHost.post('specifications', specification)
    return data
}
export const fetchSpecifications = async () => {
    const {data} = await $authHost.get('specifications')
    return data
}