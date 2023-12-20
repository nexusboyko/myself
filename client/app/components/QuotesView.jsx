import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { createQuoteCard, fetchAllQuoteCards } from "../redux/features/quotesSlice";

import QuoteCard from "./QuoteCard";

const QuotesView = (props) => {
  const dispatch = useDispatch();
  const [newQuoteCard, setNewQuoteCard] = useState({
    text: "",
    author: "",
    source: "",
  });
  const [newQuoteCardForm, setNewQuoteCardForm] = useState(false);

  useEffect(() => {
    // TODO: Add userId validation
    dispatch(fetchAllQuoteCards(props.userId));
  }, []);

  const addNewQuoteCard = () => {
    setNewQuoteCardForm(false);
    // TODO: Add input validation
    const quoteCardWithUserId = {
      userId: props.userId,
      ...newQuoteCard,
    }
    dispatch(createQuoteCard(quoteCardWithUserId));
    setNewQuoteCard({ text: "", author: "", source: "" });
  };

  return (
    <>
      <div className="gradient-3 w-full h-fit p-5 rounded-lg">
        <div className="flex justify-between items-center">
          <h1 className="text-lg">Quotes</h1>
          {!newQuoteCardForm && (<button
            className="btn btn-sm btn-ghost glass-effect"
            onClick={() => {
              setNewQuoteCardForm(true);
            }}
          >
            Add
          </button>)}
        </div>

        {newQuoteCardForm && (
          <form
            className="w-full my-3 p-3 glass-effect rounded-lg"
            onSubmit={addNewQuoteCard}
          >
            <div>
              <label className="label">
                <small className="">Text</small>
              </label>
              <textarea
                rows="2"
                type="text"
                placeholder="Text"
                className="w-full p-3 border rounded-lg input-bordered bg-transparent"
                value={newQuoteCard.text}
                onChange={(e) => {
                  setNewQuoteCard({ ...newQuoteCard, text: e.target.value });
                }}
              />
            </div>
            <div>
              <label className="label">
                <small className="">Author</small>
              </label>
              <input
                type="text"
                placeholder="Author"
                className="w-full p-3 border rounded-lg input-bordered bg-transparent"
                value={newQuoteCard.author}
                onChange={(e) => {
                  setNewQuoteCard({ ...newQuoteCard, author: e.target.value });
                }}
              />
            </div>
            <div>
              <label className="label">
                <small className="">Source</small>
              </label>
              <input
                type="text"
                placeholder="Source"
                className="w-full p-3 border rounded-lg input-bordered bg-transparent"
                value={newQuoteCard.source}
                onChange={(e) => {
                  setNewQuoteCard({ ...newQuoteCard, source: e.target.value });
                }}
              />
            </div>
            <div className="flex justify-end mt-3 gap-x-2">
              <button
                className="btn btn-sm btn-ghost glass-effect"
                onClick={() => setNewQuoteCardForm(false)}
              >
                Discard
              </button>
              <button
                className="btn btn-sm btn-ghost glass-effect"
                type="submit"
              >
                Add
              </button>
            </div>
          </form>
        )}

        <ul className="list-none">{
          (!props.quotesList || !props.quotesList.length) ? 
            (<li key={0}>
              <div className="my-3 p-3 glass-effect rounded-lg">
                <p className="font-semibold">No quotes saved, click "Add" to get add a quote.</p>
              </div>
            </li>) :

      
            props.quotesList.map((quote) => {
              return (
                <li key={quote._id}>
                  <QuoteCard {...quote} />
                </li>
              );
            })
        }</ul>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    quotesList: state.quotes.list,
    userId: state.user._id
  };
};

export default connect(mapStateToProps)(QuotesView);
