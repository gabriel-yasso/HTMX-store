import { User } from "../models/user.model.mjs";
import bcrypt from "bcrypt"

const createUser = async (req, res) => {
  try {
    const saltRounds = 8;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    const newUser = new User({
      username: req.body.username,
      password: hashedPassword,
    });
    await newUser.save();
    res.render("partials/login-form");
  } catch (err) {
    if (err.code == 11000) {
      return res.render("partials/register-form", { usernameTaken: true });
    }
    res.send(`<section> error ${err.errmsg} </section> `);
  }
};

const allUsers = async (req, res) => {
  try {
    if (!req.session.user || !req.session.user.isAdmin || req.session.user.username != "gabriel") {
      return res.render("partials/login-form",{contextMsg: "You have to login with a manager account"});
    }
    const usersArray = await User.find({});
    res.render("partials/users", { usersArray });
  } catch (err) {
    res.send(`<section> error ${err.errmsg} </section> `);
  }
};

const defineRole = async (req, res) => {
  try {
    if (!req.session.user || !req.session.user.isAdmin || req.session.user.username != "gabriel") {
      return res.render("partials/login-form",{contextMsg: "You have to login with a manager account"});
    }

    await User.findByIdAndUpdate(req.params.id,{$set: {isAdmin: !! +req.body.admin}})
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
