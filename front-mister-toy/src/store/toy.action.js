import { toyService } from "../services/toy-local-service.js"
import { store } from "./store.js"
import { SET_TOYS } from "./toy.reducer.js"

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
