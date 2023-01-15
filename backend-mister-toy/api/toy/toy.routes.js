const express = require('express')
const { requireAuth, requireAdmin, requireLogin } = require('../../middlewares/requireAuth.middleware')
const { getToys, getToyById, addToy, updateToy, removeToy, queryLabels, getReviews } = require('./toy.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getToys)
router.get('/reviews/:toyId', getReviews)
router.get('/labels', queryLabels)
router.get('/:toyId', getToyById)
router.post('/', requireAdmin, addToy)
router.put('/',requireAdmin, updateToy)
router.delete('/:toyId',requireAdmin, removeToy)


module.exports = router