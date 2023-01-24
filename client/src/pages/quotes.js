import React from "react";
import AddQuote from "../components/AddQuote"
import QuotesView from "../components/QuotesView"

const Quotes = () => {
  return (
    <>
      <div className="container p-0">
        <div className="display-6 mb-5">quotes</div>
        <div className="quotes rounded-5 p-4">
          <QuotesView />
          <AddQuote />
        </div>
      </div>
    </>
  );
};

export default Quotes;
