"use strict";
/* -------------------------------------------------------
    Migration Script: Rename priceTotal to amount
------------------------------------------------------- */

const { mongoose } = require("../configs/dbConnection");
const Purchase = require("../models/purchase");
const Sale = require("../models/sale");

const migrateToAmount = async () => {
  try {
    // Update all purchases: rename priceTotal to amount
    const purchaseResult = await mongoose.connection.db
      .collection("purchases")
      .updateMany(
        { priceTotal: { $exists: true } },
        { $rename: { priceTotal: "amount" } }
      );

    // Update all sales: rename priceTotal to amount
    const saleResult = await mongoose.connection.db
      .collection("sales")
      .updateMany(
        { priceTotal: { $exists: true } },
        { $rename: { priceTotal: "amount" } }
      );

    console.log(`✓ Migration complete:`);
    console.log(`  - Purchases updated: ${purchaseResult.modifiedCount}`);
    console.log(`  - Sales updated: ${saleResult.modifiedCount}`);

    // Also calculate amount for any records that don't have it
    const purchasesWithoutAmount = await Purchase.find({
      amount: { $exists: false },
    });
    for (const purchase of purchasesWithoutAmount) {
      purchase.amount = purchase.quantity * purchase.price;
      await purchase.save();
    }

    const salesWithoutAmount = await Sale.find({ amount: { $exists: false } });
    for (const sale of salesWithoutAmount) {
      sale.amount = sale.quantity * sale.price;
      await sale.save();
    }

    if (purchasesWithoutAmount.length > 0 || salesWithoutAmount.length > 0) {
      console.log(`✓ Calculated amount for:`);
      console.log(`  - Purchases: ${purchasesWithoutAmount.length}`);
      console.log(`  - Sales: ${salesWithoutAmount.length}`);
    }
  } catch (error) {
    console.log("✗ Migration error:", error.message);
  }
};

module.exports = migrateToAmount;
