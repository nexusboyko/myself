import React, { useEffect, useState } from "react";
import AddQuote from "./AddQuote"
import Quote from "./Quote";
import { useAutoAnimate } from '@formkit/auto-animate/react'

import { useSelector } from "react-redux";

const QuotesView = () => {
  const quotes = useSelector((state) => state.reducers.quotes);
  const [quotesList, setQuotesList] = useState(quotes);
  const [listRef] = useAutoAnimate();
  
  useEffect(() => {
    setQuotesList(quotes);
  }, [quotes]);

  return (
    <>
      <div className="glass-block rounded-3 p-4 mb-4">
        <h5>All Quotes</h5>
        <ul className="row gap-3 p-3" ref={listRef}>
          {Array.from(quotesList).map((quote, i) => {
            return <Quote key={i} {...quote} />
          })}
        </ul>
        <AddQuote />
      </div>
      
    </>
  );
}

export default QuotesView;