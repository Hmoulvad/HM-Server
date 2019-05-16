import { IDataModels } from "../../database/index";
import { IUnitModel } from "../../database/schemas/unit.schema";
import { saveObjectToDB } from "../helpers/database";
import { IProjectModel } from "../../database/schemas/project.schema";

export default {
    Query: {
        developer: async (parent, { _id }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const developer = await MongooseModels.Developer.findOne({ _id });
            if ( developer ) {
                let projects = []
                for (let i = 0; i < developer.projects.length; i++) {
                    const project = await MongooseModels.Project.findById(developer.projects[i]);
                    const projectManager = await MongooseModels.ProjectManager.findById(project.projectManager);
                    project.projectManager.name = projectManager.name;
                    projects.push(project);
                }
                developer.projects = projects;
                return developer;
            }
        },
    },
    Mutation: {
        createDeveloper: async (parent, { name, unitId, projectId }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const findDeveloper = { name: name }
            const Developer = await MongooseModels.Developer.findOne( findDeveloper );
            if ( Developer ) {
                throw new Error("Please provide a unique name.");
            }
            const Unit: IUnitModel = await MongooseModels.Unit.findOne({ _id: unitId })
            if ( Unit ) {
                    const Project: IProjectModel = await MongooseModels.Project.findOne({ _id: projectId })
                    if ( Project ) {
                        const newDeveloper = new MongooseModels.Developer({
                            name,
                            role: "Developer",
                            unit: Unit.id,
                            referenceId: Unit.unitManager,
                            projects: projectId,   
                        });
                        await saveObjectToDB(newDeveloper);
                        Project.developers.push(newDeveloper);
                        await saveObjectToDB(Project);
                        Unit.developers.push(newDeveloper);
                        await saveObjectToDB(Unit);
                        return true;
                    }
            }
        }
    }
};