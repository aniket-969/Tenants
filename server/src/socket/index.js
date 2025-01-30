import { User } from "./../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ChatEventEnum, RoomEventEnum } from "../constants.js";
 
const mountJoinRoomEvent = (socket) => {
  const io = socket.server
  socket.on(RoomEventEnum.JOIN_ROOM_EVENT, (roomId) => {
    console.log(`User joined the chat 🤝. chatId: `, roomId);
 
    socket.join(roomId); 
    const room = io.sockets.adapter.rooms.get(roomId);
    const userCount = room ? room.size : 0;

    console.log(`Number of users in room ${roomId}: ${userCount}`);
  });  
  socket.on(RoomEventEnum.LEAVE_ROOM_EVENT, (roomId) => { 
    console.log(`User ${socket.user?._id} is leaving room: ${roomId}`);
    socket.leave(roomId);
  });
};

const initializeSocketIO = (io) => {
  const room = io.sockets.adapter.rooms.get('6756e343b2fdac1824b18cc1');
  const userCount = room ? room.size : 0;
 
  console.log(`Number of users in room : ${userCount}`);
  return io.on("connection", async (socket) => {
    try {
      const token =
        socket.handshake.headers.cookie
          ?.split("; ")
          .find((cookie) => cookie.startsWith("accessToken="))
          ?.split("=")[1] ||
        socket.handshake.headers.authorization?.replace("Bearer ", "");
      if (!token) {
        throw new ApiError(401, "Unauthorized request. Token is missing.");
      }

      // Verify the token
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

      // console.log("decodedToken", decodedToken);

      // Fetch the user from the database
      const user = await User.findById(decodedToken?._id).select(
        "-password -refreshToken"
      );

      if (!user) {
        throw new ApiError(401, "Unauthorized request. Invalid token.");
      }

      socket.user = user;
      socket.join(user._id.toString());

      console.log("User connected 🗼. userId: ", user._id.toString(),socket.id);

      mountJoinRoomEvent(socket);
 
      socket.on(RoomEventEnum.DISCONNECT_EVENT, () => {
        console.log("user has disconnected 🚫. userId: " + socket.user?._id);
        if (socket.user?._id) {
          socket.leave(socket.user._id);
        }
      });
    } catch (error) {
      console.log("error in init", error);
      socket.emit(
        ChatEventEnum.SOCKET_ERROR_EVENT,
        error?.message || "Something went wrong while connecting to the socket."
      );
    } 
  });
};
 
const emitSocketEvent = (req, roomId, event, payload) => {
  console.log("EMITTING",roomId,payload,event)
  req.app.get("io").in(roomId).emit(event, payload);
};
  
export { initializeSocketIO, emitSocketEvent };
