import React, { useEffect, useState } from "react";
import MeditationTimer from "../components/MeditationTimer";
import { useSelector } from "react-redux";

const QuotesView = () => {
  const [quote, setQuote] = useState({text: "", author: ""});
  const randomQuote = useSelector((state) => state.reducers.quotes[Math.floor(Math.random()*state.reducers.quotes.length)]);

  useEffect(() => {
    setQuote(randomQuote);
  }, [randomQuote]);

  return (
    <>
      <div className="container glass-block rounded-3 p-4 mb-4">
        <div>
          {quote && 
          <>
            <div className="p-4 text-center text-white">
              <p className="display-6 mb-2">"{quote.text}"</p>
              <p> {quote.author}</p>
            </div>
            <MeditationTimer />
          </>}
        </div>
      </div>
    </>
  );
}

export default QuotesView;