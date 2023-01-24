import React, { useState } from "react";
import * as api from "../api"

const createQuote = async (quote) => {
  try {
    const res = await api.createQuote(quote);
    console.log(res);

  } catch (error) {
    console.log(error.message);
  }
}

const AddQuote = () => {
  const [newQuote, setNewQuote] = useState({ text: "", author: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(newQuote);
    createQuote(newQuote);
  };

  return (
    <>
      <div className="container glass-block rounded-3 p-4">
        <h5>Add Quote</h5>
        <form className="" onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              id="quoteText"
              placeholder=". . ."
              value={newQuote.text}
              onChange={(e) => setNewQuote({ ...newQuote, text: e.target.value })}
            ></input>
            <small className="form-text text-muted">
              <em>
                Remember! You can only remove this quote after{" "}
                <strong>30 days</strong>. Think about what you choose to add.
              </em>
            </small>
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              id="quoteAuthor"
              placeholder=". . ."
              value={newQuote.author}
              onChange={(e) =>
                setNewQuote({ ...newQuote, author: e.target.value })
              }
            ></input>
          </div>
          <button type="submit" className="btn bg-light rounded-circle">
            <i className="bi bi-patch-plus"></i>
          </button>
        </form>
      </div>
    </>
  );
};

export default AddQuote;
