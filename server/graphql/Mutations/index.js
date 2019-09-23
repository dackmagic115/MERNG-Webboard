const objuser = require('./user')
const objpost = require('./posts')

const mutation = Object.assign({} , objuser , objpost)

module.exports = mutation