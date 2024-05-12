const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ApiFeatures = require("../utils/apiFeatures");

//Create a new product - Admin
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, product });
  });

// Get all Products
exports.getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;
  const apiFeatures =  new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
  const products = await apiFeatures.query;
  res.status(200).json({ success: true, products });
});

//get Product details

exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    next(new ErrorHandler(404, "Product not found"));
  }
  return res.status(200).json({ success: true, product });
});

//Update a Product - Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    next(new ErrorHandler(404, "Product not found"));
  }
  product = new Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete a product --admin

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    next(new ErrorHandler(404, "Product not found"));
  }
  
  await product.remove();
  res
    .status(200)
    .json({ success: true, message: "Product deleted successfully" });
});