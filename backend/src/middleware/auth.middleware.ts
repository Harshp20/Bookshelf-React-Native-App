import jwt from "jsonwebtoken";
import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";

export async function protectRoute(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	try {
		const token = req.header("Authorization")?.replace("Bearer ", "");
		if (!token) {
			return res.status(401).json({ message: "Unauthorized. No auth token." });
		}

		// this will yield userId in the form of { userId: <id> }
		const decodedToken = jwt.verify(token, process.env.JWT_SECRET) as {
			userId: string;
		};

		const user = await User.findById(decodedToken.userId).select("-password");
		if (!user) {
			return res.status(401).json({ message: "Unauthorized. No auth token." });
		}

		// Add user property to the req object (TypeScript needs declaration merging for custom properties)
		(req as Request & { user?: typeof user }).user = user;
		next();
	} catch (error) {}
}
