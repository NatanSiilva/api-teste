const Boom = require("boom");
const validator = require("fastest-validator");
const jwt = require("jsonwebtoken");

const services = require("./services");
const v = new validator();

module.exports = {
  authUser: async (ctx) => {
    const {
      request: { body },
      response,
    } = ctx;

    const schema = {
      email: { max: 60, min: 6, type: "string" },
      password: { max: 20, min: 7, type: "string" },
    };

    const errors = v.validate(body, schema);

    if (Array.isArray(errors) && errors.length) {
      response.status = 400;
      response.body = Boom.badRequest({
        errors,
      });
    }
    const user = await services.authUser(body);

    if (user) {
      response.body = {
        id: user.id,
        typeUser: user.typeUser,
        name: user.name,
        email: user.email,
        avatar_url: user.avatar_url,
        result: jwt.sign(
          {
            email: user.email || user.name,
            password:user.password,
          },
          "Meu segredo"
        ),
      };
    } else {
      response.status = 401;
      response.body = {
        result: Boom.unauthorized(),
        message: "Usuário não encontrado",
      };
    }
  },

  
  
};