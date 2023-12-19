import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteQuoteCardById,
  fetchAllQuoteCards,
  updateQuoteCard,
} from "../redux/features/quotesSlice";

const QuoteCard = (props) => {
  const dispatch = useDispatch();
  const [editQuoteCardForm, setEditQuoteCardForm] = useState(false);
  const [newQuoteCard, setNewQuoteCard] = useState({
    text: "",
    author: "",
    source: "",
  });

  const formattedDate = () => {
    const date = new Date(props.dateAdded).toDateString();
    const splitDate = date.split(" ");

    return (
      <span>{splitDate[1] + ". " + splitDate[2] + ", " + splitDate[3]}</span>
    );
  };

  const saveNewQuoteCard = () => {
    setEditQuoteCardForm(false);
    const updatedQuoteCard = {
      _id: props._id,
      userId: props.userId,
      ...(newQuoteCard.text ? { text: newQuoteCard.text } : { text: props.text}),
      ...(newQuoteCard.author ? { author: newQuoteCard.author } : { author: props.author}),
      ...(newQuoteCard.source ? { source: newQuoteCard.source } : { source: props.source}),
      dateAdded: props.dateAdded,
    }
    // TOOD: Add dateUpdated in the future?
    dispatch(updateQuoteCard(updatedQuoteCard));
    setNewQuoteCard({ text: "", author: "", source: "" });
  };

  return (
    <>
      {!editQuoteCardForm ? (
        <div className="my-3 p-3 glass-effect rounded-lg">
          <p className="font-semibold">"{props.text}"</p>
          <p>
            <small>
              - {props.author}, <span className="italic">{props.source}</span>
            </small>
          </p>
          <div className="flex justify-end items-center opacity-30">
            <small>Added {formattedDate()}</small>
            <button
              className="btn btn-ghost btn-xs ml-2 glass-effect"
              onClick={() => {
                dispatch(deleteQuoteCardById(props._id));
                dispatch(fetchAllQuoteCards(props.userId));
              }}
            >
              Remove
            </button>
            <button
              className="btn btn-ghost btn-xs glass-effect"
              onClick={() => {
                setEditQuoteCardForm(true);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      ) : (
        <form className="w-full my-3 p-3 glass-effect rounded-lg" onSubmit={saveNewQuoteCard}>
          <textarea
            rows={1}
            defaultValue={props.text}
            className="w-full font-semibold bg-transparent border border-t-0 border-l-0 border-r-0 border-b-gray-300"
            onChange={(e) => {
              setNewQuoteCard({ ...newQuoteCard, text: e.target.value });
            }}
          />
          <div className="flex gap-x-1">
            <small>
              <input
                type="text"
                name="author"
                defaultValue={props.author}
                className="bg-transparent border border-t-0 border-l-0 border-r-0 border-b-gray-300"
                onChange={(e) => {
                  setNewQuoteCard({ ...newQuoteCard, author: e.target.value });
                }}
              />
              ,
              <input
                type="text"
                name="source"
                defaultValue={props.source}
                className="bg-transparent border border-t-0 border-l-0 border-r-0 border-b-gray-300"
                onChange={(e) => {
                  setNewQuoteCard({ ...newQuoteCard, source: e.target.value });
                }}
              />
            </small>
          </div>
          <div className="flex justify-end items-center opacity-30">
            <small>Added {formattedDate()}</small>
            <button
              className="btn btn-ghost btn-xs ml-2 glass-effect"
              onClick={() => setEditQuoteCardForm(false)}
            >
              Discard
            </button>
            <button
              className="btn btn-ghost btn-xs glass-effect"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </>
  );
};

export default QuoteCard;
