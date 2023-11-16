/********************************************************************************
    Student name: Pranay maheriya
    id: 200554061
    date: 10/11/2023

    Student name: Brijal patel
    id: 200551736
    date: 10/11/2023

    Student name: Karan
    id: 200517940
    date: 10/11/2023
********************************************************************************/

import express from "express";
import mongoose from "mongoose";
import BookRoutes from "./src/routes/BookRoutes";
import UserRoutes from "./src/routes/UserRoutes";
import Book from "./src/models/BookModel";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import passport from "passport";
import User from "./src/models/UserModel";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const mongoURI = process.env.DB_URL;

mongoose.connect(mongoURI);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const expressSession = require("express-session")({
  secret: process.env.SECRET || "secret",
  saveUninitialized: false,
  resave: false,
});
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

const db = mongoose.connection;

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB Atlas");
  // Insert data only if database is empty
  dataSeed();
});

app.use(express.json());
app.use("/api", BookRoutes);
app.use("/api/users", UserRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

async function dataSeed() {
  const datasetSize = await getDatabaseBookSize();
  if (datasetSize === 0) {
    //Insert example data if no data can be found
    console.log("Database is empty, populating with sample data...");
    await insertExampleData();
  }
}

async function getDatabaseBookSize() {
  try {
    const dataset = await Book.find({});
    return dataset.length;
  } catch (error) {
    console.log(`Unexpected error, ${error}`);
    return null;
  }
}

async function insertExampleData() {
  try {
    const parsedData = [
      {
        "BooksName": "To Kill a Mockingbird",
        "ISBN": "0061120081",
        "Rating": 4.28,
        "Author": "Harper Lee",
        "Genre": "Fiction"
      },
      {
        "BooksName": "1984",
        "ISBN": "0451524934",
        "Rating": 4.18,
        "Author": "George Orwell",
        "Genre": "Dystopian"
      },
      {
        "BooksName": "The Great Gatsby",
        "ISBN": "0743273567",
        "Rating": 3.93,
        "Author": "F. Scott Fitzgerald",
        "Genre": "Classic"
      },
      {
        "BooksName": "To Kill a Mockingbird",
        "ISBN": "9780061120084",
        "Rating": 4.28,
        "Author": "Harper Lee",
        "Genre": "Fiction"
      },
      {
        "BooksName": "The Catcher in the Rye",
        "ISBN": "0316769487",
        "Rating": 3.8,
        "Author": "J.D. Salinger",
        "Genre": "Coming-of-Age"
      },
      {
        "BooksName": "Harry Potter and the Sorcerer's Stone",
        "ISBN": "0439554934",
        "Rating": 4.48,
        "Author": "J.K. Rowling",
        "Genre": "Fantasy"
      },
      {
        "BooksName": "The Hobbit",
        "ISBN": "0618260307",
        "Rating": 4.26,
        "Author": "J.R.R. Tolkien",
        "Genre": "Fantasy"
      },
      {
        "BooksName": "Pride and Prejudice",
        "ISBN": "0140434267",
        "Rating": 4.26,
        "Author": "Jane Austen",
        "Genre": "Romance"
      },
      {
        "BooksName": "The Da Vinci Code",
        "ISBN": "0307474275",
        "Rating": 3.8,
        "Author": "Dan Brown",
        "Genre": "Mystery"
      },
      {
        "BooksName": "The Alchemist",
        "ISBN": "0061122416",
        "Rating": 3.86,
        "Author": "Paulo Coelho",
        "Genre": "Fantasy"
      },
      {
        "BooksName": "The Lord of the Rings",
        "ISBN": "0544003411",
        "Rating": 4.49,
        "Author": "J.R.R. Tolkien",
        "Genre": "Fantasy"
      },
      {
        "BooksName": "Brave New World",
        "ISBN": "0060850523",
        "Rating": 3.98,
        "Author": "Aldous Huxley",
        "Genre": "Science Fiction"
      },
      {
        "BooksName": "The Girl with the Dragon Tattoo",
        "ISBN": "0307454541",
        "Rating": 4.14,
        "Author": "Stieg Larsson",
        "Genre": "Mystery"
      },
      {
        "BooksName": "The Hunger Games",
        "ISBN": "0439023483",
        "Rating": 4.33,
        "Author": "Suzanne Collins",
        "Genre": "Science Fiction"
      },
      {
        "BooksName": "The Shining",
        "ISBN": "0385121679",
        "Rating": 4.22,
        "Author": "Stephen King",
        "Genre": "Horror"
      },
     
    ]    
    ;
    await Book.insertMany(parsedData);
    console.log("Example data inserted successfully");
  } catch (error) {
    console.error("Error inserting example data:", error);
  }
}