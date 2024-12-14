export const RoomEventEnum = Object.freeze({
    JOIN_ROOM_EVENT: "joinRoom",
    LEAVE_ROOM_EVENT: "leaveRoom",
    JOIN_ROOM_REQUEST_EVENT: "joinRoomRequest",
    REQUEST_ROOM_RESPONSE_EVENT: "adminResponse",
    DELETE_ROOM_EVENT: "deleteRoom",
    UPDATE_ROOM_EVENT: "updateRoom",
});


export const ChatEventEnum = Object.freeze({
  
  JOIN_CHAT_EVENT: "joinChat",
  // ? when participant gets removed from group, chat gets deleted or leaves a group
  LEAVE_CHAT_EVENT: "leaveChat",
  // ? when admin updates a group name
  UPDATE_GROUP_NAME_EVENT: "updateGroupName",
  // ? when new message is received
  MESSAGE_RECEIVED_EVENT: "messageReceived",
  // ? when there is new one on one chat, new group chat or user gets added in the group
  NEW_CHAT_EVENT: "newChat",
  // ? when there is an error in socket
  SOCKET_ERROR_EVENT: "socketError",
  // ? when participant stops typing
  STOP_TYPING_EVENT: "stopTyping",
  // ? when participant starts typing
  TYPING_EVENT: "typing",
  // ? when message is deleted
  MESSAGE_DELETE_EVENT: "messageDeleted",
});

export const TaskEventEnum = Object.freeze({
  TASK_CREATE_EVENT: "connected",
  TASK_DELETE_EVENT: "connected",
  TASK_UPDATED_EVENT: "connected",
  TASK_SWITCH_REQUEST_EVENT: "connected",
  TASK_SWITCH_RESPONSE_EVENT: "connected",
});

export const MaintenanceEventEnum = Object.freeze({
  MAINTENANCE_CREATED_EVENT: "createMaintenance",
  MAINTENANCE_DELETED_EVENT: "deleteMaintenance",
  MAINTENANCE_UPDATED_EVENT: "updateMaintenace",
});

export const AvailableChatEvents = Object.values(ChatEventEnum);
