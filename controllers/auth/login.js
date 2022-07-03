/* eslint-disable no-unused-vars */
const { User } = require("../../models");
const { Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  const passCompare = bcrypt.compareSync(password, user.password);
  if (!user || !user.verify || !passCompare) {
    throw new Unauthorized(
      "Email or password is wrong or email is not verified"
    );
  }
  //   if (!user) {
  //     throw new Unauthorized(`Email ${email} not found`);
  //   }
  //   const passCompare = bcrypt.compareSync(password, user.password);
  //   if (!passCompare) {
  //     throw new Unauthorized(`Wrong password`);
  //   }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
    },
  });
};

module.exports = login;
