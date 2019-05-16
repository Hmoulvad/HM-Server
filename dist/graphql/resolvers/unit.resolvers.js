"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../helpers/database");
exports.default = {
    Query: {
        unit: (parent, { _id }, { models }) => __awaiter(this, void 0, void 0, function* () {
            const { MongooseModels } = models;
            const Unit = yield MongooseModels.Unit.findOne({ _id });
            if (Unit) {
                return Unit;
            }
            else
                throw new Error("Unit doesn't exist");
        }),
        units: (parent, {}, { models }) => __awaiter(this, void 0, void 0, function* () {
            const { MongooseModels } = models;
            const Units = yield MongooseModels.Unit.find({});
            return Units;
        }),
    },
    Mutation: {
        createUnit: (parent, { name }, { models }) => __awaiter(this, void 0, void 0, function* () {
            const { MongooseModels } = models;
            const Unit = yield MongooseModels.Unit.findOne({ name });
            if (Unit) {
                throw new Error("Please provide a unique name.");
            }
            const newUnit = new MongooseModels.Unit({
                name,
            });
            yield database_1.saveObjectToDB(newUnit);
            return true;
        })
    }
};
//# sourceMappingURL=unit.resolvers.js.map