import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  quotes: [],
};

export const fetchQuotes = createAsyncThunk(
  'quotes/fetchQuotes',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch('/api/quotes');
      const data = await res.json();

      return data;
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
      .addCase(fetchQuotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.quotes = action.payload;
      })
      .addCase(fetchQuotes.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchQuotes.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const { addQuote, removeQuote } = quotesSlice.actions;
export default quotesSlice.reducer;