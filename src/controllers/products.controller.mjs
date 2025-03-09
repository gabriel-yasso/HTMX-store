import { Product } from "../models/product.model.mjs";

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
    res.render("partials/product-form");
  } catch (err) {
    res.send(`error ${err}`);
    console.log(err);
  }
};

const getProductImage = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("product not found");
    }

    res.set("Content-Type", product.image.contentType); // recommended for the browser and necessary for other clients.
    res.send(product.image.data);
  } catch (error) {
    res.status(500).json("Failed to retrieve image");
    console.log(error);
  }
};

const getProducts = async (req, res) => {
  try {
    const productsArray = await Product.find();
    if (productsArray.length === 0) {
      res.status(404).send("no products found");
    }
    res.render("partials/products", { productsArray, title: "Products" });
  } catch (err) {
    console.log(err);
  }
};

const removeProduct = async (req, res) => {
  try {
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
