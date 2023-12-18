import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userInfoSchema = new Schema({
  _id: {
    type: String
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

const UserInfo = db.model("UserInfo", userInfoSchema);

export default UserInfo;