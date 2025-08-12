import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minLength: [3, "Name must be at least 3 characters long"],
        trim: true,
    },

    username: {
        type: String,
        minLength: [3, "Username must be at least 3 characters long"],
        unique: true,
        trim: true,
    },

    password: {
        type: String,
        required: true,
        minLength: [6, "Password must be at least 6 characters long"],
        maxLength: [20, "Password must be at most 20 characters long"],
        trim: true,
    },

    position: {
        type: String,
        required: true,
        default: "President",
        trim: true,
    },
});

userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;