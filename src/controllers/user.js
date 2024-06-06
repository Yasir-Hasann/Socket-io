// module imports
const asyncHandler = require('express-async-handler');

// file imports
const UserModel = require('../models/user');
const SocketManager = require('../utils/socket-manager');
const ErrorResponse = require('../utils/error-response');

// @desc   Add User
// @route  POST /api/v1/user
// @access Public
exports.addUser = asyncHandler(async (req, res, next) => {
  const user = await UserModel.create(req.body);
  if (!user) return next(new ErrorResponse('Something went wrong', 500));

  res.status(200).json(user);
});

// @desc   Update User
// @route  PUT /api/v1/user/:id
// @access Public
exports.updateUser = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
  if (!user) return next(new ErrorResponse('Something went wrong', 500));

  new SocketManager().emitEvent(user._id.toString(), 'update-user-data', { type: 'update', user });

  res.status(200).json(user);
});
