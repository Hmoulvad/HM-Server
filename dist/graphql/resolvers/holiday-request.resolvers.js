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
const models_1 = require("../../models/models");
const database_1 = require("../helpers/database");
exports.default = {
    Query: {
        getUserHolidayRequests: (parent, { _id }, { models }) => __awaiter(this, void 0, void 0, function* () {
            const { MongooseModels } = models;
            const holidayRequests = yield MongooseModels.HolidayRequest.find({ creatorRef: _id });
            if (holidayRequests) {
                for (let request of holidayRequests) {
                    if (!!request.unitManagerRef) {
                        const unitManager = yield database_1.findReferenceInDB(request.unitManagerRef, models);
                        request.unitManagerName = unitManager.name;
                    }
                    if (!!request.ref) {
                        const ref = yield database_1.findReferenceInDB(request.ref, models);
                        request.refName = ref.name;
                    }
                    database_1.saveObjectToDB(request);
                }
                return holidayRequests;
            }
            else {
                new Error("No such user exists");
            }
        }),
        getPendingHolidayRequests: (parent, { _id }, { models }) => __awaiter(this, void 0, void 0, function* () {
            const { MongooseModels } = models;
            const allHolidayRequests = yield MongooseModels.HolidayRequest.find({});
            if (allHolidayRequests) {
                let specificHolidayRequests = [];
                for (let request of allHolidayRequests) {
                    if (request.unitManagerRef.toString() === _id || request.ref.toString() === _id) {
                        const creator = yield database_1.findReferenceInDB(request.creatorRef, models);
                        request.creatorName = creator.name;
                        specificHolidayRequests.push(request);
                    }
                }
                ;
                return yield specificHolidayRequests;
            }
            else {
                new Error("No HolidayRequests exists for this manager ID");
            }
        })
    },
    Mutation: {
        createHolidayRequest: (parent, { _id, role, projectId, from, to }, { models }) => __awaiter(this, void 0, void 0, function* () {
            const { MongooseModels } = models;
            if (role === models_1.Role.developer) {
                const developer = yield MongooseModels.Developer.findById(_id);
                const project = yield MongooseModels.Project.findById(projectId);
                if (developer && project) {
                    try {
                        const newHolidayRequest = new MongooseModels.HolidayRequest({
                            creatorRef: developer.id,
                            unitManagerRef: developer.ref,
                            ref: project.projectManager,
                            from: from,
                            to: to,
                        });
                        yield database_1.saveObjectToDB(newHolidayRequest);
                        developer.holidayRequests.push(newHolidayRequest);
                        yield database_1.saveObjectToDB(developer);
                        return true;
                    }
                    catch (error) {
                        new Error(error);
                    }
                }
                else {
                    new Error("Such developer or project doesn't exists");
                }
            }
            if (role === models_1.Role.projectManager) {
                const projectManager = yield MongooseModels.ProjectManager.findById({ _id });
                try {
                    const newHolidayRequest = new MongooseModels.HolidayRequest({
                        creatorRef: projectManager.id,
                        unitManagerRef: projectManager.ref,
                        from: from,
                        to: to
                    });
                    yield database_1.saveObjectToDB(newHolidayRequest);
                    projectManager.holidayRequests.push(newHolidayRequest);
                    yield database_1.saveObjectToDB(projectManager);
                    return true;
                }
                catch (error) {
                    new Error(error);
                }
            }
            if (role === models_1.Role.unitManager) {
                const unitManager = yield MongooseModels.UnitManager.findById(_id);
                try {
                    const newHolidayRequest = new MongooseModels.HolidayRequest({
                        creatorRef: unitManager.id,
                        ref: unitManager.ref,
                        from: from,
                        to: to
                    });
                    yield database_1.saveObjectToDB(newHolidayRequest);
                    unitManager.holidayRequests.push(newHolidayRequest);
                    yield database_1.saveObjectToDB(unitManager);
                    return true;
                }
                catch (error) {
                    new Error(error);
                }
            }
            return false;
        }),
        deleteHolidayRequest: (parent, { _id }, { models }) => __awaiter(this, void 0, void 0, function* () {
            const { MongooseModels } = models;
            const holidayRequest = yield MongooseModels.HolidayRequest.findById(_id);
            if (holidayRequest) {
                const creator = yield database_1.findReferenceInDB(holidayRequest.creatorRef, models);
                const requestsToBeSaved = creator.holidayRequests.filter(s => s._id.toString() !== _id);
                creator.holidayRequests = requestsToBeSaved;
                yield database_1.saveObjectToDB(creator);
                yield holidayRequest.remove();
            }
        }),
        respondToHolidayRequest: (parent, { _id, refId, role, response }, { models }) => __awaiter(this, void 0, void 0, function* () {
            const { MongooseModels } = models;
            const holidayRequest = yield MongooseModels.HolidayRequest.findById(_id);
            if (holidayRequest) {
                const ref = yield database_1.findReferenceInDB(refId, models);
                if (ref) {
                    if (role === models_1.Role.projectManager) {
                        holidayRequest.refApproval = response;
                        yield database_1.saveObjectToDB(holidayRequest);
                    }
                    if (role === models_1.Role.unitManager) {
                        holidayRequest.unitManagerApproval = response;
                        yield database_1.saveObjectToDB(holidayRequest);
                    }
                }
            }
        })
    }
};
//# sourceMappingURL=holiday-request.resolvers.js.map