import React from "react";
import * as api from "../api";

// delete quote
const removeQuote = async (id) => {
  console.log(id);
  try {
    // gets array response from API to get data (post)
    const res = await api.deleteQuote(id);
    console.log(res);

  } catch (error) {
    console.log(error.message);
  }
};

const Quote = (props) => {
  // const fiveMin = (5*60*1000);
  // const timeSinceCreated = Math.abs((new Date() - new Date(props.dateCreated)));

  return (
    <>
      <div className="col-md-3 p-0">
        <div className="quote-card rounded-3 p-3 border border-3 border-start-0 border-top-0 border-white border-opacity-25">
          <div className="">
            <h5 className="">"{props.text}"</h5>
            <p className="">{props.author}</p>
            {Math.abs((new Date() - new Date(props.dateCreated))) <= (5*60*1000) && <p>Edit</p>}
            <button className="btn btn-sm bg-light" onClick={e => removeQuote(props._id)}> <small>Remove</small> </button>
            <p><small>{new Date(props.dateCreated).toDateString()}</small></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Quote;