import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";
import http from "http";
import { Server } from "socket.io";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    const port = process.env.PORT || 3000;

    const httpServer = http.createServer(app);

    const io = new Server(httpServer, {
      cors: {
        origin: `http://localhost:${process.env.CORS_ORIGIN}`,
        credentials: true,
      },
    });

    io.on("connection", (socket) => {
      console.log("A user connected:", socket.id);
      socket.on("message",(data)=>{
        console.log(data)
        io.emit("message",data)
      })
      socket.on("disconnect", () => {
        console.log("A user disconnected:", socket.id);
      });
    });

    httpServer.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Connection failed at port", err);
  });
