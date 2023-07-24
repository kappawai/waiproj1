const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Listing",
  },
  purchaseQuantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Purchase", PurchaseSchema,'MarketIncPurchases');