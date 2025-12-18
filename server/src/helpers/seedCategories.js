"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// Seed Categories:

const Category = require("../models/category");

const defaultCategories = [
  { name: "Electronics" },
  { name: "Clothing" },
  { name: "Food & Beverages" },
  { name: "Home & Garden" },
  { name: "Sports & Outdoors" },
  { name: "Books & Media" },
  { name: "Toys & Games" },
  { name: "Health & Beauty" },
  { name: "Automotive" },
  { name: "Office Supplies" },
];

const seedCategories = async () => {
  try {
    const existingCategories = await Category.countDocuments();

    if (existingCategories === 0) {
      await Category.insertMany(defaultCategories);
      console.log("✓ Default categories seeded successfully");
    } else {
      console.log("✓ Categories already exist, skipping seed");
    }
  } catch (error) {
    console.log("✗ Error seeding categories:", error.message);
  }
};

module.exports = seedCategories;
