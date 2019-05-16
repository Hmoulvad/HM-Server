"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const merge_graphql_schemas_1 = require("merge-graphql-schemas");
const typesArray = merge_graphql_schemas_1.fileLoader(path.join(__dirname, "./"));
const typesMerged = merge_graphql_schemas_1.mergeTypes(typesArray);
exports.default = typesMerged;
//# sourceMappingURL=index.js.map