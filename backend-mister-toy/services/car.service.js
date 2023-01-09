const fs = require('fs');
var toys = require('../data/car.json')


module.exports = {
    query,
    get,
    remove,
    save
}

function query(filterBy) {
    filterBy.maxPrice = +filterBy.maxPrice
    let filteredCars = cars
    if (filterBy.vendor) {
        const regex = new RegExp(filterBy.vendor, 'i')
        filteredCars = filteredCars.filter(car => regex.test(car.vendor))
    }
    if (filterBy.maxPrice) {
        filteredCars = filteredCars.filter(car => car.price <= filterBy.maxPrice)
    }
    return Promise.resolve(filteredCars)
}

function get(carId) {
    const car = cars.find(car => car._id === carId)
    if (!car) return Promise.reject('Car not found')
    return Promise.resolve(car)
}

function remove(carId, loggedinUser) {
    const idx = cars.findIndex(car => car._id === carId)
    if (idx === -1) return Promise.reject('No Such Car')
    const car = cars[idx]
    if (car.owner._id !== loggedinUser._id) return Promise.reject('Not your Car')
    cars.splice(idx, 1)
    return _writeCarsToFile()
}


function save(car, loggedinUser) {
    if (car._id) {
        const carToUpdate = cars.find(currCar => currCar._id === car._id)
        if (!carToUpdate) return Promise.reject('No such Car')
        if (carToUpdate.owner._id !== loggedinUser._id) return Promise.reject('Not your Car')

        carToUpdate.vendor = car.vendor
        carToUpdate.speed = car.speed
    } else {
        car._id = _makeId()
        car.owner = loggedinUser
        cars.push(car)
    }
    return _writeCarsToFile().then(() => car)
}

function _makeId(length = 5) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}


function _writeCarsToFile() {
    return new Promise((res, rej) => {
        const data = JSON.stringify(cars, null, 2)
        fs.writeFile('data/car.json', data, (err) => {
            if (err) return rej(err)
            // console.log("File written successfully\n");
            res()
        });
    })
}