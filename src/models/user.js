// module imports
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('user', UserSchema);
