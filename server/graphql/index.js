import { schemaComposer } from 'graphql-compose'

const queries = require('./Queries')
const mutation = require('./Mutations')
schemaComposer.Query.addFields(queries)
schemaComposer.Mutation.addFields(mutation)

const graphqlSchema = schemaComposer.buildSchema()
module.exports = graphqlSchema