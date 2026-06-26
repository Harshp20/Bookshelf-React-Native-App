import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
	},
	profileImage: {
		type: String,
		default: "",
	},
});

// hash password before saving it
userSchema.pre("save", async function () {
	if (!this.isModified("password")) return;

	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePasswords = async function (userPassword) {
	return await bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
