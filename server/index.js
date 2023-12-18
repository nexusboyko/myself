import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import extractGoogleUserInfoPayloadAndTokens from './authGoogle.js';
import { loadUserInfoGoogle } from './controllers/user.js';

dotenv.config();

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

async function lookupUserInfo(req) {
  // send the code to Google auth API to retrieve user info (if correct)
  const googleUserInfoPayloadAndTokens = await extractGoogleUserInfoPayloadAndTokens(req);
  const googleUserTokens = googleUserInfoPayloadAndTokens.tokens;
  const googleUserPayload = googleUserInfoPayloadAndTokens.payload;

  if(!googleUserTokens) {
    const error = new Error('Invalid user authentication tokens!');
    error.code = 'InvalidUserAuthTokens';
  }

  if(!googleUserPayload) {
    const error = new Error('Invalid user authentication information!');
    error.code = 'InvalidUserAuthInfo';
  }

  const userInfo = await loadUserInfoGoogle(googleUserPayload);
  if(!userInfo) {
    const error = new Error('Google user not found!');
    error.code = 'GoogleUserNotFound';
  }

  return {
    accessToken: googleUserTokens.access_token,
    tokenType: googleUserTokens.token_type,
    userInfo: userInfo
  };
}

/** Get user profile information. */
app.post("/api/users/myprofile", async (req, res) => {
  let userInfoAndTokens;
  try {
    userInfoAndTokens = await lookupUserInfo(req);
    
    res.header('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(userInfoAndTokens));
    console.log();
  } catch (error) {
    console.error(userInfo, error);
    res.status(401).send({
      message: error.message
    });
  }
});

/** Connect to MongoDB & start server */

const port = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB Atlas ✅');

    app.listen(port, () => console.log(`server...http://localhost:${port}/`));
  })
  .catch(err => console.log('Error on server startup!', err));
