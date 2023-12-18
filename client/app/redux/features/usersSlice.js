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

function parseUserInfo(state, payload) {
  Object.keys(payload).forEach((key) => {
    state[key] = payload[key];
  });
}

const usersSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    signOut(state) {
      state = initialState;
      return state;
    }
  },
  extraReducers(builder) {
    builder
    .addCase(fetchUserInfo.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.status = 'succeeded';

      state.accessToken = action.payload.accessToken;
      state.tokenType = action.payload.tokenType;
      parseUserInfo(state, action.payload.userInfo);
      
      state.error = null;
    })
    .addCase(fetchUserInfo.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
  }
});

export const selectUserProfile = (state) => state.users.authProfile;
export const { signOut } = usersSlice.actions;

export default usersSlice.reducer;