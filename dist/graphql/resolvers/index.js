"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const merge_graphql_schemas_1 = require("merge-graphql-schemas");
const resolvers = merge_graphql_schemas_1.fileLoader(path.join(__dirname, './**/*.resolvers.*'));
exports.default = resolvers;
//# sourceMappingURL=index.js.map