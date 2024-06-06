import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
const app = express()
app.use(cors())
const server = createServer(app);
const io = new Server(server, {
  cors : {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
})



io.on("connection", (socket)=>{
  console.log("user connected");
  console.log("id:", socket.id);
  socket.emit("welcome", "welcome to socket.io");
  socket.broadcast.emit("newUser", socket.id);
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})