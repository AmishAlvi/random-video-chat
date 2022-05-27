const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const PORT = 3000;


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket, connection) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })
})

server.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})