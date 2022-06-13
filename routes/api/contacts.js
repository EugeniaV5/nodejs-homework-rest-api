/* eslint-disable no-unused-vars */
const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const { contactJoiSchema, favoriteJoiSchema } = require("../../models/contact");
const { contacts: ctrl } = require("../../controllers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:id", ctrlWrapper(ctrl.getContactById));

router.post("/", validation(contactJoiSchema), ctrlWrapper(ctrl.addContact));

router.put(
  "/:id",
  validation(contactJoiSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  "/:id/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

router.delete("/:id", ctrlWrapper(ctrl.removeContact));

module.exports = router;
