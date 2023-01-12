const userService = require('./user.service')

async function getUser(req, res) {
    try {
        const { userId } = req.params
        const user = await userService.getById(userId)
        res.send(user)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get user' })
    }
}

async function getUsers(req, res) {
    try {
        const users = await userService.query()
        res.send(users)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get users' })
    }
}

async function updateUser(req, res) {
    try {
        const user = req.body
        const savedUser = await userService.update(user)
        res.send(savedUser)
    } catch (err) {
        res.status(500).send({ err: 'Failed to update user' })
    }
}

async function addUser(req, res) {
    try {
        const user = req.body
        console.log('user:', user)
        const savedUser = await userService.add(user)
        res.send(savedUser)
    } catch (err) {
        res.status(500).send({ err: 'Failed to update user' })
    }
}

async function login(req, res) {
    try {
        const user = await userService.login(req.body)
        res.cookie("loginToken", user)
        res.send("user logged in")
    } catch (err) {
        res.status(500).send({ err: 'Failed to login' })
    }
}

module.exports = {
    getUser,
    getUsers,
    updateUser,
    addUser,
    login
}