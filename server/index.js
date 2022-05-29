const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");

const io = require("socket.io")(server, {
	cors: {
		origin: "*",
		methods: [ "GET", "POST" ]
	}
});

app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send('Server is Running');
});

users = {};

io.on("connection", (socket) => {
	socket.emit("me", socket.id);
    if (!users[socket.id]){
        users[socket.id] = {
            id : socket.id,
            call_status : 'free',
        }
    }
    socket.broadcast.emit("users", users);
    //console.log(users);

	socket.on("disconnect", () => {
		socket.broadcast.emit("callEnded")
        console.log(socket.id + " disconnected");
        delete users[socket.id]
        console.log(users)
        socket.broadcast.emit("users", users);
	});

	socket.on("callUser", ({ userToCall, signalData, from, name }) => {
		io.to(userToCall).emit("callUser", { signal: signalData, from, name });
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
	});
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));