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

const QuotesView = () => {
  const [quotesList, setQuotesList] = useState([]);
  
  useEffect(() => {
    getQuotes().then(x => {
      console.log(x); 
      setQuotesList(x);
    });
  }, []);

  return (
    <>
      <h5 className="h5">Your Quotes</h5>
      <ul className="row">
        {Array.from(quotesList).map((quote) => {
          return <Quote key={quote._id} {...quote} />
        })}
      </ul>
    </>
  );
}

export default QuotesView;