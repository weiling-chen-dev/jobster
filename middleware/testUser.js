const { BadRequestError } = require("../errors");

const testUser = async (req, res, next) => {
  if (req.user.testUser) {
    throw new BadRequestError("Demo User, read only!");
  }

  next();
};

module.exports = testUser;
