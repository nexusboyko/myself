import express from "express";
import { getQuotes, getQuote, createQuote } from "../controllers/quotes.js";

const router = express.Router();

router.get("/", getQuotes);
router.get("/", getQuote);
router.post("/", createQuote);

export default router;