const express = require('express')
const {getUser, getUsers, updateUser, addUser, getReviews } = require('./user.controller')
const router = express.Router()

router.get('/', getUsers)
router.get('/reviews/:userId', getReviews)
router.get('/:userId', getUser)
router.put('/:userId',  updateUser)
router.post('/', addUser)

module.exports = router