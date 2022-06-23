/* eslint-disable no-unused-vars */
const express = require("express");

const { auth, validation, ctrlWrapper } = require("../../middlewares");
const { auth: ctrl } = require("../../controllers");
const {
  signUpJoiSchema,
  logInJoiSchema,
  subscriptionJoiSchema,
} = require("../../models/user");

const router = express.Router();

router.post("/signup", validation(signUpJoiSchema), ctrlWrapper(ctrl.signup));

router.post("/login", validation(logInJoiSchema), ctrlWrapper(ctrl.login));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.patch(
  "/:id/subscription",
  validation(subscriptionJoiSchema),
  ctrlWrapper(ctrl.updateSubscription)
);

module.exports = router;
