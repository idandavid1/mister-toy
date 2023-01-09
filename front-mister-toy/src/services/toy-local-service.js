import { storageService } from './async-storage.service.js' 
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'
_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyTodo,
    getEmptyFilter
}

function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    return storageService.remove(STORAGE_KEY, toyId)
}

function save(toy) {
    if (toy._id) return storageService.put(STORAGE_KEY, toy)
    return storageService.post(STORAGE_KEY, toy)
}

function getEmptyTodo() {
    return {
        name: '',
        price: 0,
        labels: [],
        createdAt: 0,
        inStock: true
    }
}

function getEmptyFilter() {
    return {
        name: '',
        inStock: '',
        labels: []
    }
}

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys) {
        toys = []
        toys.push(_createToy('toy car', 50, ['car', 'on a sigh']))
        toys.push(_createToy('toy drone', 250, ['drone', 'fun']))
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}

function _createToy(name, price, labels) {
    return { 
        _id: utilService.makeId(),
        name,
        price,
        labels,
        createdAt: Date.now()
    }
}