const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

async function query() {
    try {
        const collection = await dbService.getCollection('users')
        var users = await collection.find().toArray()
        users = users.map(user => {
            delete user.password
            return user
        })
        return users
    } catch (err) {
        throw err
    }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ _id: ObjectId(userId) })
        delete user.password
        return user
    } catch (err) {
        throw err
    }
}

async function update(user) {
    try {
        const userToSave = {
            username: user.username,
            password: user.password,
        }
        const collection = await dbService.getCollection('users')
        await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
        return userToSave
    } catch (err) {
        throw err
    }
}

async function add(user) {
    try {
        const collection = await dbService.getCollection('users')
        await collection.insertOne(user)
        return user
    } catch (err) {
        throw err
    }
}

async function getByUsername(username) {
    try {
        const collection = await dbService.getCollection('users')
        const user = await collection.findOne({ username })
        return user
    } catch (err) {
        throw err
    }
}

async function getUserReviews(userId) {
    try {
        const criteria = { userId: ObjectId(userId)  }
        const collection = await dbService.getCollection('review')
        let reviews = await collection.aggregate([
            {
                $match: criteria
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
            review.toy = { _id: review.toy._id, name: review.toy.name }
            delete review.userId
            delete review.toyId
            return review
        })
        return reviews
    } catch (err) {
        throw err
    }
}

module.exports = {
    query,
    getById,
    update,
    add,
    getByUsername,
    getUserReviews
}

