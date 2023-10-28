const db = require("../db");

const producder_models = new db.Schema({
  NameProducts: {
    type: String,
    required: [true, "Please enter product name"],
    trim: true,
  },

  description: {
    type: String,
    required: [true, "Please enter product name"],
  },
  PriceProduct: {
    type: Number,
    required: [true, "Please enter product price"],
    minLength: [8, "Price cannot exceed * around "],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  image: [
    {
      url_id: {
        type: String,
        required: true,
      },
    },
  ],

  category: {
    type: String,
    required: [true, "Please enter category"],
  },

  stock: {
    type: Number,
    required: [true, "Please enter  category"],
    maxLength: [4, "Price cannot exceed * around"],
    default: 1,
  },

  numofReview: {
    type: Number,
    default: 0,
  },

  review: [
    {
      user: {
        type: db.Schema.ObjectId,
        ref: "user",
      },
      name: {
        type: String,
        trim: true,
        default: " ",
      },
      rating: {
        type: Number,
        // default: 1,
        
      },
      Comment: {
        type: String,
        default : " "
        // default: " Your recently viewed items and featured recommendations.",
      },
    },
  ],

  user: {
    type: db.Schema.ObjectId,
    ref: "user",
    // required : true
  },
  createdtime: {
    type: Date,
    default: Date.now,
  },
});

module.exports = db.model("Producted", producder_models);
