
import { User } from './../models/user.model.js';


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
          "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
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