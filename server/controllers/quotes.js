import Quote from "../models/Quote";

export async function fetchAllQuotes() {
  const quotes = await Quote.find();

  return quotes;
}

export async function fetchSingleQuoteById(req) {
  
}

export async function createQuote(req) {
  
}

export async function updateQuoteById(req) {
  
}

export async function deleteQuoteById(req) {
  
}
