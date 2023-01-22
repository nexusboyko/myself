import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import addRoutes from "./routes/quotes.js";

dotenv.config();
const app = express();


// middleware -- executes whenever routes are "hit"
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// specific routes w/ specific functions
app.use("/quotes", addRoutes);

// connection to MongoDB database
const PORT = process.env.PORT || 6001;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`\nConnected to server port ${PORT} :)`)
    );
  })
  .catch((error) => console.log(`${error} \nDidn't connect. :(`));

