import express from "express";
import { fetchAllQuotes } from "../controllers/quotes.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const all = await fetchAllQuotes();
    
    res.status(200).json(all);
    console.log('Loaded all quotes');
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
});

export default router;