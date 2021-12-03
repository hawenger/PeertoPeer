const express = require("express");
const path = require("path");
const ws = require("ws");

const app = express();
const wsServer = new ws.Server({ noServer: true });
wsServer.on("connection", (socket) => {
  socket.on("message", (message) => console.log(message));
});
const server = app.listen(9090);
server.on("upgrade", (request, socket, head) => {
  wsServer.handleUpgrade(request, socket, head, (socket) => {
    wsServer.emit("connection", socket, request);
  });
});
const port = process.env.PORT || 8080;
app.use(express.static(__dirname + "/public/"));
// sendFile will go here
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index2.html"));
});

app.listen(port);
console.log("http://localhost:" + port);
const client = new ws("ws://localhost:9090");

client.on("open", () => {
  // Causes the server to print "Hello"
  client.send("Hello");
});
