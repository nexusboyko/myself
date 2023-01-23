import express from "express";
import {
  getQuotes,
  getQuote,
  addQuote,
  delQuote,
} from "../controllers/quotes.js";

const router = express.Router();

router.get("/", getQuotes);
router.get("/quote", getQuote);
router.post("/add", addQuote);
router.delete("/:id", delQuote);

export default router;