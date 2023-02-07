const jwt = require("jsonwebtoken");

function generateAccesToken(userData) {
  return new Promise((resolve, reject) => {
    // const header =...

    const payload = { ...userData };
    const secret = process.env.TOKEN_SECRET;
    jwt.sign(payload, secret, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        console.log(err);
        reject("We couldn't generate the token");
      }

      resolve(token);
    });
  });
}
module.exports = {
  generateAccesToken,
};
