import { asyncHandler } from "../utils/asyncHandler.js";
import { Room } from "../models/rooms.model.js";
import { CalendarEvent } from "../models/calendarEvents.model.js";

const createCalendarEvent = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    startDate,
    endDate,
    roomId,
    ref,
    isRecurring,
    recurrencePattern,
  } = req.body;
  const room = await Room.findById(roomId);
  if (!room) {
    throw new ApiError(404, "Room not found");
  }

  const calendarEvent = await CalendarEvent.create({
    title,
    description,
    startDate,
    endDate,
    room: roomId,
    isRecurring,
    recurrencePattern,
    createdBy: req.user?._id,
  });

  return res
    .status(201)
    .json(
      new ApiResponse(201, calendarEvent, "Calendar event created successfully")
    );
});

const deleteCalendarEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;
  const deletedEvent = await CalendarEvent.findByIdAndDelete(eventId);

  if (!deleteCalendarEvent) {
    throw new ApiError(404, "Calendar event not found");
  }

  return res.json(
    new ApiResponse(200, {}, "Calendar event deleted successfully")
  );
});

const getRoomCalendarEvent = asyncHandler(async (req, res) => {
  const { roomId } = req.params;

  const events = CalendarEvent.find({ room: roomId });

  if (!events || events.length == 0) {
    throw new ApiError(404, "No events found for this room");
  }
  return res.json(
    new ApiResponse(200, events, "Room events fetched successfully")
  );
});

const getSingleEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.body;

  const event = calendarEvent.findById(eventId);
  if (!event) throw new ApiError(404, "Event doesn't exist");

  return res.json(new ApiResponse(200, event, "Event fetched successfully"));
});

export { createCalendarEvent, deleteCalendarEvent, getRoomCalendarEvent };
