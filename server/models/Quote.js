import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: ""
  },
  from: {
    type: String,
    default: ""
  },
  dateCreated: {
    type: Date,
    default: Date.now()
  }
})

export default mongoose.model("Quote", quoteSchema);