import Quote from "../models/Quote.js";

// load all quotes
export const getQuotes = async (req, res) => {
  try {
    const allQuotes = await Quote.find();
    res.status(200).json(allQuotes);
    console.log("All quotes loaded 🔢");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// load single (random) quote
export const getQuote = async (req, res) => {
  try {
    // aggregate function finds a sample sized random # of objects
    const singleQuote = await Quote.aggregate([{ $sample: { size: 1 } }]);
    res.status(201).json(singleQuote);
    console.log("Single quote loaded 📃");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// upload quote
export const addQuote = async (req, res) => {
  const quote = req.body;
  
  // convert inputted quote to Quote schema for upload
  const newQuote = new Quote({
    text: quote.text,
    author: quote.author,
    from: quote.from
  });

  try {
    await newQuote.save();
    res.status(201).json(newQuote);
    console.log("Quote created 👍");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// delete quote
export const delQuote = async (req, res) => {
  const id = req.params.id;

  try {
    await Quote.findByIdAndDelete(id);
    res.status(201).json({ success: true, msg: "Quote deleted" });
    console.log("Quote removed 🗑️");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// edit quote
export const editQuote = async (req, res) => {
  const id = req.params.id;
  const quote = {
    _id: id,
    ...req.body,
    dateCreated: Date.now()
  };

  try {
    await Quote.updateOne({ _id: `${id}` }, { $set: quote });
    res.status(201).json({ success: true, msg: "Quote updated", id: id, quote: quote });
    console.log("Quote updated ⬆️");
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};