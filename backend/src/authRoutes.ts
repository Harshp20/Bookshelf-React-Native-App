import express, { type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { type Types } from "mongoose";
import User from "./models/User.js";
import chalk from "chalk";

function generateToken(userId: Types.ObjectId): string {
	return jwt.sign({ userId: userId.toString() }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});
}

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
	try {
		const { username, email, password } = req.body as {
			username?: string;
			email?: string;
			password?: string;
		};

		if (!username || !email || !password) {
			return res.status(400).json({
				message: "Missing fields.",
			});
		}

		if (password.length < 8) {
			return res.status(400).json({
				message: "Password too short. Min. 8 characters.",
			});
		}

		const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.status(400).json({
				message: "Email already exists.",
			});
		}

		const existingUsername = await User.findOne({ username });
		if (existingUsername) {
			return res.status(400).json({
				message: "Username already exists.",
			});
		}

		const profileImage = `https://api.dicebear.com/10.x/adventurer-neutral/svg?seed=${username}`;

		const newUser = new User({
			username,
			email,
			password,
			profileImage,
		});

		await newUser.save();

		const token = generateToken(newUser._id);

		console.log(chalk.cyan("--------------------------------"));
		console.log(chalk.green("User created successfully."));
		console.log(chalk.yellow("Token:"));
		console.log(chalk.yellow(token));
		console.log(chalk.blue("User data:"));
		console.log(chalk.magenta(JSON.stringify(newUser, null, 2)));
		res.status(201).json({
			token,
			user: {
				_id: newUser._id,
				username: newUser.username,
				email: newUser.email,
				profileImage: newUser.profileImage,
			},
		});
	} catch (error) {
		console.error("Error in /register route.", error);
		res.status(500).send({ message: "Internal server error." });
	}
});

router.post("/login", async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body as {
			email?: string;
			password?: string;
		};

		if (!email || !password) {
			return res.status(400).json({
				message: "Missing fields.",
			});
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "User doesn't exist." });
		}

		const isPasswordValid = await user.comparePasswords(password);
		if (!isPasswordValid) {
			return res.status(400).json({
				message: "Password is invalid",
			});
		}

		const token = generateToken(user._id);

		console.log(chalk.cyan("--------------------------------"));
		console.log(chalk.green("Token generated successfully."));
		console.log(chalk.yellow("Token:"));
		console.log(chalk.yellow(token));
		console.log(chalk.green("Login successful."));
		console.log(chalk.blue("User data:"));
		console.log(chalk.magenta(JSON.stringify(user, null, 2)));
		res.status(200).json({
			token,
			user: {
				_id: user._id,
				username: user.username,
				email: user.email,
				profileImage: user.profileImage,
			},
		});
	} catch (error) {
		console.error("Error in /login route.", error);
		res.status(500).send({ message: "Internal server error." });
	}
});

export default router;
