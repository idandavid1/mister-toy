import { userService } from "../services/user.service.js"
import {store } from "./store.js"
import { SET_USER } from "./user.reducer.js"

export function setUser(user) {
    userService.save(user).then(() => {
        store.dispatch({ type: SET_USER, user })
    })
    .catch((err) => {
        console.log('err:', err)
        throw(err)
    })
}

export function sighup(user) {
    return userService.signup(user)
        .then((user) => {
            store.dispatch({ type: SET_USER, user })
        })
        .catch((err) => console.log('err:', err))
}

export function login(user) {
    return userService.login(user)
    .then((user) => store.dispatch({ type: SET_USER, user }))
    .catch((err) => console.log('err:', err))
}

export function onLogOut() {
    userService.logout()
    .then(()=> {
        store.dispatch({ type: SET_USER, user: null })
    })
    .catch((err) => {
        console.log('err:', err)
        throw(err)
    })
}

