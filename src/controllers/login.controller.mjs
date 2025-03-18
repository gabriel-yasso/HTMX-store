import { User } from "../models/user.model.mjs";

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username });

    if (!foundUser || foundUser.password !== password) {
      return res.render("partials/login-form", { isInvalid: true });
    }

    req.session.user = foundUser;
    return res.render("home", { logedIn: req.session.user });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Internal server error");
  }
};
