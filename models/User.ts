import mongoose, { Schema, models } from "mongoose";

// Defines the structure of a user document
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const User = models.User || mongoose.model("User", UserSchema);
export default User;
