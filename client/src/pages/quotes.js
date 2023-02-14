import React from "react";
import QuotesView from "../components/Quotes/QuotesView"

const Quotes = () => {
  return (
    <>
      <div className="container p-0">
        <div className="display-6 mb-5 text-center">quotes</div>
        <div className="quotes rounded-5 p-4">
          <QuotesView />
        </div>
      </div>
    </>
  );
};

export default Quotes;
