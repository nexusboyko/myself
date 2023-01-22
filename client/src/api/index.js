import axios from "axios";

// points to backend route
const url = "http://localhost:3001/quotes";

export const fetchQuotes = () => axios.get(url);
export const createQuote = (newQuote) => axios.post(url, newQuote);