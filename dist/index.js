"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_yoga_1 = require("graphql-yoga");
const database_1 = require("./database");
const typeDefs_1 = require("./graphql/typeDefs");
const resolvers_1 = require("./graphql/resolvers");
const authentication_1 = require("./graphql/helpers/authentication");
const graphql_tools_1 = require("graphql-tools");
const db = database_1.startDB({
    user: "hm",
    pwd: "1234"
});
// const db = startDB({
//   user: process.env.MONGO_ATLAS_USER,
//   pwd: process.env.MONGO_ATLAS_PW
// });
const context = (req) => ({
    models: database_1.models,
    db,
    req
});
const executableSchema = graphql_tools_1.makeExecutableSchema({
    typeDefs: typeDefs_1.default,
    resolvers: resolvers_1.default,
});
const server = new graphql_yoga_1.GraphQLServer({
    schema: executableSchema,
    context,
    resolverValidationOptions: {
        requireResolversForResolveType: false
    },
    middlewares: [authentication_1.permissions],
});
const options = {
    port: 4000,
    endpoint: "/graphql",
    playground: "/playground"
};
server.start(options, ({ port }) => console.log(`Server is running on localhost:${port}`));
//# sourceMappingURL=index.js.map