import mongoose from "mongoose";

const quoteCardSchema = new mongoose.Schema({
  _id: {
    type: String
  },
  userId: {
    type: String,
    required: true,
    ref: "UserInfo"
  },
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: ""
  },
  source: {
    type: String,
    default: ""
  },
  dateAdded: {
    type: Date,
    default: Date.now()
  }
});

// save model under database "myself"
const db = mongoose.connection.useDb('myself');

const QuoteCard = db.model("QuoteCard", quoteCardSchema);

export default QuoteCard;