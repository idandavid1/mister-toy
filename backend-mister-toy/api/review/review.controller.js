const reviewService = require('./review.service')

async function getReviews(req, res) {
    try {
        const reviews = await reviewService.query()
        res.send(reviews)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get reviews' })
    }
}

async function addReview(req, res) {
    const { loggedinUser } = req
    const { toyId } = req.params
    try {
        let review = req.body
        review.userId = loggedinUser._id
        review.toyId = toyId
        review = await reviewService.add(review)
        res.json(review)
      } catch (err) {
        res.status(500).send({ err: 'Failed to add review' })
      }
}

async function removeReview(req, res) {
    try {
        const { reviewId } = req.params
        const removedId = await reviewService.remove(reviewId)
        res.send(removedId)
    } catch (err) {
        res.status(500).send({ err: 'Failed to remove review' })
    }
}

module.exports = {
    getReviews,
    addReview,
    removeReview
}