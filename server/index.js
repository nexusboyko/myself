import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
dotenv.config();

// id gen
import { customAlphabet } from "nanoid";

// google user auth
import extractGoogleUserInfoPayloadAndTokens from './authGoogle.js';
import { loadUserInfoGoogle } from './controllers/user.js';
import UserInfo from './models/UserInfo.js';

// quote cards
import QuoteCard from "./models/QuoteCard.js";

const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyz', 10);

async function generateQuoteCardId() {
  return nanoid();
}

// express app setup

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());


/**
 *  user auth
 */

async function lookupUserInfo(req) {
  // send the code to Google auth API to retrieve user info (if correct)
  const googleUserInfoPayloadAndTokens = await extractGoogleUserInfoPayloadAndTokens(req);
  const googleUserTokens = googleUserInfoPayloadAndTokens.tokens;
  const googleUserPayload = googleUserInfoPayloadAndTokens.payload;

  if(!googleUserTokens) {
    const error = new Error('Invalid user authentication tokens!');
    error.code = 'InvalidUserAuthTokens';
    throw error;
  }

  if(!googleUserPayload) {
    const error = new Error('Invalid user authentication information!');
    error.code = 'InvalidUserAuthInfo';
    throw error;
  }

  const userInfo = await loadUserInfoGoogle(googleUserPayload);
  if(!userInfo) {
    const error = new Error('Google user not found!');
    error.code = 'GoogleUserNotFound';
    throw error;
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

/**
 *  quote cards
 */

// export async function createQuoteCard(quoteCard, userId) {
//   let newQuoteCard = quoteCard;
//   const now = newQuoteCard.dateAdded || Date.now();

//   if(newQuoteCard._id) {
//     const quoteCardExists = await QuoteCard.findById(newQuoteCard._id);
    
//     if(quoteCardExists) {
//       const error = new Error(`Quote card ${newQuoteCard._id} already exists!`);
//       error.code = 'QuoteCardAlreadyExists';
//       throw error;
//     }
//   }
//   else {
//     newQuoteCard._id = await generateQuoteCardId();
//   }

//   if(!newQuoteCard.userId && userId) {
//     newQuoteCard.userId = userId;
//   }
// }

async function lookupUserById(userId) {
  const userInfo = await UserInfo.findById(userId);

  if(!userInfo) {
    const error = new Error('User not found!');
    error.code = 'UserNotFound';
    throw error;
  }

  return userInfo;
}

async function lookupQuoteCardById(quoteId) {
  const quoteCard = await QuoteCard.findById(quoteId);

  if(!quoteCard) {
    const error = new Error('Quote card not found!');
    error.code = 'QuoteCardNotFound';
    throw error;
  }

  return quoteCard;
}

app.get("/api/quotes/user/:userId", async (req, res) => {
  let userInfo;

  try {
    // verify user + fetch user id
    userInfo = await lookupUserById(req.params.userId);

  } catch (error) {
    console.error(userInfo, error);
    res.status(401).send({
      message: error.message
    })
  }

  try {
    const quotes = await QuoteCard.find({ userId: userInfo._id });

    res.header('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(quotes));
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
})

app.post("/api/quotes/create", async (req, res) => {
  let userInfo;

  try {
    // verify user + fetch user id
    userInfo = await lookupUserById(req.body.userId);

  } catch (error) {
    console.error(userInfo, error);
    res.status(401).send({
      message: error.message
    })
  }

  try {
    const _id = await generateQuoteCardId();

    const quoteCard = {
      _id,
      userId: userInfo._id,
      text: req.body.text,
      author: req.body.author,
      source: req.body.source,
      dateAdded: Date.now()
    };
    const newQuoteCard = new QuoteCard(quoteCard);
  
    try {
      const savedQuoteCard = await newQuoteCard.save();
      console.log('Quote card saved', savedQuoteCard);
    }
    catch(error) {
      throw new Error('Error saving quote card: ' + error);
    }

    res.header('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(quoteCard));
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
})

app.delete("/api/quotes/delete/:quoteId", async (req, res) => {
  let quoteCard;

  try {
    // verify quote card exists + get quote card id
    quoteCard = await lookupQuoteCardById(req.params.quoteId);

  } catch (error) {
    console.error(quoteCard, error);
    res.status(401).send({
      message: error.message
    })
  }

  try {
    await QuoteCard.findByIdAndDelete(quoteCard._id);

    res.status(200).send(JSON.stringify(quoteCard));
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
})

app.put("/api/quotes/update/:quoteId", async (req, res) => {
  let quoteCard;

  try {
    // verify quote card exists + get quote card id
    quoteCard = await lookupQuoteCardById(req.params.quoteId);

  } catch (error) {
    console.error(quoteCard, error);
    res.status(401).send({
      message: error.message
    })
  }

  try {
    await QuoteCard.findByIdAndUpdate(quoteCard._id, req.body);

    res.status(200).send({
      message: 'Quote card updated',
      prevQuoteCard: quoteCard,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    })
  }
})

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
