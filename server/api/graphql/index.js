const { ApolloServer, gql } = require('apollo-server-express');
const resolvers = require('./resolvers')

const typeDefs = gql`
  type User {
    id: String! @unique
    username: String!
    email: String! @unique
  }

  type AuthPayload {
    token: String
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    signup (username: String!, email: String!, password: String!): AuthPayload
    login (email: String!, password: String!): AuthPayload
  }
`

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    user: req.context.user,
  }),
});
