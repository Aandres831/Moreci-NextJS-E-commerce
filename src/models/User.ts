import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String }, 
    image: { type: String, default: null },
    provider: { type: String, default: "credentials" }, 
});

const User = models.User || mongoose.model("User", UserSchema);
export default User;
