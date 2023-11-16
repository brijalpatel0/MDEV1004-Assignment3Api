// models/BookModel.js
import { Schema, model } from 'mongoose';

const bookSchema = new Schema({
  BooksName: {
    type: String,
    required: "Missing book title"
  },
  ISBN: {
    type: String,
    default: null
  },
  Rating: {
    type: Number,
    default: null
  },
  Author: {
    type: String,
    required: "Missing author"
},
  Genre: {
    type: String,
    required: "Missing genre"
}
});

const Book = model('Book', bookSchema);

export default Book;