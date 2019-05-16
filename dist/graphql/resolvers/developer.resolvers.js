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
        developer: (parent, { _id }, { models }) => __awaiter(this, void 0, void 0, function* () {
            const { MongooseModels } = models;
            const developer = yield MongooseModels.Developer.findOne({ _id });
            if (developer) {
                let projects = [];
                for (let i = 0; i < developer.projects.length; i++) {
                    const project = yield MongooseModels.Project.findById(developer.projects[i]);
                    const projectManager = yield MongooseModels.ProjectManager.findById(project.projectManager);
                    project.projectManager.name = projectManager.name;
                    projects.push(project);
                }
                developer.projects = projects;
                return developer;
            }
        }),
    },
    Mutation: {
        createDeveloper: (parent, { name, unitId, projectId }, { models }) => __awaiter(this, void 0, void 0, function* () {
            const { MongooseModels } = models;
            const findDeveloper = { name: name };
            const Developer = yield MongooseModels.Developer.findOne(findDeveloper);
            if (Developer) {
                throw new Error("Please provide a unique name.");
            }
            const Unit = yield MongooseModels.Unit.findOne({ _id: unitId });
            if (Unit) {
                const Project = yield MongooseModels.Project.findOne({ _id: projectId });
                if (Project) {
                    const newDeveloper = new MongooseModels.Developer({
                        name,
                        role: "Developer",
                        unit: Unit.id,
                        referenceId: Unit.unitManager,
                        projects: projectId,
                    });
                    yield database_1.saveObjectToDB(newDeveloper);
                    Project.developers.push(newDeveloper);
                    yield database_1.saveObjectToDB(Project);
                    Unit.developers.push(newDeveloper);
                    yield database_1.saveObjectToDB(Unit);
                    return true;
                }
            }
        })
    }
};
//# sourceMappingURL=developer.resolvers.js.map