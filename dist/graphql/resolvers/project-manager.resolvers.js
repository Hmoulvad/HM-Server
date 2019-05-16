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
        projectManager: (parent, { _id }, { models }) => __awaiter(this, void 0, void 0, function* () {
            const { MongooseModels } = models;
            const ProjectManager = yield MongooseModels.ProjectManager.findOne({ _id });
            return ProjectManager;
        }),
    },
    Mutation: {
        createProjectManager: (parent, { name, unitId, referenceId }, { models }) => __awaiter(this, void 0, void 0, function* () {
            const { MongooseModels } = models;
            const ProjectManager = yield MongooseModels.ProjectManager.findOne({ name });
            if (ProjectManager) {
                throw new Error("Please provide a unique name.");
            }
            const Unit = yield MongooseModels.Unit.findOne({ _id: unitId });
            if (Unit) {
                if (yield database_1.doesReferenceExistsInDB(referenceId, models)) {
                    const newProjectManager = new MongooseModels.ProjectManager({
                        name,
                        role: "Project Manager",
                        unit: Unit,
                        referenceId: referenceId
                    });
                    yield database_1.saveObjectToDB(newProjectManager);
                    Unit.projectManagers.push(newProjectManager);
                    yield database_1.saveObjectToDB(Unit);
                    return true;
                }
            }
            else {
                throw new Error("Unit couldn't be found");
            }
        }),
    }
};
//# sourceMappingURL=project-manager.resolvers.js.map