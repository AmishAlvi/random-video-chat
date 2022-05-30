const app = require("express")();
const server = require("http").createServer(app);
const cors = require("cors");
//app.use(cors());

const io = require("socket.io")(server, {
	cors: {
		origin: '*',
	  }
});

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
	res.send('Server is Running');
});

usersInCall = {};
waiting_list = [];
peer = 0;



io.on("connection", (socket) => {
	socket.emit("me", socket.id);

	socket.on("disconnect", () => {
        console.log(socket.id + " disconnected");
		if(usersInCall[socket.id] !== undefined) {
			io.to(usersInCall[socket.id]).emit('otherDisconnected');
		}
	});

	socket.on("endCall", ({from, to}) => {
		console.log(from + " ended a call with " + usersInCall[from]);
		io.to(usersInCall[from]).emit('otherDisconnected');
	})

	socket.on("callUser", ({signalData, from, name}) => {
		console.log("from: " , from)
		if(waiting_list.length > 0){
			userToCall = waiting_list[0]
			usersInCall[from] = userToCall
			usersInCall[userToCall] = from
			io.to(userToCall).emit("callUser", { signal: signalData, from, name });
			waiting_list.pop();
		}
		else {
			waiting_list.push(from);
		}
	});

	socket.on("answerCall", (data) => {
		io.to(data.to).emit("callAccepted", data.signal)
		console.log("call accepted from:" + data.to)
	});
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));