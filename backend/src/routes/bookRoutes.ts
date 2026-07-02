import express, { Request, Response } from "express";
import cloudinary from "../lib/cloudinary.js";
import Book from "../models/Book.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { Types } from "mongoose";

const router = express.Router();

// create a book
router.post(
	"/books/create",
	protectRoute,
	async (req: Request, res: Response) => {
		try {
			const { title, caption, rating, image } = req.body;
			const { _id: userId } = (req as Request & { user: { _id: string } }).user;

			if (!title || !caption || !rating || !image) {
				res
					.status(400)
					.json({ message: "Missing required data for book creation." });
			}

			// upload image to cloudinary
			const uploadResponse = await cloudinary.uploader.upload(image);
			const imageUrl = uploadResponse.secure_url;

			// also save the image to db
			const newBook = new Book({
				title,
				caption,
				image: imageUrl,
				rating,
				userId,
			});

			await newBook.save();

			res.status(201).json(newBook);
		} catch (error) {
			if (error instanceof Error)
				res.status(500).json({ message: error.message });
		}
	},
);

router.get("/books", async (req: Request, res: Response) => {
	try {
		const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 10;
		const skip = (page - 1) * limit;
		const totalBooks = await Book.countDocuments();

		const books = await Book.find()
			.skip(skip)
			.limit(limit)
			.sort({ createdAt: -1 })
			.populate("user", "username profileImage");

		res.json({
			books,
			totalBooks,
			currentPage: page,
		});
	} catch (error) {
		return res.status(500).json({ message: "Internal server error." });
	}
});

router.delete(
	"/books/delete/:id",
	protectRoute,
	async (req: Request, res: Response) => {
		try {
			const bookId = req.params.id;
			const book = await Book.findById(bookId);

			if (!book) {
				return res.status(404).json({ message: "Book not found." });
			}

			assertUser(req);

			if (book.userId.toString() !== req.user._id.toString()) {
				return res.status(403).json({ message: "Unauthorized." });
			}

			await book.deleteOne();
			if (book.image && book.image.includes("cloudinary")) {
				try {
					const publicId = book.image.split("/").pop()?.split(".")[0];
					if (publicId) {
						await cloudinary.uploader.destroy(publicId);
					}
				} catch (error) {
					console.error(error);
				}
			}

			res.status(200).json({ message: "Book deleted successfully." });
		} catch (error) {
			if (error instanceof Error) {
				return res.status(500).json({ message: error.message });
			}
			return res.status(500).json({ message: "Internal server error." });
		}
	},
);

function assertUser(
	req: Request,
): asserts req is Request & { user: { _id: Types.ObjectId } } {
	if (!("user" in req)) throw new Error("User not found.");
}

export default router;
