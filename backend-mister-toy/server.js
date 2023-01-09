const express = require('express')
const cookieParser = require('cookie-parser')
const toyService = require('./services/toy.service.js')
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
app.get('/api/toy', (req, res) => {
    const filterBy = req.query
    console.log('1111filterBy:', filterBy)
    toyService.query(filterBy)
        .then((toys) => {
            res.send(toys)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot get toys')
        })
})

// Update
app.put('/api/toy', (req, res) => {
    toyService.save(req.body)
        .then((toy) => {
            res.send(toy)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot update toy')
        })
})

// Create
app.post('/api/toy', (req, res) => {
    toyService.save(req.body)
        .then((toy) => {
            res.send(toy)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot create toy')
        })
})

// Read - GetById
app.get('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    console.log('toyId:', toyId)
    toyService.get(toyId)
        .then((toy) => {
            res.send(toy)
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot get toy')
        })
})

// Remove
app.delete('/api/toy/:toyId', (req, res) => {
    const { toyId } = req.params
    toyService.remove(toyId)
        .then(() => {
            res.send({ msg: 'Toy removed successfully', toyId })
        })
        .catch(err => {
            console.log('Error:', err)
            res.status(400).send('Cannot delete toy')
        })
})

// Listen will always be the last line in our server!
app.listen(3030, () => console.log('Server listening on port 3030!'))



