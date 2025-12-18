"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
// MongoDB Connection:

const mongoose = require("mongoose");

const dbConnection = async function () {
  // Connect:
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("* DB Connected * ");

    // Run migrations and seeds after connection
    const seedCategories = require("../helpers/seedCategories");
    const migrateToAmount = require("../helpers/migrateToAmount");

    await seedCategories();
    await migrateToAmount();
  } catch (err) {
    console.log("* DB Not Connected * ", err);
  }
};

/* ------------------------------------------------------- */
module.exports = {
  mongoose,
  dbConnection,
};
