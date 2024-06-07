import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Container from "@mui/material/Container";
import { Button, TextField, Typography } from "@mui/material";

const socket = io("http://localhost:3000/");

export default function App() {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");
  const [messages, setMessages] = useState([]);
  const [myMessages, setMyMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMyMessages((prev) => [...prev, message]);
    setMessage("");
  };

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
      console.log("connected");
    });
    socket.on("welcome", (s) => {
      console.log(s);
    });
    socket.on("newUser", (s) => {
      console.log(s + " joined");
    });

    socket.on("message", (s) => {
      console.log(s);
    });
    socket.on("receive-message", (s) => {
      console.log(s);
      setMessages((prev) => [...prev, s]);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h3" component="div" gutterBottom>
          Hello, {socketId}
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="message"
            variant="outlined"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="room"
            variant="outlined"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <Button variant="contained" color="primary" type="submit">
            Send
          </Button>
        </form>
        <Typography variant="h3" component="div" gutterBottom>
          <div>
            <p>My Messages</p>
            <div className="messageBox">
              {messages.reverse().map((m) => (
                <div className="left">
                  <p>{m}</p>
                </div>
              ))}
              {myMessages.reverse().map((m) => (
                <div className="right">
                  <p>{m}</p>
                </div>
              ))}
            </div>
          </div>
        </Typography>
      </Container>
    </>
  );
}
