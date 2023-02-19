import React, { useState, useRef, useEffect } from "react";
import autoAnimate from '@formkit/auto-animate'
import { useDispatch } from "react-redux";
import { updateQuote, deleteQuote } from "../../actions/quotes";

const Quote = (props) => {
  // const fiveMin = (5*60*1000);
  // const timeSinceCreated = Math.abs((new Date() - new Date(props.dateCreated)));
  const [editedQuote, setEditedQuote] = useState({ text: props.text, author: props.author, from: props.from });
  const [editMode, setEditMode] = useState();
  const parent = useRef(null);
  const dispatch = useDispatch();

  const changeQuote = (quote, id) => {
    dispatch(updateQuote(quote, id));
  }
  const removeQuote = (id) => {
    dispatch(deleteQuote(id));
  }

  useEffect(() => {
    parent.current && autoAnimate(parent.current)
  }, [parent]);

  return (
    <>
      <div className="col p-0">
        <div className="quote-card rounded-3 p-3">
          <div className="" ref={parent}>
            <h5 className="">"{props.text}"</h5>
            <p className="">{props.author !== "" && props.author}{props.from !== "" && <em>{`, ${props.from}`}</em>}</p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="quote-card-buttons">
                <button className="btn btn-sm bg-light m-1" onClick={e => {
                  removeQuote(props._id);
                }}> <small>Remove</small> </button>
                <button className="btn btn-sm bg-light m-1" onClick={() => setEditMode(true)}> <small>Edit</small> </button>
              </div>
              <p className="m-0"><small>{new Date(props.dateCreated).toDateString()}</small></p>
            </div>
            {editMode && 
                (<>
                  <div className="container glass-block rounded-3 p-4">
                    <form className="" onSubmit={(e) => {
                      e.preventDefault();
                      props.updateQuotes();
                    }}>
                      <div className="form-group mb-3">
                        <textarea
                          rows={5}
                          type="text"
                          className="form-control"
                          id="quoteText"
                          defaultValue={props.text}
                          onChange={(e) => setEditedQuote({ ...editedQuote, text: e.target.value })}
                        ></textarea>
                      </div>
                      <div className="form-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="quoteAuthor"
                          defaultValue={props.author}
                          onChange={(e) =>
                            setEditedQuote({ ...editedQuote, author: e.target.value })
                          }
                        ></input>
                      </div>
                      <div className="form-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="quoteAuthor"
                          defaultValue={props.from}
                          onChange={(e) =>
                            setEditedQuote({ ...editedQuote, from: e.target.value })
                          }
                        ></input>
                      </div>
                    </form>
                    <button type="submit" className="btn btn-sm bg-light m-1" onClick={e => {
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