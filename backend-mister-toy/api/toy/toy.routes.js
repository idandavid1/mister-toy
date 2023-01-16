const express = require('express')
const { requireAuth, requireAdmin, requireLogin } = require('../../middlewares/requireAuth.middleware')
const { getToys, getToyById, addToy, updateToy, removeToy, queryLabels, getReviews, addToyMsgs } = require('./toy.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getToys)
router.get('/reviews/:toyId', getReviews)
router.get('/labels', queryLabels)
router.get('/:toyId', getToyById)
router.post('/',requireAuth, requireAdmin, addToy)
router.put('/:toyId/msgs',requireAuth, addToyMsgs)
router.put('/',requireAuth, requireAdmin, updateToy)
router.delete('/:toyId',requireAuth, requireAdmin, removeToy)


module.exports = router