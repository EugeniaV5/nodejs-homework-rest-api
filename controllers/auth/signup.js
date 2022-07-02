/* eslint-disable no-unused-vars */
const { User } = require("../../models");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exists`);
  }
  const avatarURL = gravatar.url(email);
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        name,
        avatarURL,
      },
    },
  });
};

module.exports = signup;
