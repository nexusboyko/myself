import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userGoogleProfileSchema = new Schema({
  _id: {
    type: String
  },
  customId: {
    type: String,
    required: true,
    unique: true
  },
  googleId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  profilePicture: {
    type: String
  },
  timeCreated: {
    type: Date,
    default: Date.now
  },
  timeUpdated: {
    type: Date,
    default: Date.now
  }
});

// save model under database "myself"
const db = mongoose.connection.useDb('myself');

const UserGoogleProfile = db.model("UserGoogleProfile", userGoogleProfileSchema);

export default UserGoogleProfile;