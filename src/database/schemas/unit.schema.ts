import * as Mongoose from "mongoose";
import { IUnit } from "../../models/models";

export interface IUnitModel extends IUnit, Mongoose.Document { }

export const UnitSchema = new Mongoose.Schema({
    name: String,
    projects: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }],
    developers: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Developer"
    }],
    projectManagers: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: "ProjectManager"
    }],
    unitManager: Mongoose.Schema.Types.ObjectId,
    createdOn: {
        type: Date,
        default: Date.now
    }
}, { collection: "Units" });

export default Mongoose.model<IUnitModel>("Unit", UnitSchema);