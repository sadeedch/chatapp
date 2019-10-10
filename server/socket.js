const connections = [];

module.exports.connect = function(io, db) {
    io.on('connection', socket => {
        connections.push(socket);
        socket.on('disconnect', () => delete connections.indexOf(socket));
        socket.on('message', msg => {
            //console.log(msg);
            connections.forEach(sock => sock.emit('message', msg));
            const collection = db.collection('messageList')
            collection.insertOne(msg)
        })
    })
}


