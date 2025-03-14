import { User } from "../models/user.model.mjs";

const createUser = async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      password: req.body.password,
    });
    await newUser.save();
    res.render("partials/register-form");
  } catch (err) {
    if (err.code == 11000) {
      return res.render("partials/register-form", { usernameTaken: true });
    }
    res.send(`<section> error ${err.errmsg} </section> `);
  }
};

export default {
  createUser,
};
