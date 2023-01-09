import { httpService } from './http.service.js'

const BASE_URL = 'toy/'

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getEmptyFilter
}

function query(filter) {
    const queryParams = `?name=${filter.name}&inStock=${filter.inStock}&labels=${filter.labels}&sortBy=${filter.sortBy}`
    return httpService.get(BASE_URL + queryParams)
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    return httpService.delete(BASE_URL + toyId)
}

function save(toy) {
    if (toy._id) return httpService.put(BASE_URL, toy)
    return httpService.post(BASE_URL, toy)
}

function getEmptyToy() {
    return {
        name: '',
        price: 0,
        labels: [],
        createdAt: 0,
        inStock: true,
        imgUrl: ''
    }
}

function getEmptyFilter() {
    return {
        name: '',
        inStock: '',
        labels: [],
        sortBy: ''
    }
}


