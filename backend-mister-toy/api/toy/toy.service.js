const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
var labels = require('../../data/labels.json')

async function query(filterBy) {
    try {
        const criteria = {
            name: { $regex: filterBy.name, $options: 'i' }
        }
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find(criteria).toArray()
        return toys
    } catch (err) {
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ _id: ObjectId(toyId) })
        return toyId
    } catch (err) {
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        throw err
    }
}

async function update(toy) {
    try {
        const toyId = toy._id
        const updateToy = 
        {
        name: toy.name,
        price: toy.price,
        labels: toy.labels,
        createdAt: toy.createdAt,
        imgUrl: toy.imgUrl,
        inStock: toy.inStock,
        msgs: toy.msg
        }
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $set: updateToy })
        return toy
    } catch (err) {
        throw err
    }
}

async function queryLabels() {
    return Promise.resolve(labels)
}

async function addMsg(toyId, msg) {
    try {
        msg.id = _makeId()
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toyId) }, { $push: { msgs: msg } })
        return msg
    } catch (err) {
        throw err
    }
}

function _makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    queryLabels,
    addMsg
}