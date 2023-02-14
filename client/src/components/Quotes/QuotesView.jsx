import React, { useEffect, useState } from "react";
import * as api from "../../api";
import AddQuote from "./AddQuote"
import Quote from "./Quote";
import { useAutoAnimate } from '@formkit/auto-animate/react'

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
  const [update, setUpdate] = useState(false);
  const [listRef] = useAutoAnimate();
  
  useEffect(() => {
    // get all quotes
    getQuotes().then(x => {
      console.log(x); 
      setQuotesList(x);
    });
    setUpdate(false);
  }, [update]);

  function updateQuotes() {
    setUpdate(true);
  }
  // try function that adds new quote THEN adds to server in background

  return (
    <>
      <div className="glass-block rounded-3 p-4 mb-4">
        <h5>All Quotes</h5>
        <ul className="row gap-3 p-3" ref={listRef}>
          {Array.from(quotesList).map((quote) => {
            return <Quote key={quote._id} {...quote} updateQuotes={updateQuotes} />
          })}
        </ul>
        <AddQuote updateQuotes={updateQuotes}/>
      </div>
      
    </>
  );
}

export default QuotesView;