import Quote from "../models/Quote.js";

// load all quotes
export const getQuotes = async (req, res) => {
  console.log("Getting all quotes..");

  try {
    const allQuotes = await Quote.find();
    res.status(200).json(allQuotes);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// upload quote
export const createQuote = async (req, res) => {
  const post = req.body;
  console.log("Post created 👍");
  
  // convert inputted post to Quote schema for upload
  const newQuote = new Quote({
    text: post.text,
    author: post.author
  });

  try {
    await newQuote.save();
    res.status(201).json(newQuote);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// load single quote
export const getQuote = async (req, res) => {
  console.log("Getting single quote..");

  try {
    const singleQuote = await Quote.findOne();
    res.status(201).json(singleQuote);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};