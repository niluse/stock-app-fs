"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Sale Controller:

const Sale = require("../models/sale");
const Product = require("../models/product");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Sale, {}, [
      "userId",
      "brandId",
      "productId",
    ]);
    res.status(200).send({
      error: false,
      details: await res.getModelListDetails(Sale),
      data,
    });
  },

  create: async (req, res) => {
    req.body.userId = req.user._id;
    // Calculate amount automatically
    req.body.amount = req.body.quantity * req.body.price;

    // Check product quantity
    const product = await Product.findOne({ _id: req.body.productId });
    if (product.quantity < req.body.quantity) {
      res.errorStatusCode = 400;
      throw new Error("Not enough product quantity in stock.");
    }

    const data = await Sale.create(req.body);

    // Update product quantity
    await Product.updateOne(
      { _id: data.productId },
      { $inc: { quantity: -data.quantity } }
    );

    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await Sale.findOne({ _id: req.params.id }).populate([
      "userId",
      "brandId",
      "productId",
    ]);
    res.status(200).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const currentSale = await Sale.findOne({ _id: req.params.id });

    // Calculate amount if quantity or price changed
    if (req.body.quantity || req.body.price) {
      const newQuantity = req.body.quantity || currentSale.quantity;
      const newPrice = req.body.price || currentSale.price;
      req.body.amount = newQuantity * newPrice;
    }

    const difference =
      currentSale.quantity - (req.body.quantity || currentSale.quantity);

    // Check product quantity
    const product = await Product.findOne({ _id: currentSale.productId });
    if (product.quantity < -difference) {
      res.errorStatusCode = 400;
      throw new Error("Not enough product quantity in stock.");
    }

    const data = await Sale.updateOne({ _id: req.params.id }, req.body, {
      runValidators: true,
    });

    // Update product quantity
    await Product.updateOne(
      { _id: currentSale.productId },
      { $inc: { quantity: difference } }
    );

    res.status(202).send({
      error: false,
      data,
      new: await Sale.findOne({ _id: req.params.id }).populate([
        "userId",
        "brandId",
        "productId",
      ]),
    });
  },

  delete: async (req, res) => {
    const currentSale = await Sale.findOne({ _id: req.params.id });

    const data = await Sale.deleteOne({ _id: req.params.id });

    // Update product quantity
    if (data.deletedCount) {
      await Product.updateOne(
        { _id: currentSale.productId },
        { $inc: { quantity: +currentSale.quantity } }
      );
    }

    res.status(data.deletedCount ? 204 : 404).send({
      error: !data.deletedCount,
      data,
    });
  },
};
