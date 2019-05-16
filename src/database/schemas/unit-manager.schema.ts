import * as Mongoose from "mongoose";
import { IUnitManager } from "../../models/models";

export interface IUnitManagerModel extends IUnitManager, Mongoose.Document { }

export const UnitManagerSchema = new Mongoose.Schema({
    name: String,
    unit: Mongoose.Schema.Types.ObjectId,
    ref: Mongoose.Schema.Types.ObjectId,
    holidayRequests: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: "HolidayRequest"
    }],
    createdOn: {
        type: Date,
        default: Date.now
    }
}, { collection: "UnitManagers" });

export default Mongoose.model<IUnitManagerModel>("UnitManager", UnitManagerSchema);