import express from "express";
import mongoose from "mongoose";
import "dotenv/config"; // this package is not needed starting from node version 20.6.0 (I am using an older version)
import { engine } from "express-handlebars";
import path from "path";
import url from "url";
import productsRoute from "./routes/products.route.mjs";
import productFormRoute from "./routes/productForm.route.mjs";

const port = process.env.PORT || 5834;
const app = express();
const uri = process.env.MONGO_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log(err.errmsg, err.codeName, err.code);
  });

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: false }));

app.engine(
  "handlebars",
  engine({
    defaultLayout: "main",
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowedProtoMethodsByDefault: true,
    },
  })
);
app.set("view engine", "handlebars");
app.set("views", "./src/views");

app.use(productsRoute);
app.use(productFormRoute);

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/landing", (req, res) => {
  res.render("partials/landing");
});

app.get("/about", (req, res) => {
  res.render("partials/about");
});

app.get("/contact", (req, res) => {
  res.render("partials/contact");
});

app.use((req, res) => {
  res.status(404).render("partials/404route");
});

app.listen(port, () => {
  console.log("listening on port: ", port);
});
