import React, { useState } from "react";
import * as api from "../api";

// delete quote
const removeQuote = async (id) => {
  console.log(id);
  try {
    const res = await api.deleteQuote(id);
    console.log(res);

  } catch (error) {
    console.log(error.message);
  }
};

// edit quote
const changeQuote = async (quote, id) => {
  try {
    const res = await api.editQuote(quote, id);
    console.log(res);

  } catch (error) {
    console.log(error.message);
  }
}

const Quote = (props) => {
  // const fiveMin = (5*60*1000);
  // const timeSinceCreated = Math.abs((new Date() - new Date(props.dateCreated)));
  const [editedQuote, setEditedQuote] = useState({ text: "", author: "" });
  const [editMode, setEditMode] = useState();

  return (
    <>
      <div className="col-lg-3 p-0">
        <div className="quote-card rounded-3 p-3">
          <div className="">
            <h5 className="">"{props.text}"</h5>
            <p className="">{props.author !== "" && props.author}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="quote-card-buttons">
                <button className="btn btn-sm bg-light m-1" onClick={e => removeQuote(props._id)}> <small>Remove</small> </button>
                {/* <button className="btn btn-sm bg-light m-1" onClick={e => handleEdit(props._id)}> <small>Edit</small> </button> */}
                <button className="btn btn-sm bg-light m-1" onClick={() => setEditMode(true)}> <small>Edit</small> </button>
              </div>
              <p className="m-0"><small>{new Date(props.dateCreated).toDateString()}</small></p>
            </div>
            {editMode && 
                (<>
                  <div className="container glass-block rounded-3 p-4">
                    <form className="">
                      <div className="form-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="quoteText"
                          placeholder={props.text}
                          onChange={(e) => setEditedQuote({ ...editedQuote, text: e.target.value })}
                        ></input>
                      </div>
                      <div className="form-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="quoteAuthor"
                          placeholder={props.author}
                          onChange={(e) =>
                            setEditedQuote({ ...editedQuote, author: e.target.value })
                          }
                        ></input>
                      </div>
                    </form>
                    <button className="btn btn-sm bg-light m-1" onClick={e => {
                      changeQuote(editedQuote, props._id);
                      setEditMode(false);
                    }}> <small>Confirm</small> </button>
                    <button className="btn btn-sm bg-light m-1" onClick={e => { setEditMode(false) }}> <small>Discard</small> </button>
                  </div>
                  
                </>)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Quote;