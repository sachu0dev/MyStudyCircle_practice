import { useEffect } from "react";
import { io } from "socket.io-client";
export default function App() {
  const socket = io("http://localhost:3000/");
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("welcome", (s) => {
      console.log(s);
    });
    socket.on("newUser", (s) => {
      console.log(s + "joined");
    });
  }, []);

  return (
    <>
      <div>App</div>
    </>
  );
}
