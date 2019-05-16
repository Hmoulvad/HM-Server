import holidayRequestSchema, { IHolidayRequestModel } from "../../database/schemas/holiday-request.schema";
import { IDataModels } from "../../database/index";
import { Role, IHolidayRequest } from "../../models/models";
import { saveObjectToDB, findReferenceInDB } from "../helpers/database";

export default {
    Query: {
        getUserHolidayRequests: async (parent, { _id }, { models }): Promise<IHolidayRequestModel[]> => {
            const { MongooseModels }: IDataModels = models;
            const holidayRequests = await MongooseModels.HolidayRequest.find({creatorRef: _id})
            if ( holidayRequests ) {
                for (let request of holidayRequests) {
                    if (!!request.unitManagerRef) {
                        const unitManager = await findReferenceInDB(request.unitManagerRef, models)
                        request.unitManagerName = unitManager.name;
                    }
                    if (!!request.ref) {
                        const ref = await findReferenceInDB(request.ref, models)
                        request.refName = ref.name;
                    }
                    saveObjectToDB(request)
                }
                return holidayRequests;
            } else {
                new Error("No such user exists")
            }
        },
        getPendingHolidayRequests: async (parent, { _id }, { models }): Promise<IHolidayRequestModel[]> => {
            const { MongooseModels }: IDataModels = models;
            const allHolidayRequests = await MongooseModels.HolidayRequest.find({});
            if ( allHolidayRequests ) {
                let specificHolidayRequests: IHolidayRequestModel[] = [];
                for (let request of allHolidayRequests) {
                    if ( request.unitManagerRef.toString() === _id || request.ref.toString() === _id) {
                        const creator = await findReferenceInDB(request.creatorRef, models);
                        request.creatorName = creator.name;
                        specificHolidayRequests.push(request);
                    }
                };
                return await specificHolidayRequests;
            } else {
                new Error("No HolidayRequests exists for this manager ID")
            }
        }
    },
    Mutation: {
        createHolidayRequest: async (parent, { _id, role, projectId, from, to }, { models }): Promise<boolean> => {
            const { MongooseModels }: IDataModels = models;
            if ( role === Role.developer ) {
                const developer = await MongooseModels.Developer.findById(_id)
                const project = await MongooseModels.Project.findById(projectId)
                if ( developer && project ) {
                    try {
                        const newHolidayRequest = new MongooseModels.HolidayRequest({
                            creatorRef: developer.id,
                            unitManagerRef: developer.ref,
                            ref: project.projectManager,
                            from: from as Date,
                            to: to as Date,
                        })
                        await saveObjectToDB(newHolidayRequest);
                        developer.holidayRequests.push(newHolidayRequest);
                        await saveObjectToDB(developer);
                        return true;
                    } catch (error) {
                        new Error(error)
                    }
                } else {
                    new Error("Such developer or project doesn't exists");
                }
            }
            if ( role === Role.projectManager ) {
                const projectManager = await MongooseModels.ProjectManager.findById({ _id});
                try {
                    const newHolidayRequest: IHolidayRequest = new MongooseModels.HolidayRequest({
                        creatorRef: projectManager.id,
                        unitManagerRef: projectManager.ref,
                        from: from as Date,
                        to: to as Date
                    })
                    await saveObjectToDB(newHolidayRequest);
                    projectManager.holidayRequests.push(newHolidayRequest);
                    await saveObjectToDB(projectManager);
                    return true;
                } catch (error) {
                    new Error(error)
                }
            }
            if (role === Role.unitManager) {
                const unitManager= await MongooseModels.UnitManager.findById(_id);
                try {
                    const newHolidayRequest: IHolidayRequest = new MongooseModels.HolidayRequest({
                        creatorRef: unitManager.id,
                        ref: unitManager.ref,
                        from: from as Date,
                        to: to as Date
                    })
                    await saveObjectToDB(newHolidayRequest);
                    unitManager.holidayRequests.push(newHolidayRequest);
                    await saveObjectToDB(unitManager);
                    return true;
                } catch (error) {
                    new Error(error)   
                }
            }
            return false;
        },
        deleteHolidayRequest: async (parent, { _id }, { models }): Promise<void> => {
            const { MongooseModels }: IDataModels = models
            const holidayRequest = await MongooseModels.HolidayRequest.findById(_id)
            if ( holidayRequest ) {
                const creator: any = await findReferenceInDB(holidayRequest.creatorRef, models);
                const requestsToBeSaved = creator.holidayRequests.filter(s => s._id.toString() !== _id);
                creator.holidayRequests = requestsToBeSaved;
                await saveObjectToDB(creator);
                await holidayRequest.remove();
            }
        },
        respondToHolidayRequest: async (parent, { _id, refId, role, response }, { models }): Promise<void> => {
            const { MongooseModels }: IDataModels = models
            const holidayRequest = await MongooseModels.HolidayRequest.findById(_id);
            if ( holidayRequest ) {
                const ref = await findReferenceInDB(refId, models);
                if ( ref ) {
                    if ( role === Role.projectManager ) {
                        holidayRequest.refApproval = response;
                        await saveObjectToDB(holidayRequest);
                    }
                    if ( role === Role.unitManager ) {
                        holidayRequest.unitManagerApproval = response;
                        await saveObjectToDB(holidayRequest);
                    }
                }
            }
        }
    }
};