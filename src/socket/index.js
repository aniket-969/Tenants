
import { User } from './../models/user.model.js';
import jwt from 'jsonwebtoken';
import {ApiError} from "../utils/ApiError.js"

const mountJoinChatEvent = (socket) => {
  socket.on(ChatEventEnum.JOIN_CHAT_EVENT, (chatId) => {
    console.log(`User joined the chat 🤝. chatId: `, chatId);
   
    socket.join(chatId);
  });
};

const initializeSocketIO = (io) => {
    return io.on("connection", async (socket) => {
      try {
       
        const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
  
        let token = cookies?.accessToken; 
  
        if (!token) {
        
          token = socket.handshake.auth?.token;
        }
  
        if (!token) {
          
          throw new ApiError(401, "Un-authorized handshake. Token is missing");
        }
  
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); 
  
        const user = await User.findById(decodedToken?._id).select(
          "-password -refreshToken "
        );
  
        if (!user) {
          throw new ApiError(401, "Un-authorized handshake. Token is invalid");
        }
        socket.user = user; 
        socket.join(user._id.toString());
       
        console.log("User connected 🗼. userId: ", user._id.toString());
       
      } catch (error) {
        socket.emit(
          ChatEventEnum.SOCKET_ERROR_EVENT,
          error?.message || "Something went wrong while connecting to the socket."
        );
      }
    });
  };

  const emitSocketEvent = (req, roomId, event, payload) => {
    
    req.app.get("io").in(roomId).emit(event, payload);
  };
  
  export {initializeSocketIO,emitSocketEvent}