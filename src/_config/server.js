const koa = require("koa");
const Router = require("koa-router");
const applyRoutes = require("./routes");
const bodyParse = require("koa-bodyparser");
const cors = require('@koa/cors')

const app = new koa();
const router = new Router();

module.exports = () => {
  console.log("[koa] Served in use");

  applyRoutes(router);
  app.use(cors()).use(bodyParse()).use(router.routes()).use(router.allowedMethods());

  app.listen(8080);
};
