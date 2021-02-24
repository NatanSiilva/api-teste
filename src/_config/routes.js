const authRoutes = require("../feature/auth/routes");
const userRoutes = require("../feature/user/routes");

module.exports = (router) => {
  authRoutes(router);
  userRoutes(router);
  
};
