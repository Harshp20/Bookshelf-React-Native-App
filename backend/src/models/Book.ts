import mongoose, { Model, Schema, Types } from "mongoose";

export interface IBook {
	title: string;
	caption: string;
	rating: number;
	image: string;
	userId: Types.ObjectId;
}

const bookSchema = new Schema<IBook, Model<IBook>>(
	{
		title: {
			type: String,
			required: true,
		},
		caption: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
			min: 1,
			max: 5,
		},
		image: {
			type: String,
			required: true,
		},
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{ timestamps: true },
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
