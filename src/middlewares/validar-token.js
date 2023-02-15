const jwt = require("jsonwebtoken");
const { request, response } = require("express");

function requireAuth(req, resp = response) {
  return resp.json({ ok: true });
}

function validartoken(req = request, resp = response, next) {
  try {
    const token = req.header("x-token");

    // If is not a valod token throws an error, if it is , returns the undecode payload
    const { uid, username } = jwt.verify(token, process.env.TOKEN_SECRET);
    req.uid = uid;
    // req.username = username;

    return next();
  } catch (error) {
    console.log(error);
    return resp.status(401).json({
      ok: false,
      msg: "invalid token",
    });
  }
}

module.exports = { requireAuth, validartoken };
