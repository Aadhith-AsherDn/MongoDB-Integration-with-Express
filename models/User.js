import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true   
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);

export default User;