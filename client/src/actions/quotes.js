import * as api from "../api"

export const getQuotes = () => async (dispatch) => {
  try {
    const { data } = await api.fetchQuotes();
    dispatch({ type: "FETCH_ALL", payload: data });
  } catch (error) {
    console.log(error.message);
  }
}

export const createQuote = (quote) => async (dispatch) => {
  try {
    const { data } = await api.createQuote(quote);
    dispatch({ type: "CREATE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateQuote = (quote, id) => async (dispatch) => {
  try {
    const { data } = await api.editQuote(quote, id);
    dispatch({ type: "UPDATE", payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteQuote = (id) => async (dispatch) => {
  try {
    await api.deleteQuote(id);
    dispatch({ type: "DELETE", payload: id });
  } catch (error) {
    console.log(error.message);
  }
};