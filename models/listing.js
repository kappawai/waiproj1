const mongoose = require("mongoose");

const ListingSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  itemDesc: {
    type: String,
    required: true,
  },
  itemSoldQty: {
    type: Number,
    required: true,
  },
  itemPrice: {
    type: Number,
    required: true,
  },
  itemStock: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Listing", ListingSchema,'MarketIncListings');