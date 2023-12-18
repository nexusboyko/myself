import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { fetchQuotes } from '../redux/features/quotesSlice';

const QuotesView = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuotes());
  }, []);

  const renderQuotesList = () => {
    if (!props.quotes || !props.quotes.length) {
      return <li key={0}>Loading...</li>;
    }

    return props.quotes.map((quote) => {
      return <li key={quote._id}>{quote.text}</li>;
    });
  }

  return (
    <div className="gradient-3 w-full h-fit p-5 rounded-lg">
      <ul className="list-none">{renderQuotesList()}</ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    quotes: state.quotes.quotes
  };
};

export default connect(mapStateToProps)(QuotesView);
