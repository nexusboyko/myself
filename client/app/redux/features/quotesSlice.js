import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  list: null,
  error: null
};

export const createQuoteCard = createAsyncThunk(
  'quotes/createQuoteCard',
  async (quoteCard, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/quotes/create`, {
        method: 'POST',
        body: JSON.stringify(quoteCard),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const json = await res.json();

      return json;
    } catch (error) {
      
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllQuoteCards = createAsyncThunk(
  'quotes/fetchAllQuoteCards',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/quotes/user/${userId}`);

      const json = await res.json();

      return json;
    } catch (error) {
      
      return rejectWithValue(error.message);
    }
  }
);

export const deleteQuoteCardById = createAsyncThunk(
  'quotes/deleteQuoteCardById',
  async (quoteCardId, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/quotes/delete/${quoteCardId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      const json = await res.json();

      return json;
    } catch (error) {
      
      return rejectWithValue(error.message);
    }
  }
);

export const updateQuoteCard = createAsyncThunk(
  'quotes/createQuoteCard',
  async (updatedQuoteCard, { rejectWithValue }) => {
    try {
      console.log(updatedQuoteCard);
      const res = await fetch(`/api/quotes/update/${updatedQuoteCard._id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedQuoteCard),
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const json = await res.json();

      return json;
    } catch (error) {
      
      return rejectWithValue(error.message);
    }
  }
);

export const quotesSlice = createSlice({
  name: 'quotes',
  initialState: initialState,
  reducers: {
    addQuote: (state, action) => {
      state.quotes.push(action.payload);
    },
    removeQuote: (state, action) => {
      state.quotes = state.quotes.filter(quote => quote !== action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createQuoteCard.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.list.push(action.payload);
      })
      .addCase(createQuoteCard.pending, (state, action) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(createQuoteCard.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(fetchAllQuoteCards.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.list = action.payload;
      })
      .addCase(fetchAllQuoteCards.pending, (state, action) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(fetchAllQuoteCards.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      })
      .addCase(deleteQuoteCardById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = state.list.filter(quote => quote._id !== action.payload._id);
        state.error = null;
      })
      .addCase(deleteQuoteCardById.pending, (state, action) => {
        state.status = 'pending';
        state.error = null;
      })
      .addCase(deleteQuoteCardById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error;
      });
  }
});

export const { addQuote, removeQuote } = quotesSlice.actions;
export default quotesSlice.reducer;