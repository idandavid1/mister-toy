const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query() {
    try {
        const collection = await dbService.getCollection('review')
        let reviews = await collection.aggregate([
            {
                $lookup:
                {
                    localField: 'userId',
                    from: 'users',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
            {
                $lookup:
                {
                    localField: 'toyId',
                    from: 'toy',
                    foreignField: '_id',
                    as: 'toy'
                }
            },
            {
                $unwind: '$toy'
            }
        ]).toArray()
        reviews = reviews.map(review => {
            review.user = { _id: review.user._id, fullname: review.user.fullname }
            review.toy = { _id: review.toy._id, name: review.toy.name, price: review.toy.price }
            delete review.userId
            delete review.toyId
            return review
        })
        return reviews
    } catch (err) {
        throw err
    }
}

async function add(review) {
    try {
        review.userId=ObjectId(review.userId)
        review.toyId=ObjectId(review.toyId)
        const collection = await dbService.getCollection('review')
        await collection.insertOne(review)
        return review
    } catch (err) {
        throw err
    }
}

async function remove(reviewId) {
    try {
        const collection = await dbService.getCollection('review')
        await collection.deleteOne({ _id: ObjectId(reviewId) })
        return reviewId
    } catch (err) {
        throw err
    }
}

module.exports = {
    query,
    add,
    remove
}