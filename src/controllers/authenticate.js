const User = require("../models/health expert");
const bcrypt = require("bcrypt");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (user)
      return res.status(400).json({
        message: "User already exist",
      });

    const { firstName, lastName, email, title, hospital, pword } = req.body;
    const password = await bcrypt.hash(pword, 10);
    const _user = new User({
      firstName,
      lastName,
      email,
      title,
      hospital,
      password
    });

    _user.save((error, data) => {
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
      if (data) {
        const { _id, firstName, lastName, email, title, hospital } = _user;
        return res.status(201).json({
          user: { _id, firstName, lastName, email, title, hospital },
        });
      }
    });
  });
};

exports.login = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (isPassword) {
        const { _id, firstName, lastName, email, title } = user;
        res.status(200).json({
          user: { _id, firstName, lastName, email, title },
        });
      } else {
        return res.status(400).json({
          message: "something went wrong",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};
