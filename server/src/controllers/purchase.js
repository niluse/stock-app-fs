"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Purchase Controller:

const Purchase = require("../models/purchase");
const Product = require("../models/product");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Purchase, {}, [
      "userId",
      "firmId",
      "brandId",
      "productId",
    ]);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Purchase),
      data,
    });
  },

  create: async (req, res) => {
    req.body.userId = req.user._id;
    // Calculate amount automatically
    req.body.amount = req.body.quantity * req.body.price;

    const data = await Purchase.create(req.body);

    // Update product quantity
    await Product.updateOne(
      { _id: data.productId },
      { $inc: { quantity: +data.quantity } }
    );

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await Purchase.findOne({ _id: req.params.id }).populate([
      "userId",
      "firmId",
      "brandId",
      "productId",
    ]);
    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const currentPurchase = await Purchase.findOne({ _id: req.params.id });

    // Calculate amount if quantity or price changed
    if (req.body.quantity || req.body.price) {
      const newQuantity = req.body.quantity || currentPurchase.quantity;
      const newPrice = req.body.price || currentPurchase.price;
      req.body.amount = newQuantity * newPrice;
    }

    const data = await Purchase.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    // Update product quantity
    const difference =
      (req.body.quantity || currentPurchase.quantity) -
      currentPurchase.quantity;
    await Product.updateOne(
      { _id: currentPurchase.productId },
      { $inc: { quantity: difference } }
    );

    res.status(202).send({
      error: false,
      data,
      new: await Purchase.findOne({ _id: req.params.id }).populate([
        "userId",
        "firmId",
        "brandId",
        "productId",
      ]),
    });
  },

  delete: async (req, res) => {
    const currentPurchase = await Purchase.findOne({ _id: req.params.id });

    const data = await Purchase.deleteOne({ _id: req.params.id });

    // Update product quantity
    if (data.deletedCount) {
      await Product.updateOne(
        { _id: currentPurchase.productId },
        { $inc: { quantity: -currentPurchase.quantity } }
      );
    }

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
