const express = require('express')
const { requireAuth, requireAdmin, requireLogin } = require('../../middlewares/requireAuth.middleware')
const {removeReview, addReview, getReviews} = require('./review.controller')

const router = express.Router()

router.get('/', getReviews)
router.post('/:toyId', requireAuth, requireLogin, addReview)
router.delete('/:reviewId',requireAuth, requireAdmin, removeReview)

module.exports = router