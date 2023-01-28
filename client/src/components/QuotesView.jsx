import React, { useEffect, useState } from "react";
import * as api from "../api";
import AddQuote from "../components/AddQuote"
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
  const [update, setUpdate] = useState(false);
  
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

    setUpdate(false);
  }, [update]);

  function updateQuotes() {
    setUpdate(true);
  }

  return (
    <>
      <div className="glass-block rounded-3 p-4 mb-4">
        <h5>All Quotes</h5>
        <ul className="row gap-3 p-2">
          {Array.from(quotesList).map((quote) => {
            return <Quote key={quote._id} {...quote} updateQuotes={updateQuotes} />
          })}
        </ul>
        <h5>One quote</h5>
        <div>
          {Array.from(quote).map((quote) => {
            return <Quote key={quote._id} {...quote} updateQuotes={updateQuotes} />
          })}
        </div>
      </div>
      <AddQuote updateQuotes={updateQuotes}/>
    </>
  );
}

export default QuotesView;