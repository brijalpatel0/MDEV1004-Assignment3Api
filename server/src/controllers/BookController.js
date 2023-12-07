// controllers/BookController.js
import Book from "../models/BookModel.js";

async function createBook(req, res) {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ error: "Could not create book" });
  }
}

async function getAllBooks(req, res) {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve books" });
  }
}

async function getBookById(req, res) {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Could not retrieve the book" });
  }
}

async function updateBook(req, res) {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ error: "Could not update the book" });
  }
}

async function deleteBook(req, res) {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Could not delete the book" });
  }
}

export default {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  // Export other controller functions as needed
};
