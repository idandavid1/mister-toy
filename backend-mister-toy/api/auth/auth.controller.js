const authService = require('./auth.service')

async function login(req, res) {
    try {
        console.log('req.body:', req.body)
        const user = await authService.login(req.body)
        const loginToken = authService.getLoginToken(user)
        res.cookie('loginToken', loginToken)
        res.send(user)
    } catch (err) {
        res.status(401).send({ err: 'Failed to Login' })
    }
}

async function signup(req, res) {
    try {
        await authService.signup(req.body)
        const user = await authService.login(req.body)
        const loginToken = authService.getLoginToken(user)
        res.cookie('loginToken', loginToken)
        res.send(user)
    } catch (err) {
        res.status(500).send({ err: 'Failed to signup' })
    }
}

async function logout(req, res){
    try {
        res.clearCookie('loginToken')
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
}

module.exports = {
    login,
    signup,
    logout
}