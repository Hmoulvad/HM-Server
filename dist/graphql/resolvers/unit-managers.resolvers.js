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
        unitManager: (parent, { _id }, { models }) => __awaiter(this, void 0, void 0, function* () {
            const { MongooseModels } = models;
            const UnitManager = yield MongooseModels.UnitManager.findOne({ _id });
            if (UnitManager) {
                return UnitManager;
            }
            else
                throw new Error("Couldn't find Unit manager");
        }),
    },
    Mutation: {
        createUnitManager: (parent, { name, unitId, referenceId }, { models }) => __awaiter(this, void 0, void 0, function* () {
            const { MongooseModels } = models;
            const UnitManager = yield MongooseModels.UnitManager.findOne({ name });
            // Checks if the UnitManager names exists.
            if (UnitManager) {
                throw new Error("Please provide a unique name.");
            }
            const Unit = yield MongooseModels.Unit.findOne({ _id: unitId });
            // Checks if the Unit exists.
            if (Unit) {
                const newUnitManager = new MongooseModels.UnitManager({
                    name,
                    unit: Unit.id,
                    role: "Unit Manager",
                    referenceId
                });
                yield database_1.saveObjectToDB(newUnitManager);
                //Gets the newly added UnitManager and it's ID and maps it to the Units UnitManager and saves it.
                Unit.unitManager = newUnitManager.id;
                yield database_1.saveObjectToDB(Unit);
                return true;
            }
            else {
                throw new Error("Unit doesn't exist");
            }
        })
    }
};
//# sourceMappingURL=unit-managers.resolvers.js.map