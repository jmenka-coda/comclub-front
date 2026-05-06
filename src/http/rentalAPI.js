import { $authHost } from "./index";

export const createComputer = async (computer) => {
    const {data} = await $authHost.post('computers', computer)
    return data
}
export const updateComputer = async (id, computer) => {
    const {data} = await $authHost.put(`computers/${id}`, computer)
    return data
}
export const fetchComputers = async () => {
    const {data} = await $authHost.get('computers')
    return data
}
export const fetchComputerById = async (id) => {
    const { data } = await $authHost.get(`computers/${id}`)
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
export const fetchVisitorById = async (id) => {
    const { data } = await $authHost.get(`visitor/${id}`)
    return data
}
export const updateVisitor = async (id, visitor) => {
    const { data } = await $authHost.put(`visitor/${id}`, visitor)
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
export const updatePackage = async (id, pkg) => {
    const {data} = await $authHost.put(`package-service/${id}`, pkg)
    return data
}
export const fetchPackages = async () => {
    const {data} = await $authHost.get('package-service')
    return data
}
export const fetchPackageById = async (id) => {
    const { data } = await $authHost.get(`package-service/${id}`)
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
export const fetchActiveRentals = async () => {
    const { data } = await $authHost.get('rentals/active')
    return data
}
export const fetchRentalById = async (id) => {
    const { data } = await $authHost.get(`rentals/${id}`)
    return data
}
export const updateRental = async (id, rental) => {
    const { data } = await $authHost.put(`rentals/${id}`, rental)
    return data
}
export const startRental = async (id) => {
    const { data } = await $authHost.post(`rentals/${id}/start`)
    return data
}
export const completeRental = async (id) => {
    const { data } = await $authHost.post(`rentals/${id}/complete`)
    return data
}
export const fetchRentalReminders = async (threshold = 15) => {
    const { data } = await $authHost.get(`rentals/reminders?threshold=${threshold}`)
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
export const fetchSpecificationById = async (id) => {
    const { data } = await $authHost.get(`specifications/${id}`)
    return data
}
export const updateSpecification = async (id, specification) => {
    const { data } = await $authHost.put(`specifications/${id}`, specification)
    return data
}
export const deleteSpecification = async (id) => {
    const { data } = await $authHost.delete(`specifications/${id}`)
    return data
}