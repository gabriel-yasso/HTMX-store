import { Product } from "../models/product.model.mjs";
import etag from "etag";

const createProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      title: req.body.title,
      body: req.body.body,
      price: req.body.price,
      image: {
        filename: req.file.originalname,
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });
    await newProduct.save();

    res.render("partials/product-form", {
      contextMsg: "One product was added",
    });
  } catch (err) {
    res.send(`error ${err}`);
    console.log(err);
  }
};

const getProductImage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.send("Image not found");
    }

    res.set("Content-Type", product.image.contentType);
    res.send(product.image.data);
  } catch (error) {
    res.send("Failed to retrieve image");
    console.log(error);
  }
};

const getProducts = async (req, res) => {
  try {
    const timestamps = await Product.find({}, { updatedAt: true, _id: false });

    const body = JSON.stringify(timestamps);

    if (etag(body) == req.headers["if-none-match"]) {
      return res.status(304).end();
    }

    res.set("Cache-Control", "private, max-age=3600, no-cache");
    res.set("ETag", etag(body));

    const productsArray = await Product.find();

    if (productsArray.length === 0) {
      return res.send("<section> no products found </section>");
    }

    let isAdmin = req.session.user ? req.session.user.isAdmin : false;

    res.render("partials/products", {
      productsArray,
      adminLogedIn: isAdmin,
      title: "Products",
    });
  } catch (err) {
    console.log(err);
  }
};

const removeProduct = async (req, res) => {
  try {
    if (!req.session.user || !req.session.user.isAdmin) {
      return res.render("partials/login-form", {
        contextMsg:
          "to delete a product you have to login with an admin account",
      });
    }
    const product = Product.findById(req.params.id);
    if (!product) return;
    await Product.findByIdAndDelete(req.params.id);
    res.send("");
  } catch (err) {
    console.log(err);
  }
};

export default {
  getProducts,
  createProduct,
  getProductImage,
  removeProduct,
};
