const { gql } = require("apollo-server-lambda");

const { getPeople, getPerson } = require("./resolvers/people");

const typeDefs = gql`
    type People {
        page: Int!
        name: String
        height: String
        mass: String
        gender: String
        homeworld: String
    }
    type Person {
        name: String!
        height: String
        mass: String
        gender: String
        homeworld: String
    }
    type Query {
        people(page: Int!): [People],
        person(name: String!): [Person]
    }
`;

const resolvers = {
    Query: {
        people: async (obj, args, context, info) => {
            return await getPeople(args.page);
        },
        person: async (obj, args, context, info) => {
            return await getPerson(args.name);
        }
    }
};

module.exports = {
    playground: true,
    introspection: true,
    typeDefs,
    resolvers,
    context: async ({ req, event, context }) => {
        if (event.source === 'serverless-plugin-warmup') {
            console.log('WarmUP - Lambda is warm!')
            return callback(null, 'Lambda is warm!')
        }
        return ({
            headers: event.headers,
            functionName: context.functionName,
            event,
            context
        })
    }
};
