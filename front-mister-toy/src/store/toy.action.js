import { toyService } from "../services/toy.service.js"
import { store } from "./store.js"
import { SET_TOYS, REMOVE_TOY, UPDATE_TOY, ADD_TOY, SET_FILTER } from "./toy.reducer.js"

export function loadToys(filter) {
    return toyService.query(filter)
        .then((toys) => {
            console.log('toys:', toys)
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('Had issues loading', err)
            throw err
        })
}

export function removeToy(toyId) {
    return toyService.remove(toyId)
        .then((toys) => {
            store.dispatch({ type: REMOVE_TOY, toyId })
            return toys
        })
        .catch(err => {
            console.log('cant remove', err)
            throw err
        })
}

export function saveToy(toy) {
    const type = (toy._id) ? UPDATE_TOY : ADD_TOY
    return toyService.save(toy)
        .then((toy) => {
            store.dispatch({ type, toy })
            return toy
        })
        .catch((err) => {
            console.error('cant save toy:', err)
            throw err
        })
}

export function loadFilter() {
    store.dispatch({ type: SET_FILTER, filter: toyService.getEmptyFilter() })
}

export function setFilter(filter) {
    store.dispatch({ type: SET_FILTER, filter })
}