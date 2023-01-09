import { storageService } from './async-storage.service.js' 
import { utilService } from './util.service.js'

const STORAGE_KEY = 'toyDB'
_createToys()

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
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

function _createToys() {
    let toys = utilService.loadFromStorage(STORAGE_KEY)
    if (!toys) {
        toys = []
        toys.push(_createToy('toy car', 50, ['car', 'on a sigh'], 'https://i5.walmartimages.com/asr/5cf6581e-8ac4-49b0-a3f1-63fa59ecd813.318f50bf4e8013086ffc873d002a5242.jpeg'))
        toys.push(_createToy('toy drone', 250, ['drone', 'fun'], 'https://m.media-amazon.com/images/I/71b1xQSUXeL.jpg'))
        utilService.saveToStorage(STORAGE_KEY, toys)
    }
}

function _createToy(name, price, labels, imgUrl) {
    return { 
        _id: utilService.makeId(),
        name,
        price,
        labels,
        createdAt: Date.now(),
        imgUrl,
        inStock: true
    }
}