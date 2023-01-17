const toyService = require('../api/toy/toy.service.js')

var gIo = null

function setupSocketAPI(http) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*',
        }
    })
    gIo.on('connection', socket => {
        socket.on('chat-set-topic', topic => {
            if (socket.myTopic === topic) return
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic
        })
        socket.on('chat-send-msg', msg => {
            socket.broadcast.to(socket.myTopic).emit('chat-add-msg', msg)
            toyService.addMsgs(socket.myTopic, msg)
        })
        socket.on('chat-typing', fullname => {
            socket.broadcast.to(socket.myTopic).emit('chat-add-typing', fullname)
        })
        socket.on('chat-remove-typing-user', fullname => {
            socket.broadcast.to(socket.myTopic).emit('chat-stop-typing', fullname)
        })
        socket.on('user-watch', userId => {
            socket.join('watching:' + userId)
        })
        socket.on('set-user-socket', userId => {
            socket.userId = userId
        })
        socket.on('unset-user-socket', () => {
            delete socket.userId
        })
    })
}

function emitTo({ type, data, label }) {
    if (label) gIo.to('watching:' + label.toString()).emit(type, data)
    else gIo.emit(type, data)
}

async function emitToUser({ type, data, userId }) {
    userId = userId.toString()
    const socket = await _getUserSocket(userId)

    if (socket) {
        socket.emit(type, data)
    }
}

async function broadcast({ type, data, room = null, userId }) {
    userId = userId.toString()
    console.log('broadcast -> userId', userId)
    const excludedSocket = await _getUserSocket(userId)
    if (room && excludedSocket) {
        excludedSocket.broadcast.to(room).emit(type, data)
    } else if (excludedSocket) {
        excludedSocket.broadcast.emit(type, data)
    } else if (room) {
        gIo.to(room).emit(type, data)
    } else {
        gIo.emit(type, data)
    }
}

async function _getUserSocket(userId) {
    const sockets = await _getAllSockets()
    const socket = sockets.find(s => s.userId === userId)
    return socket
}
async function _getAllSockets() {
    const sockets = await gIo.fetchSockets()
    return sockets
}

// async function _printSockets() {
//     const sockets = await _getAllSockets()
//     console.log(`Sockets: (count: ${sockets.length}):`)
//     sockets.forEach(_printSocket)
// }

// function _printSocket(socket) {
//     console.log(`Socket - socketId: ${socket.id} userId: ${socket.userId}`)
// }

module.exports = {
    setupSocketAPI,
    emitTo,
    emitToUser,
    broadcast
}