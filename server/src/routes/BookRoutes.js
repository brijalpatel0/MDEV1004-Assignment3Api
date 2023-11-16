// routes/bookRoutes.js
import { Router } from "express";
import BookController from "../controllers/BookController";
import { verifyUser } from "../controllers/UserCheck";

const router = Router();

router.get("/books", verifyUser, BookController.getAllBooks);
router.get("/books/:id", verifyUser, BookController.getBookById);
router.post("/books", verifyUser, BookController.createBook);
router.put("/books/:id", verifyUser, BookController.updateBook);
router.delete("/books/:id", verifyUser, BookController.deleteBook);

export default router;
