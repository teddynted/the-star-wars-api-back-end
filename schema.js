const { gql } = require("apollo-server-lambda");

const { getPeople } = require("./resolvers/people");

const typeDefs = gql`
    type Person {
        page: Int!
        name: String
        height: String
        mass: String
        gender: String
        homeworld: String
    }
    type Query {
        person(page: Int!): [Person]
    }
`;

const resolvers = {
    Query: {
        person: async (obj, args, context, info) => {
            return await getPeople(args.page);
        }
    }
};

module.exports = {
    typeDefs,
    resolvers,
    context: ({ event, context }) => ({
        headers: event.headers,
        functionName: context.functionName,
        event,
        context
    })
};
