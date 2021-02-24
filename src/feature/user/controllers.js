const Boom = require('boom');
const validator = require('fastest-validator')

const services = require("./services");

const v = new validator()

module.exports = {
  create: async (ctx) => {
    const { request: { body }, response } = ctx;
    const schema = {
      typeUser: {max: 60, min: 4, type: 'string'},
      name: {max: 60, min: 4, type: 'string'},
      email: {max: 200, min: 6, type: 'string'},
      password: {max: 20, min: 7, type: 'string'},
      avatar_url: { max:500, min: 100, type: 'string'}
    }
    
    const errors = v.validate(body, schema)

    if (Array.isArray(errors) && errors.length) {
      response.status = 400
      return response.body = Boom.badRequest({
        message: 'Algo deu errado!',
        errors
      })
    }

    const user = await services.create(body);
    
    if(user) {
   
      response.body = {
        user,
        status: 200,
        message: `Seja muito bem vindo ${user.name}`
      }
    }
  }
};
