const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const path = require('path')
const app = express()

app.use(cookieParser())
app.use(express.json())


// App configuration
// app.use(express.static('public'))

// const corsOptions = {
//     origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
//     credentials: true
// }
// app.use(cors(corsOptions))

if (process.env.NODE_ENV === 'production') {
    console.log('production:', production)
    app.use(express.static(path.resolve(__dirname, 'public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}

const toyRoutes = require('./api/toy/toy.routes')
const userRoutes = require('./api/user/user.routes')
const authRoutes = require('./api/auth/auth.routes')
const reviewRoutes = require('./api/review/review.routes')

// routes
app.use('/api/toy', toyRoutes)
app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/review', reviewRoutes)



// Listen will always be the last line in our server!
// app.listen(3030, () => console.log('Server listening on port 3030!'))

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const port = process.env.PORT || 3030

app.listen(port, () => {
    console.log(`App listening on port ${port}!`)
})







// app.get('/api/labels', (req, res) => {
//     toyService.queryLabels()
//         .then((labels) => {
//             res.send(labels)
//         })
//         .catch(err => {
//             console.log('Error:', err)
//             res.status(404).send('Cannot get labels')
//         })
// })

// // Real routing express
// // List
// app.get('/api/toy', (req, res) => {
//     const filterBy = req.query
//     toyService.query(filterBy)
//         .then((toys) => {
//             res.send(toys)
//         })
//         .catch(err => {
//             console.log('Error:', err)
//             res.status(404).send('Cannot get toys')
//         })
// })

// // Update
// app.put('/api/toy', (req, res) => {
//     toyService.save(req.body)
//         .then((toy) => {
//             res.send(toy)
//         })
//         .catch(err => {
//             console.log('Error:', err)
//             res.status(400).send('Cannot update toy')
//         })
// })

// // Create
// app.post('/api/toy', (req, res) => {
//     toyService.save(req.body)
//         .then((toy) => {
//             res.send(toy)
//         })
//         .catch(err => {
//             console.log('Error:', err)
//             res.status(400).send('Cannot create toy')
//         })
// })

// // Read - GetById
// app.get('/api/toy/:toyId', (req, res) => {
//     const { toyId } = req.params
//     console.log('toyId:', toyId)
//     toyService.get(toyId)
//         .then((toy) => {
//             res.send(toy)
//         })
//         .catch(err => {
//             console.log('Error:', err)
//             res.status(400).send('Cannot get toy')
//         })
// })

// // Remove
// app.delete('/api/toy/:toyId', (req, res) => {
//     const { toyId } = req.params
//     toyService.remove(toyId)
//         .then(() => {
//             res.send({ msg: 'Toy removed successfully', toyId })
//         })
//         .catch(err => {
//             console.log('Error:', err)
//             res.status(400).send('Cannot delete toy')
//         })
// })

