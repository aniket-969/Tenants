import { Room } from "../models/rooms.model.js";
import { ChatMessage } from "../models/chatMessage.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { emitSocketEvent } from "../socket/index.js";
import { ChatEventEnum } from "../constants.js";

const sendMessage = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  const { content } = req.body;

  if (!content && !req.files?.attachments?.length) {
    throw new ApiError(400, "Message content or attachment is required");
  }

  const selectedChat = await Room.findById(roomId);

  if (!selectedChat) {
    throw new ApiError(404, "Chat does not exist");
  }

  const messageFiles = [];

  if (req.files && req.files.attachments?.length > 0) {
    req.files.attachments?.map((attachment) => {
      messageFiles.push({
        url: attachment.url,
      });
    });
  }

  const message = await ChatMessage.create({
    sender: new mongoose.Types.ObjectId(req.user._id),
    content: content || "",
    chat: new mongoose.Types.ObjectId(roomId),
    attachments: messageFiles,
  });

  const chat = await Room.findByIdAndUpdate(
    roomId,
    {
      $set: {
        lastMessage: message._id,
      },
    },
    { new: true }
  );

  const receivedMessage = await ChatMessage.findById(message._id)
    .populate("sender", "username avatar email")
    .populate("chat", "room participants");

  if (!receivedMessage) {
    throw new ApiError(500, "Internal server error");
  }

  const recipients = [...selectedRoom.tenants];
  if (selectedRoom.landlord) {
    recipients.push(selectedRoom.landlord);
  }

  recipients.forEach((participantId) => {
    if (participantId.toString() === req.user._id.toString()) return;

    emitSocketEvent(
      req,
      participantId.toString(),
      ChatEventEnum.MESSAGE_RECEIVED_EVENT,
      receivedMessage
    );
  });


  return res
    .status(201)
    .json(new ApiResponse(201, receivedMessage, "Message saved successfully"));
});

const deleteMessage = asyncHandler(async (req, res) => {
  const { roomId, messageId } = req.params;

  const chat = await Room.findOne({
    _id: new mongoose.Types.ObjectId(roomId),
    participants: req.user?._id,
  });

  if (!chat) {
    throw new ApiError(404, "Chat does not exist");
  }

  const message = await ChatMessage.findOne({
    _id: new mongoose.Types.ObjectId(messageId),
  });

  if (!message) {
    throw new ApiError(404, "Message does not exist");
  }

  if (message.sender.toString() !== req.user._id.toString()) {
    throw new ApiError(
      403,
      "You are not the authorised to delete the message, you are not the sender"
    );
  }

  // if (message.attachments.length > 0) {

  //     message.attachments.forEach((attachment) => {

  //         deleteFileFromCloud(attachment.url);
  //       });
  // }

  await ChatMessage.deleteOne({
    _id: new mongoose.Types.ObjectId(messageId),
  });

  if (chat.lastMessage.toString() === message._id.toString()) {
    const lastMessage = await ChatMessage.findOne(
      { chat: roomId },
      {},
      { sort: { createdAt: -1 } }
    );

    await Chat.findByIdAndUpdate(roomId, {
      lastMessage: lastMessage ? lastMessage?._id : null,
    });
  }

  chat.participants.forEach((participantObjectId) => {
    if (participantObjectId.toString() === req.user._id.toString()) return;

    emitSocketEvent(
      req,
      participantObjectId.toString(),
      ChatEventEnum.MESSAGE_DELETE_EVENT,
      message
    );
  });

  return res
    .status(200)
    .json(new ApiResponse(200, message, "Message deleted successfully"));
});

const getAllMessages = asyncHandler(async (req, res) => {
  const { roomId } = req.params;

  const selectedChat = await Chat.findById(roomId);

  if (!selectedChat) {
    throw new ApiError(404, "Chat does not exist");
  }

  if (!selectedChat.participants?.includes(req.user?._id)) {
    throw new ApiError(400, "User is not a part of this chat");
  }

  const messages = await ChatMessage.find({ chat: roomId })
  .populate("sender", "name email avatar") 
  .sort({ createdAt: -1 }) 

  return res
    .status(200)
    .json(
      new ApiResponse(200, messages || [], "Messages fetched successfully")
    );
});

export { sendMessage,deleteMessage,getAllMessages };
