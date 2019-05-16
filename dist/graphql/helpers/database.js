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
const Mongoose = require("mongoose");
function saveObjectToDB(object) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield object.save();
        }
        catch (e) {
            throw new Error(e);
        }
    });
}
exports.saveObjectToDB = saveObjectToDB;
;
function doesReferenceExistsInDB(_id, models) {
    return __awaiter(this, void 0, void 0, function* () {
        const { MongooseModels } = models;
        let ObjectID = Mongoose.Types.ObjectId;
        let stringId = _id.toString().toLowerCase();
        if (!ObjectID.isValid(stringId)) {
            throw new Error("String is not an ObjectID");
        }
        else {
            const UnitManager = yield MongooseModels.UnitManager.findOne({ _id });
            const ProjectManager = yield MongooseModels.ProjectManager.findOne({ _id });
            const Developer = yield MongooseModels.Developer.findOne({ _id });
            if (Developer || ProjectManager || UnitManager) {
                return true;
            }
            else {
                throw new Error("Reference doesn't exist");
            }
        }
    });
}
exports.doesReferenceExistsInDB = doesReferenceExistsInDB;
function findReferenceInDB(_id, models) {
    return __awaiter(this, void 0, void 0, function* () {
        const { MongooseModels } = models;
        let ObjectID = Mongoose.Types.ObjectId;
        let stringId = _id.toString().toLowerCase();
        if (!ObjectID.isValid(stringId)) {
            throw new Error("String is not an ObjectID");
        }
        else {
            const UnitManager = yield MongooseModels.UnitManager.findOne({ _id });
            if (UnitManager) {
                return UnitManager;
            }
            const ProjectManager = yield MongooseModels.ProjectManager.findOne({ _id });
            if (ProjectManager) {
                return ProjectManager;
            }
            const Developer = yield MongooseModels.Developer.findOne({ _id });
            if (Developer) {
                return Developer;
            }
            throw new Error("Reference doesn't exist");
        }
    });
}
exports.findReferenceInDB = findReferenceInDB;
//# sourceMappingURL=database.js.map