import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createQuote } from "../../actions/quotes";

const AddQuote = (props) => {
  const [newQuote, setNewQuote] = useState({ text: "", author: "", from: "" });
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(createQuote(newQuote));
    // reset form fields
    setNewQuote({ text: "", author: "", from: "" });
  };

  return (
    <>
      <div className="glass-block rounded-3 p-4">
        <form id="add-quote-form" className="" onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="quoteText">Quote</label>
            <textarea
              rows={2}
              type="text"
              className="form-control"
              id="quoteText"
              placeholder=""
              value={newQuote.text}
              onChange={(e) => setNewQuote({ ...newQuote, text: e.target.value })}
            ></textarea>
            {/* <small className="form-text text-light">
              <em>
                Remember! You can only remove this quote after{" "}
                <u>30 days</u>. Think about what you choose to add.
              </em>
            </small> */}
          </div>
          <div className="row">
            <div className="form-group mb-3 col-md-6">
              <label htmlFor="quoteAuthor">Author</label>
              <input
                type="text"
                className="form-control"
                id="quoteAuthor"
                placeholder=""
                value={newQuote.author}
                onChange={(e) =>
                  setNewQuote({ ...newQuote, author: e.target.value })
                }
              ></input>
            </div>
            <div className="form-group mb-3 col-md-6">
              <label htmlFor="quoteFrom">From</label>
              <input
                type="text"
                className="form-control"
                id="quoteFrom"
                placeholder=""
                value={newQuote.from}
                onChange={(e) =>
                  setNewQuote({ ...newQuote, from: e.target.value })
                }
              ></input>
            </div>
          </div>
          <button type="submit" className="btn btn-sm bg-light">Add quote</button>
        </form>
      </div>
    </>
  );
};

export default AddQuote;
