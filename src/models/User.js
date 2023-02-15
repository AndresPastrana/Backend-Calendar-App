const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.method("toJSON", function () {
  const { __v, _id, ...user } = this.toObject();
  user.id = _id;
  return user;
});

const User = model("user", userSchema);

module.exports = User;
