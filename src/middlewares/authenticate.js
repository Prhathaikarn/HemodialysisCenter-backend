const createError = require('../utils/create-error');
const tokenService = require('../services/token-service');
const userService = require('../services/user-service');

module.exports = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      createError('Unauthorized', 401);
    }

    const token = authorization.split(' ')[1];
    if (!token) {
      createError('Unauthorized', 401);
    }
    const payload = tokenService.verify(token);
    // console.log(payload);

    const user = await userService.getUserbyId(payload.id);
    // console.log(user);
    if (!user) {
      createError('Unauthorized', 401);
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};
