import mongoose from "mongoose";

const schema = new mongoose.Schema({
  username: {
    type: String,
    unique: true
  },
  password: String,
  isAdmin: { type: Boolean, default: false}
});

export const User = mongoose.model("User", schema);
