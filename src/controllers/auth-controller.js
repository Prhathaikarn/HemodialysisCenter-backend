const Joi = require('joi');

const loginSchema = Joi.object({
  nurseId: Joi.string().required(),
  password: Joi.string().required(),
});

const userService = require('../services/user-service');
const createError = require('../utils/create-error');
const bcryptService = require('../services/bcrypt-service');
const tokenService = require('../services/token-service');
const validate = require('../validators/validate');

exports.register = async (req, res, next) => {
  try {
    const value = req.body;
    console.log(value);
    const isUserExist = await userService.checkUserExist(value.nurseId);
    if (isUserExist) {
      createError('Nurse ID already have', 400);
    }

    value.password = await bcryptService.hash(value.password);

    const user = await userService.createUser(value);

    const accessToken = tokenService.sign({ id: user.id });
    res.status(200).json(accessToken);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const loginValidate = validate(loginSchema);
    const value = loginValidate(req.body);
    console.log('value--------', value);

    const user = await userService.getUserbyNurseId(value.nurseId);
    console.log('user---------', user);

    if (!user) {
      createError('invalid credential', 400);
    }
    const isCorrect = await bcryptService.compare(
      value.password,
      user.password
    );
    if (!isCorrect) {
      createError('invalid credential', 400);
    }
    const accessToken = tokenService.sign({ id: user.id });
    res.status(200).json({ message: 'success', accessToken });
  } catch (err) {
    next(err);
  }
};
