/* eslint-disable no-unused-vars */
const { User } = require("../../models");

const getCurrent = async (req, res) => {
  const { name, email } = req.user;
  res.json({
    status: "success",
    code: 200,
    data: {
      name,
      email,
    },
  });
};

module.exports = getCurrent;
