import React, { useEffect, useState } from "react";
import * as api from "../api";
import MeditationTimer from "../components/MeditationTimer";

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
  const [quote, setQuote] = useState([{text: "", author: ""}]);
  
  useEffect(() => {
    // get one quote
    getQuote().then(x => {
      console.log(x);
      setQuote(x);
    });
  }, []);

  return (
    <>
      <div className="container glass-block rounded-3 p-4 mb-4">
        <div>
          {quote && 
          <>
            <div className="text-center text-white">
              <p className="display-6 mb-2">"{quote[0].text}"</p>
              <p> {quote[0].author}</p>
            </div>
            <MeditationTimer />
          </>}
        </div>
      </div>
    </>
  );
}

export default QuotesView;