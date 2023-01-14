import { userService } from "../services/user.service.js"
import {store } from "./store.js"
import { SET_USER } from "./user.reducer.js"

export async function setUser(user) {
    try {
        const saveUser = await userService.save(user)
        store.dispatch({ type: SET_USER, user: saveUser })
    } catch (err) {
        console.log('err:', err)
        throw(err)
    }
}

export async function sighup(user) {
    try {
        const saveUser = await userService.signup(user)
        store.dispatch({ type: SET_USER, user: saveUser })
    } catch(err) {
        console.log('err:', err)
    }
}

export async function login(user) {
    try {
        const saveUser = await userService.login(user)
        store.dispatch({ type: SET_USER, user: saveUser })
    } catch(err) {
        console.log('err:', err)
    }
}

export async function onLogOut() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
    } catch(err) {
        console.log('err:', err)
        throw(err)
    }
}

