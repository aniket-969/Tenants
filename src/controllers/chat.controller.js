import { Chat } from "../models/chat.model.js";
import { ChatMessage } from "../models/chatMessage.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { emitSocketEvent } from "../socket/index.js";
import { ChatEventEnum } from "../constants.js";

const sendMessage = asyncHandler(async (req, res) => {
  const { chatId } = req.params;
  const { content } = req.body;

  if (!content && !req.files?.attachments?.length) {
    throw new ApiError(400, "Message content or attachment is required");
  }

  const selectedChat = await Chat.findById(chatId);

  if (!selectedChat) {
    throw new ApiError(404, "Chat does not exist");
  }

  const messageFiles = [];

  if (req.files && req.files.attachments?.length > 0) {
    req.files.attachments?.map((attachment) => {
      messageFiles.push({
        url: attachment.url
      });
    });
  }

  const message = await ChatMessage.create({
    sender: new mongoose.Types.ObjectId(req.user._id),
    content: content || "",
    chat: new mongoose.Types.ObjectId(chatId),
    attachments: messageFiles,
  });

  const chat = await Chat.findByIdAndUpdate(
    chatId,
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

  chat.participants.forEach((participantObjectId) => {
    if (participantObjectId.toString() === req.user._id.toString()) return;

    emitSocketEvent(
      req,
      participantObjectId.toString(),
      ChatEventEnum.MESSAGE_RECEIVED_EVENT,
      receivedMessage
    );
  });

  return res
    .status(201)
    .json(new ApiResponse(201, receivedMessage, "Message saved successfully"));
});

const deleteMessage = asyncHandler(async (req, res) => {
  
    const { chatId, messageId } = req.params;
  
    const chat = await Chat.findOne({
      _id: new mongoose.Types.ObjectId(chatId),
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
        { chat: chatId },
        {},
        { sort: { createdAt: -1 } }
      );
  
      await Chat.findByIdAndUpdate(chatId, {
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

export {sendMessage}