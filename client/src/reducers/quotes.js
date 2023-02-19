const reducer = (quotes = [], action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...quotes, action.payload];
    case "UPDATE":
      return quotes.map((quote) => quote._id === action.payload.id ? action.payload.quote : quote);
    case "DELETE":
      return quotes.filter((quote) => quote._id !== action.payload);
    default:
      return quotes;
  }
}

export default reducer;