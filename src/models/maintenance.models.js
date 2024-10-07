import { Schema } from 'mongoose';

const maintenanceRequestSchema = new Schema({
  title: {
    type: String,
    required: true 
  },
  description: {
    type: String, 
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room', 
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'resolved', 'cancelled'], 
    default: 'pending'
  },
  assignedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User' 
  },
  maintenanceProvider: {
    type: String, 
    default: null
  },
  contactPhone: {
    type: String, 
    default: null
  },
  costEstimate: {
    type: Number, 
    default: 0
  },
  dateReported: {
    type: Date,
    default: Date.now 
  },
  dateResolved: {
    type: Date 
  }
}, { timestamps: true });

export default mongoose.model('MaintenanceRequest', maintenanceRequestSchema);
