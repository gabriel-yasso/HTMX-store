import express from "express";
import mongoose from "mongoose";
import "dotenv/config"; // this package is not needed starting from node version 20.6.0 (I am using an older version)
import { engine } from "express-handlebars";
import path from "path";
import url from "url";
import session from "express-session";
import productsRouter from "./routes/products.router.mjs";
import productFormRouter from "./routes/productForm.router.mjs";
import usersRouter from "./routes/users.router.mjs";
import registerFormRouter from "./routes/registerForm.router.mjs";
import loginRouter from "./routes/login.router.mjs";
import loginFormRouter from "./routes/loginForm.router.mjs";

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

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");
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

app.use(
  session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);

app.use(productsRouter);
app.use(productFormRouter);
app.use(usersRouter);
app.use(registerFormRouter);
app.use(loginRouter);
app.use(loginFormRouter);

app.get("/", (req, res) => {
  res.render("home", { title: "Home", logedIn: req.session.user });
});

app.get("/landing", (req, res) => {
  res.render("partials/landing", { title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("partials/about", { title: "About" });
});

app.get("/contact", (req, res) => {
  res.render("partials/contact", { title: "Contact" });
});

app.use((req, res) => {
  res.status(404).render("partials/404route", { title: "Not Found" });
});

app.listen(port, () => {
  console.log("listening on port: ", port);
});
