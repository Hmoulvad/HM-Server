import { GraphQLServer } from "graphql-yoga";
import { startDB, models } from "./database";
import { default as schema } from "./graphql/typeDefs";
import { default as resolversMap } from "./graphql/resolvers";
import { permissions } from "./graphql/helpers/authentication";
import { makeExecutableSchema } from 'graphql-tools';

const db = startDB({
  user: "hm",
  pwd: "1234"
});

// const db = startDB({
//   user: process.env.MONGO_ATLAS_USER,
//   pwd: process.env.MONGO_ATLAS_PW
// });

const context = (req : any) => ({
  models,
  db,
  req 
});

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers: resolversMap,
});

const server = new GraphQLServer({ 
  schema: executableSchema,
  context,
  resolverValidationOptions :{
    requireResolversForResolveType: false
  },
  middlewares: [permissions],
});

const options = {
  port: 4000,
  endpoint: "/graphql",
  playground: "/playground"
}

server.start(options, ({ port }) => console.log(`Server is running on localhost:${port}`));