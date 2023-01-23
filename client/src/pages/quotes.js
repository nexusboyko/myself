import React from "react";
import AddQuote from "../components/AddQuote"
import QuotesView from "../components/QuotesView"

const Quotes = () => {
  return (
    <>
      <div className="quotes-page-color">
        <div className="container">
          <div className="display-6 mb-5">quotes</div>
          <QuotesView />
          <AddQuote />
        </div>
      </div>
    </>
  );
};

export default Quotes;
