import Product from "../Model/productModel.js";

//Add Products
export const addProduct = async (req, res) => {
  try {
    const { title, desc, image, category, price, user } = req.body;

    if (!(user.role != "admin" || user.role != "salesman")) {
      return res
        .status(403)
        .json({ message: "You do not have permission to access this page." });
    }

    //Provide all fields
    if (!title || !desc || !image || !price) {
      return res.status(400).json({ message: "Please provide all fields!" });
    }

    //price value is valid means it is positive
    if (price < 0) {
      return res.status(400).json({ message: "Please Enter valid Price!" });
    }
    const newProduct = new Product({
      title: title,
      desc: desc,
      image: image,
      category: category,
      price: price,
    });

    //save new product to database
    await newProduct.save();
    return res
      .status(200)
      .json({ message: "New Product is created successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Get All Products
export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    if (!products) {
      return res.status(404).json({ message: "Product not found!" });
    }

    return res
      .status(200)
      .json({ message: "All Products get successfully!", products });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Get Perticular Product
export const getProduct = async (req, res) => {
  try {
    const { id } = req.headers;
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product is not found!" });
    }

    return res
      .status(200)
      .json({ message: "Product get successfully!", product });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Getting Product By Category
export const getProductByCategory = async (req, res) => {
  try {
    const { category } = req.headers;
    if (!category) {
      return res
        .status(400)
        .json({ message: "Please provide category field!" });
    }

    const product = await Product.find({ category: category }).sort({
      createdAt: -1,
    });
    return res
      .status(200)
      .json({ message: `Getting ${category} category product`, product });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Update Perticular Product
export const updateProduct = async (req, res) => {
  try {
    const { title, desc, image, category, price, user } = req.body;
    const { id } = req.headers;

    if (!(user.role != "admin" || user.role != "salesman")) {
      return res
        .status(403)
        .json({ message: "You do not have permission to access this page." });
    }

    const product = await Product.findByIdAndUpdate(id, {
      title: title,
      desc: desc,
      image: image,
      category: category,
      price: price,
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found!" });
    }

    return res
      .status(200)
      .json({ message: "Product is Updated successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};

//Delete Perticular Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.headers;
    const { user } = req.body;

    if (!(user.role != "admin" || user.role != "salesman")) {
      return res
        .status(403)
        .json({ message: "You do not have permission to access this page." });
    }

    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.status(400).json({ message: "Error while Deleting Product!" });
    }
    return res
      .status(200)
      .json({ message: "Product is deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error!" });
  }
};
