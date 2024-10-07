import { Schema } from "mongoose";

const userSchema = new Schema(
    {
      username: {
        type: String,
        required: function() {
            return !this.isGuest; 
          }
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
      },
  
      email: {
        type: String,
        required: function() {
            return !this.isGuest; 
          }
        unique: true,
        lowercase: true,
        trim: true,
      },
  
      fullName: {
        type: String,
        required: function() {
            return !this.isGuest; 
          }
        trim: true,
        index: true,
      },
  
      avatar: {
        type: String,
        required: function() {
            return !this.isGuest; 
          }
      },
  
      password: {
        type: String,
        required: function() {
            return !this.isGuest; 
          }
      },
      role: {
        type: String,
        enum: ['guest', 'tenant', 'landlord'],
        default: 'guest'
      },
      isGuest: {
        type: Boolean,
        default: true // Default flag for guest users
      },
      rooms: [
        {
          type: mongoose.Schema.Types.ObjectId,
        //   ref: 'Room' // Reference to the rooms this user belongs to
        }
      ],
      tasks: [
        {
          type: mongoose.Schema.Types.ObjectId,
        //   ref: 'Task' // Reference to the tasks assigned to the user
        }
      ],
      calendarEvents: [
        {
          type: mongoose.Schema.Types.ObjectId,
        //   ref: 'CalendarEvent' 
        }
      ],
    
      refreshToken: {
        type: String,
      },
      expiresAt: { 
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  );