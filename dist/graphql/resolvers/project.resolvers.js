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
        project: (parent, { _id }, { models }) => __awaiter(this, void 0, void 0, function* () {
            const { MongooseModels } = models;
            const Project = yield MongooseModels.Project.findOne({ _id });
            if (Project) {
                return Project;
            }
            else
                throw new Error("Couldn't find Project");
        }),
    },
    Mutation: {
        createProject: (parent, { name, unitId }, { models }) => __awaiter(this, void 0, void 0, function* () {
            const { MongooseModels } = models;
            const Project = yield MongooseModels.Project.findOne({ name });
            if (Project) {
                throw new Error("Please provide a unique name.");
            }
            const Unit = yield MongooseModels.Unit.findOne({ _id: unitId });
            if (Unit) {
                const newProject = new MongooseModels.Project({
                    name,
                    unit: Unit.id,
                });
                yield database_1.saveObjectToDB(newProject);
                Unit.projects.push(newProject);
                yield database_1.saveObjectToDB(Unit);
                return true;
            }
            else {
                return false;
            }
        }),
        setProjectManager: (parent, { name, projectManagerId }, { models }) => __awaiter(this, void 0, void 0, function* () {
            const { MongooseModels } = models;
            const Project = yield MongooseModels.Project.findOne({ name });
            if (Project) {
                if (yield database_1.doesReferenceExistsInDB(projectManagerId, models)) {
                    Project.projectManager = projectManagerId;
                    yield database_1.saveObjectToDB(Project);
                    const findProjectManager = { _id: projectManagerId };
                    const ProjectManager = yield MongooseModels.ProjectManager.findOne(findProjectManager);
                    if (ProjectManager) {
                        ProjectManager.projects.push(Project);
                        yield database_1.saveObjectToDB(ProjectManager);
                        return true;
                    }
                    else {
                        throw new Error("Couldn't find ProjectManager");
                    }
                }
            }
        })
    }
};
//# sourceMappingURL=project.resolvers.js.map