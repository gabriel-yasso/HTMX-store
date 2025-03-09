const getForm = async (req, res) => {
  res.render("partials/product-form", { title: "Add Product" });
};

export default {
  getForm,
};
