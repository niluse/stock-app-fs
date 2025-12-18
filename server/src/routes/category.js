"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | CLARUSWAY FullStack Team
------------------------------------------------------- */
const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/category:

const permissions = require("../middlewares/permissions");
const category = require("../controllers/category");

// URL: /categories

router
  .route("/")
  .get(permissions.isLogin, category.list)
  .post(permissions.isStaff, category.create);

router
  .route("/:id")
  .get(permissions.isLogin, category.read)
  .put(permissions.isStaff, category.update)
  .patch(permissions.isStaff, category.update)
  .delete(permissions.isAdmin, category.delete);

/* ------------------------------------------------------- */
module.exports = router;
