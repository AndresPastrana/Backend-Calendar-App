const { response, request } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { generateAccesToken } = require("../helpers/jwt");

const login = async (req = request, resp = response) => {
  try {
    const body = req.body;

    const user = await User.findOne({ email: body.email });
    if (!user) {
      return resp.status(400).json({
        ok: false,
        msg: "Wrong email or password",
      });
    }

    const correctPassword = bcrypt.compareSync(body.password, user.password);

    // Check if the password es correct
    if (!correctPassword) {
      return resp
        .status(400)
        .json({ ok: false, msg: "Wrong email or password" });
    }

    // JWT
    const token = await generateAccesToken({
      uid: user._id,
      username: user.username,
    });

    return resp.json({
      ok: true,
      data: {
        uid: user._id,
        username: user.username,
        token,
      },
    });
  } catch (error) {
    console.log("Error :");
    console.error(error);
    return resp.status(500).json({
      ok: false,
      msg: "Contacte al admin",
    });
  }
};
const register = async (req = request, resp = response) => {
  try {
    const { email, username, password } = req.body;

    // Check if the user already exist
    let user = await User.findOne({ email });

    if (user) {
      return resp.status(400).json({
        ok: false,
        msg: "The user alredy exist,try with another email",
      });
    }

    // Creating encripted password
    const encryptPassword = await bcrypt.hash(password, 10);
    user = new User({
      username,
      email,
      password: encryptPassword,
    });

    // Saving the new user into the databse
    await user.save();

    //  Generating the JWT
    const token = await generateAccesToken({
      uid: user._id,
      username: user.username,
    });

    return resp.status(201).json({
      ok: true,
      data: {
        uid: user._id,
        username: user.username,
        token,
      },
    });
  } catch (error) {
    console.log("Error !");
    console.log(error);
    return resp.status(500).statusMessage("Internal server errror").json({
      ok: false,
      msg: "Contact the admin",
    });
  }
};

const refresh = async (req = request, resp = response) => {
  try {
    const { uid, username } = req;
    const token = await generateAccesToken({ uid, username });
    resp.status(200).json({
      ok: true,
      data: {
        uid,
        username,
        token,
      },
    });
    // const {} = req.body;
  } catch (error) {
    console.error(error);
  }
};

const getUsers = async (req = request, resp = response) => {
  try {
    const users = await User.find();
    return resp.json({
      ok: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    return resp.status(500).json({
      ok: false,
      data: null,
      error,
    });
  }
};

module.exports = {
  login,
  register,
  refresh,
  getUsers,
};
