import React, { useEffect, useState } from "react";
import * as api from "../api";
import Quote from "./Quote";

// get array of quotes
const getQuotes = async () => {
  try {
    // gets array response from API to get data (post)
    const { data } = await api.fetchQuotes();
    return data;

  } catch (error) {
    console.log(error.message);
  }
};

const getQuote = async () => {
  try {
    // gets array response from API to get data (post)
    const { data } = await api.fetchQuote();
    return data;

  } catch (error) {
    console.log(error.message);
  }
};

const QuotesView = () => {
  const [quotesList, setQuotesList] = useState([]);
  const [quote, setQuote] = useState([]);
  
  useEffect(() => {
    // get all quotes
    getQuotes().then(x => {
      console.log(x); 
      setQuotesList(x);
    });
    // get one quote
    getQuote().then(x => {
      console.log(x);
      setQuote(x);
    });
  }, []);

  return (
    <>
      <div className="container glass-block rounded-3 p-4 mb-4">
        <h5>All Quotes</h5>
        <ul className="row gap-3 p-2">
          {Array.from(quotesList).map((quote) => {
            return <Quote key={quote._id} {...quote} />
          })}
        </ul>
        <h5>One quote</h5>
        <div>
          {quote && <Quote {...quote[0]} />}
        </div>
      </div>
    </>
  );
}

export default QuotesView;