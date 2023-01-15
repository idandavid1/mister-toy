import { httpService } from './http.service.js'

const BASE_URL = 'review/'

export const reviewService = {
    query,
    getById,
    add,
    remove,
    getEmptyReview,
}

function query() {
    return httpService.get(BASE_URL)
}

function getById(reviewId) {
    return httpService.get(BASE_URL + reviewId)
}

function remove(reviewId) {
    return httpService.delete(BASE_URL + reviewId)
}

function add(review, toyId) {
    return httpService.post(BASE_URL + toyId, review)
}

function getEmptyReview() {
    return {
        txt: ''
    }
}