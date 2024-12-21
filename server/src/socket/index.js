import { User } from "./../models/user.model.js";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { RoomEventEnum } from "../constants.js";

const mountJoinRoomEvent = (socket) => {
  socket.on(RoomEventEnum.JOIN_ROOM_EVENT, (roomId) => {
    console.log(`User joined the chat 🤝. chatId: `, roomId);

    socket.join(roomId);
  });
  socket.on(RoomEventEnum.LEAVE_ROOM_EVENT, (roomId) => {
    console.log(`User ${socket.user?._id} is leaving room: ${roomId}`);
    socket.leave(roomId);
  });
};

const initializeSocketIO = (io) => {
  return io.on("connection", async (socket) => {
    try {
      const token = socket.handshake.headers?.cookie?.accessToken;

      console.log("Reached at init");

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

      socket.emit(ChatEventEnum.CONNECTED_EVENT);

      console.log("User connected 🗼. userId: ", user._id.toString());

      mountJoinRoomEvent(socket);

      socket.on(ChatEventEnum.DISCONNECT_EVENT, () => {
        console.log("user has disconnected 🚫. userId: " + socket.user?._id);
        if (socket.user?._id) {
          socket.leave(socket.user._id);
        }
      });
    } catch (error) {
      console.log("error in inti", error);
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

export { initializeSocketIO, emitSocketEvent };
