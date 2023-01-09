const express = require('express')
const cookieParser = require('cookie-parser')
const carService = require('./services/car.service.js')
const userService = require('./services/user.service.js')
const cors = require('cors')
const app = express()

// App configuration
app.use(express.static('public'))

const corsOptions = {
    origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
    credentials: true
}
app.use(cors(corsOptions))


app.use(cookieParser())
app.use(express.json())


// Real routing express
// List
app.get('/api/car', (req, res) => {
    const filterBy = req.query
    carService.query(filterBy)
        .then((cars) => {
            res.send(cars)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot get cars')
        })
})

// Update
app.put('/api/car', (req, res) => {
    const loggedinUser = userService.validateToken(req.cookies.loginToken)
    if (!loggedinUser) return res.status(401).send('Cannot update car')

    const car = req.body
    console.log('CAR ---------', car)
    carService.save(car, loggedinUser)
        .then((savedCar) => {
            res.send(savedCar)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot update car')
        })
})

// Create
app.post('/api/car', (req, res) => {
    const loggedinUser = userService.validateToken(req.cookies.loginToken)
    if (!loggedinUser) return res.status(401).send('Cannot add car')

    const car = req.body
    carService.save(car, loggedinUser)
        .then((savedCar) => {
            res.send(savedCar)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot create car')
        })
})

// Read - GetById
app.get('/api/car/:carId', (req, res) => {
    const { carId } = req.params
    carService.get(carId)
        .then((car) => {
            res.send(car)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot get car')
        })
})

// Remove
app.delete('/api/car/:carId', (req, res) => {
    const loggedinUser = userService.validateToken(req.cookies.loginToken)
    if (!loggedinUser) return res.status(401).send('Cannot update car')

    const { carId } = req.params
    carService.remove(carId, loggedinUser)
        .then(() => {
            res.send({ msg: 'Car removed successfully', carId })
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot delete car')
        })
})


// User API:
// List
app.get('/api/user', (req, res) => {
    const filterBy = req.query
    userService.query(filterBy)
        .then((users) => {
            res.send(users)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot get users')
        })
})

app.get('/api/user/:userId', (req, res) => {
    const { userId } = req.params
    userService.get(userId)
        .then((user) => {
            res.send(user)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot get user')
        })
})


app.post('/api/user/login', (req, res) => {
  
    const { username, password } = req.body
    userService.login({ username, password })
        .then((user) => {
            const loginToken = userService.getLoginToken(user)
            res.cookie('loginToken', loginToken)
            res.send(user)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot login')
        })
})

app.post('/api/user/signup', (req, res) => {
    const { fullname, username, password, score } = req.body
    userService.signup({ fullname, username, password, score })
        .then((user) => {
            const loginToken = userService.getLoginToken(user)
            res.cookie('loginToken', loginToken)
            res.send(user)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot signup')
        })
})

app.post('/api/user/logout', (req, res) => {
    res.clearCookie('loginToken')
    res.send('Logged out')
})

// Listen will always be the last line in our server!
app.listen(3030, () => console.log('Server listening on port 3030!'))



