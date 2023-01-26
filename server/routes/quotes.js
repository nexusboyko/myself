import express from "express";
import {
  getQuotes,
  getQuote,
  addQuote,
  delQuote,
  editQuote,
} from "../controllers/quotes.js";

const router = express.Router();

router.get("/", getQuotes);
router.get("/quote", getQuote);
router.post("/add", addQuote);
router.delete("/delete/:id", delQuote);
router.patch("/edit/:id", editQuote);

export default router;