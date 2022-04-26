const userExists = (req, res, next) => {
  console.log('Middleware executing...');
  next();
};

module.exports = { userExists };