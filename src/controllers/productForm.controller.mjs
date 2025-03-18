const getForm = async (req, res) => {
  if (!req.session.user) {
    return res.render("partials/login-form", { contextMsg: "To add a product login first" });
  }
  res.render("partials/product-form", { title: "Add Product" });
};

export default {
  getForm,
};
