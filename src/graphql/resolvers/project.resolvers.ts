import { IProjectModel } from "../../database/schemas/project.schema";
import { IDataModels } from "../../database/index";
import { IUnitModel } from "../../database/schemas/unit.schema";
import { doesReferenceExistsInDB, saveObjectToDB } from "../helpers/database";
import { IProjectManagerModel } from "../../database/schemas/project-manager.schema";

export default {
    Query: {
        project: async (parent, { _id }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const Project: IProjectModel = await MongooseModels.Project.findOne({ _id });
            if ( Project ) {
                return Project;
            }
            else throw new Error ("Couldn't find Project");
        },
    },
    Mutation: {
        createProject: async (parent, { name, unitId }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const Project: IProjectModel = await MongooseModels.Project.findOne({ name });
            if ( Project ) {
                throw new Error("Please provide a unique name.");
            }
            const Unit: IUnitModel = await MongooseModels.Unit.findOne({ _id: unitId });
            if ( Unit ) {
                const newProject: IProjectModel = new MongooseModels.Project({
                    name,
                    unit: Unit.id,
                })
                await saveObjectToDB(newProject);
                Unit.projects.push(newProject);
                await saveObjectToDB(Unit);
                return true;
            } else  {
                return false;
            }
        },
        setProjectManager: async (parent, { name, projectManagerId }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const Project: IProjectModel = await MongooseModels.Project.findOne({ name });
            if ( Project ) {
                if ( await doesReferenceExistsInDB( projectManagerId, models)) {
                    Project.projectManager = projectManagerId;
                    await saveObjectToDB(Project);
                    const findProjectManager = { _id: projectManagerId }
                    const ProjectManager: IProjectManagerModel = await MongooseModels.ProjectManager.findOne(findProjectManager);
                    if ( ProjectManager ) {
                        ProjectManager.projects.push(Project)
                        await saveObjectToDB(ProjectManager);
                        return true;
                    } else {
                        throw new Error("Couldn't find ProjectManager");
                    }
                }
            }
        }
    }
};