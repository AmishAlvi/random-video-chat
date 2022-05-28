const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');

const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: '*',
        method: ['GET', 'POST']
    }
});

app.use(cors());

const PORT = 5000 || process.env.PORT;


app.get('/', (req, res) => {
    res.send('Server is running');
})

io.on('connection', (socket, connection) => {
    console.log('a user connected');
    
    socket.emit('new user', socket.id)
    
    socket.on('disconnect', () => {
        console.log('user disconnected');
    })

    socket.on('start call', () => {

    })
})

server.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})