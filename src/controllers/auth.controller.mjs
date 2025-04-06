import { User } from "../models/user.model.mjs";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username });

    if (!foundUser || foundUser.password !== password) {
      return res.render("partials/login-form", { isInvalid: true });
    }

    req.session.user = foundUser;

    res.set("Clear-Site-Data", "\"cache\""); // instead we can try adding the username to the ETag along with timestamps

    return res.render("home", { logedIn: req.session.user });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};

export const logout = async (req, res) => {
  try {
    if (req.session.user) {
      delete req.session;
      res.clearCookie("connect.sid");

      res.set("Clear-Site-Data", "\"cache\""); // instead we can try adding the username to the ETag along with timestamps

      return res.render("home");
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};
