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

const allUsers = async (req, res) => {
  try {
    const usersArray = await User.find({});
    res.render("partials/users", { usersArray });
  } catch (err) {
    res.send(`<section> error ${err.errmsg} </section> `);
  }
};

const defineRole = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id,{$set: {isAdmin: !! +req.body.admin}})
    const usersArray = await User.find({});
    res.render("partials/users", { usersArray });
  } catch (err) {
    res.send(`<section> error ${err.errmsg} </section> `);
  }
};

export default {
  createUser,
  allUsers,
  defineRole,
  
};
