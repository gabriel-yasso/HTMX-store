import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    title: String,
    body: String,
    price: String,
    image: {
      filename: String,
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", schema);
