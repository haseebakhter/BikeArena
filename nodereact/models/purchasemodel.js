const mongoose = require("mongoose");

const PurchasesSchema = new mongoose.Schema(
  {
    PurchasedBy: {type: mongoose.Schema.Types.ObjectId,
        ref: 'details'},
    PurchasedFrom: {type: mongoose.Schema.Types.ObjectId,
        ref: 'details'},
    PurchasedAd: {type: mongoose.Schema.Types.ObjectId,
        ref: 'ads'},
  },
  { timestamps: true }
);

module.exports = mongoose.model("purchases", PurchasesSchema);