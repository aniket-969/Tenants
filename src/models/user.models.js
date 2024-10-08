import mongoose,{ Schema } from "mongoose";
import bcrypt from "bcrypt"

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
        default: true 
      },

      rooms: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Room' 
        }
      ],
    
      refreshToken: {
        type: String,
      }
    },
    {
      timestamps: true,
    }
  );

  userSchema.pre('save',async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next()
  })

  userSchema.methods.isPasswordCorrect = async function(password){
    return bcrypt.compare(password,this.password)
  }


  
  export const User = mongoose.model("User",userSchema)