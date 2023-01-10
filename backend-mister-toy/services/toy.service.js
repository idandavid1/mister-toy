const fs = require('fs');
var toys = require('../data/toy.json')


module.exports = {
    query,
    get,
    remove,
    save
}

function query(filterBy) {
    let filteredToys = toys
    if (filterBy.name) {
        const regex = new RegExp(filterBy.name, 'i')
        filteredToys = filteredToys.filter(toy => regex.test(toy.name))
    }
    if (filterBy.inStock !== 'All' && filterBy.inStock) {
        const inStock = filterBy.inStock === 'true' ? true : false
        filteredToys = filteredToys.filter(toy => toy.inStock === inStock)
    }
    if(filterBy.labels){
        const labels = filterBy.labels.split(', ')
        filteredToys = filteredToys.filter(toy => toy.labels.some(label => labels.includes(label)))
    }
    if(filterBy.sortBy) {
        if(filterBy.sortBy === 'price') filteredToys.sort((p1, p2) => p1.price - p2.price)
        else if(filterBy.sortBy === 'createAt') filteredToys.sort((c1, c2) => c1.createAt - c2.createAt)
        else filteredToys.sort((n1, n2) => n1.localeCompare(n2))
    }
    return Promise.resolve(filteredToys)
}

function get(toyId) {
    const toy = toys.find(toy => toy._id === toyId)
    if (!toy) return Promise.reject('toy not found')
    return Promise.resolve(toy)
}

function remove(toyId) {
    const idx = toys.findIndex(toy => toy._id === toyId)
    if (idx === -1) return Promise.reject('toy not found')
    toys.splice(idx, 1)
    return _writeToysToFile()
}


function save(saveToy) {
    if (saveToy._id) {
        const idx = toys.findIndex(toy => toy._id === saveToy._id)
        console.log('idx:', idx)
        if (idx === -1) return Promise.reject('toy not found')
        toys[idx] = saveToy
    } else {
        saveToy._id = _makeId()
        toys.push(saveToy)
    }
    return _writeToysToFile().then()
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


function _writeToysToFile() {
    return new Promise((res, rej) => {
        const data = JSON.stringify(toys, null, 2)
        fs.writeFile('data/toy.json', data, (err) => {
            if (err) return rej(err)
            // console.log("File written successfully\n");
            res()
        });
    })
}