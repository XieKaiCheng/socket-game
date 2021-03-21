const express = require('express');
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require('path')

app.use('/css',  express.static(path.join(__dirname, '/css')));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// This will emit the event to all connected sockets
io.emit("some event", {
  someProperty: "some value",
  otherProperty: "other value",
});

io.on("connection", (socket) => {
  console.log("a user connected");
  console.log("socket", socket.id);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
    io.emit("chat message", msg);
  });
});

http.listen(3000, () => {
  console.log("http://localhost:3000");
});
