import { toyService } from "../services/toy.service.js"
import { store } from "./store.js"
import { SET_TOYS, REMOVE_TOY, UPDATE_TOY, ADD_TOY, SET_FILTER } from "./toy.reducer.js"

export async function loadToys(filter = toyService.getEmptyFilter()) {
    try {
        const toys = await toyService.query(filter)
        store.dispatch({ type: SET_TOYS, toys })
    } catch (err) {
        console.log('Had issues loading', err)
        // throw err
    }
}

export async function removeToy(toyId) {
    try {
        await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
    } catch (err) {
        console.log('cant remove', err)
        throw err
    }
}

export async function saveToy(toy) {
    const type = (toy._id) ? UPDATE_TOY : ADD_TOY
    try {
        await toyService.save(toy)
        store.dispatch({ type, toy })
        return toy
    } catch (err) {
        console.error('cant save toy:', err)
        throw err
    }
}

export function loadFilter() {
    store.dispatch({ type: SET_FILTER, filter: toyService.getEmptyFilter() })
}

export function setFilter(filter) {
    store.dispatch({ type: SET_FILTER, filter })
}