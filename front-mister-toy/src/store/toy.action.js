import { toyService } from "../services/toy-local-service.js"
import { store } from "./store.js"
import { SET_TOYS, REMOVE_TOY } from "./toy.reducer.js"

export function loadToys() {
    return toyService.query()
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
