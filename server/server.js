const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

const { Server } = require('socket.io');

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on("join_room", ({ room, user }) => {
    socket.join(room);
    socket.to(room).emit("new_user", `${user} joined the room`);
    console.log(`${user} joined room: ${room}`);
  });

  socket.on("send_message", (data) => {
    const { room, msg, user } = data;
    io.to(room).emit("recieve_message", { msg, user });
    console.log(`Message from ${user} in room ${room}: ${msg}`);
  });

  socket.on("user_typing", (data) => {
    const { room, user, typing } = data;
    socket.to(room).emit("user_typing", { user, typing });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3001, () => {
  console.log('listening on *:3001');
});