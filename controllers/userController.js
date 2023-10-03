const APIError = require('@utils/APIError');
const User = require('@models/userModel');
const tryCatch = require('@utils/tryCatch');
const APIFeatures = require('@utils/APIFeatures');

exports.getAllUsers = tryCatch(async (req, res, next) => {
  const query = APIFeatures(req, User);
  const users = await query;

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

exports.getUser = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id).select('+password');

  if (!user) {
    return next(new APIError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: "This route doesn't exist. please use /signup instead!"
  });
};

exports.updateUser = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });

  if (!user) {
    return next(new APIError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user
    }
  });
});

exports.deleteUser = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return next(new APIError('No user found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: {
      user
    }
  });
});
