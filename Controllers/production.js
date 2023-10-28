const Producted = require("../models/products_models");
const user = require("../Controllers/users");

const apifeature = require("../utils/apifeature");

const Errorhandler = require("../utils/errorhander");

//  Create product only admin POST

exports.createProducts = async (req, res, next) => {
  try {
    const { NameProducts, description, PriceProduct, category, stock, image } =
      req.body;

    const product = await Producted.create({
      NameProducts,
      description,
      PriceProduct,
      category,
      stock,
      image: [{ url_id: image }],
    });
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the product",
    });
  }
};

// get product
exports.getAllproduction = async (req, res, next) => {
  try {
    const apifeatures = new apifeature(Producted.find(), req.query)
      .search()
      .filter();
    const products = await apifeatures.query;
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Products not found",
    });
  }
};
// get product
exports.getAdminproduction = async (req, res, next) => {
  try {
    const products = await Producted.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Products not found",
    });
  }
};

// update by is product admin
exports.updateproduction = async (req, res, next) => {
  try {
    const { NameProducts, description, PriceProduct, category, stock, image } =
      req.body;
    let products = await Producted.findById(req.params.id);

    if (!products) {
      return next(new Errorhandler(" producted not found ", 400));
    }
    let product = await Producted.findByIdAndUpdate(
      req.params.id,
      {
        NameProducts,
        description,
        PriceProduct,
        category,
        stock,
        image: [{ url_id: image }],
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      message: "produced is update",
      product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "pleaser correct ",
    });
  }
};

exports.deleteProducts = async (req, res, next) => {
  try {
    let product = await Producted.findById(req.params.id);

    if (!product) {
      return next(new Errorhandler(" producted not found ", 500));
    }

    await Producted.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Please correct",
    });
  }
};
// await Producted.deleteOne({ _id: req.params.id });

exports.getProducts = async (req, res, next) => {
  try {
    const product = await Producted.findById(req.params.id);
    if (!product) {
      return next(new Errorhandler(" producted not found ", 404));
    }

    res.status(200).json({
      succss: true,
      message: " products about ",
      product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "products not about",
      Producted,
    });
  }
};

exports.createProductionReview = async (req, res, next) => {
  try {
    const { Rating, Comment, ProductId } = req.body;

    const reviews = {
      user: req.user._id,
      name: req.user.Name,
      rating: Number(Rating),
      Comment,
    };
    const product = await Producted.findById(ProductId);
    const isReviewed = product.review.find(
      (rev) => rev._id.toString() === req.user._id.toString()
    );
    if (isReviewed) {
      product.review.forEach((rev) => {
        if (rev._id.toString() === req.user._id.toString()) {
          (rev.rating = Rating), (rev.Comment = Comment);
        }
      });
    } else {
      product.review.push(reviews);
      product.numofReview = product.review.length;
    }
    let avg = 0;
    product.review.forEach((rev) => {
      avg += rev.rating;
    });
    product.ratings = avg / product.review.length;

    await product.save({ validateBeforeSave: false });

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
};

exports.getProductsReview = async (req, res, next) => {

  const product = await Producted.findById(req.query.id);

  if (!product) {
    return next(new Errorhandler(" producted not found ", 404));
  }

  res.status(201).json({
    success: true,
    reviews: product.review,
  });
};

exports.deleteProductsReview = async (req, res, next) => {
  try {
    console.log(req.query);
    const product = await Producted.findById(req.query.id);

    if (!product) {
      return next(new Errorhandler(" producted not found ", 404));
    }

    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.productsId
    );

    let avg = 0;
    reviews.forEach((rev) => {
      avg += rev.rating;
    });

    const rating = avg / reviews.length;

    const numOfReviews = reviews.length;

    await product.findByIdAndUpdate(
      rew.query.ProductId,
      {
        reviews,
        rating,
        numOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }
};
