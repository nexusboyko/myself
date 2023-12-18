import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle',
  accessToken: null,
  tokenType: null,
  error: null,
};

export const fetchUserInfo = createAsyncThunk(
  'users/fetchUserTokens',
  async (code, thunkAPI) => {
    console.log('fetchUserTokens', code);
    const res = await fetch(
      '/api/users/myprofile', {
        method: 'POST',
        body: JSON.stringify({
          code: code
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }
    )

    const json = await res.json();

    return json;
  }
);

// export const fetchQuotes = createAsyncThunk(
//   'quotes/fetchQuotes',
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await fetch('/api/quotes');
//       const data = await res.json();

//       return data;
//     } catch (error) {
      
//       return rejectWithValue(error.message);
//     }
//   }
// );

function parseUserInfo(state, payload) {
  Object.keys(payload).forEach((key) => {
    state[key] = payload[key];
  });
}

const usersSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    // updateAuthToken(state, action) {
    //   state.accessToken = action.payload.accessToken;
    //   state.tokenType = action.payload.tokenType;
    // }
  },
  extraReducers(builder) {
    builder
    .addCase(fetchUserInfo.pending, (state) => {
      state.status = 'loading';
      state.error = '';
    })
    .addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.status = 'succeeded';

      state.accessToken = action.payload.accessToken;
      state.tokenType = action.payload.tokenType;
      parseUserInfo(state, action.payload.userInfo);
      
      state.error = '';
    })
    .addCase(fetchUserInfo.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
  }
});

export const selectUserProfile = (state) => state.users.authProfile;
export const { updateAuthToken } = usersSlice.actions;

export default usersSlice.reducer;