import { Schema } from 'mongoose';

const awardSchema = new Schema({
  title: {
    type: String,
    required: true 
  },
  description: {
    type: String, 
  },
  image: {
    type: String, 
  },
  awardedTo: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  awardedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User', 
  },
  room: {
    type: Schema.Types.ObjectId,
    ref: 'Room', 
    required: true
  },
  criteria: {
    type: String, 
  },
 
}, { timestamps: true });

export default mongoose.model('Award', awardSchema);
