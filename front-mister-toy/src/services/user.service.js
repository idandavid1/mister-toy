import { httpService } from "./http.service.js";

const BASE_USER_URL = 'user/'
const BASE_AUTH_URL = 'auth/'

export const userService = {
    get,
    signup,
    login,
    logout,
    getEmptyCredentials,
    getLoggedInUser,
    save
}

function get(userId) {
    return httpService.get(BASE_USER_URL + userId)
}

async function signup(user) {
    try {
        const saveUser = await httpService.post(BASE_AUTH_URL + 'signup', user)
        const {fullname, username, isAdmin} = saveUser
        _saveLoggedInUser({fullname, username, isAdmin})
        return saveUser
    } catch (err) {
        throw err
    }
}

async function login(user) {
    try {
        const saveUser = await httpService.post(BASE_AUTH_URL + 'login', user)
        const {fullname, username, isAdmin} = saveUser
        _saveLoggedInUser({fullname, username, isAdmin})
        return saveUser
    } catch (err) {
        throw err
    }
}

function save(user) {
    if (user._id) return httpService.put(BASE_USER_URL, user)
    return httpService.post(BASE_USER_URL, user)
}

function getEmptyCredentials(fullname = '', username = '', password = '') {
    return { fullname, username, password, isAdmin: false }
}

function logout() {
    return httpService.post(BASE_AUTH_URL + 'logout').then(() => {
        sessionStorage.removeItem('logInUser')
    })
}

function getLoggedInUser() {
    return JSON.parse(sessionStorage.getItem('logInUser') || null)
}

function _saveLoggedInUser(user) {
    sessionStorage.setItem('logInUser', JSON.stringify(user))
}
