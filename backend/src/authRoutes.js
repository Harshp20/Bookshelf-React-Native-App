import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

function generateToken(userId) {
	return jwt.sign({ userId: userId.toString() }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});
}

const router = express.Router();

router.post("/register", async (req, res) => {
	try {
		const { username, email, password } = req.body;
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

		// get random profile avatar
		const profileImage = `https://api.dicebear.com/10.x/adventurer-neutral/svg?seed=${username}`;

		const newUser = new User({
			username,
			email,
			password,
			profileImage,
		});

		await newUser.save();

		const token = generateToken(newUser._id);

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

router.post("/login", async (req, res) => {
	try {
		const { email, password } = req.body;

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

		// generate and send the token back if the credentials are valid
		const token = generateToken(user._id);

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
