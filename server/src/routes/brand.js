"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/brand:

const permissions = require("../middlewares/permissions");
const brand = require("../controllers/brand");

// URL: /brands

router
  .route("/")
  .get(permissions.isLogin, brand.list)
  .post(permissions.isStaff, brand.create);

router
  .route("/:id")
  .get(permissions.isLogin, brand.read)
  .put(permissions.isStaff, brand.update)
  .patch(permissions.isStaff, brand.update)
  .delete(permissions.isAdmin, brand.delete);

/* ------------------------------------------------------- */
module.exports = router;
