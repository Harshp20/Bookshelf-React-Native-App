import mongoose, { type HydratedDocument, type Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
	username: string;
	email: string;
	password: string;
	profileImage: string;
}

export interface IUserMethods {
	comparePasswords(userPassword: string): Promise<boolean>;
}

type UserDocument = HydratedDocument<IUser, IUserMethods>;
type UserModel = Model<IUser, Record<string, never>, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>(
	{
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
	},
	{ timestamps: false },
);

userSchema.pre("save", async function () {
	if (!this.isModified("password")) return;

	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePasswords = async function (
	this: UserDocument,
	userPassword: string,
) {
	return bcrypt.compare(userPassword, this.password);
};

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;
