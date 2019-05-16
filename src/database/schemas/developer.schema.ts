import * as Mongoose from "mongoose";
import { IDeveloper } from "../../models/models";

export interface IDeveloperModel extends IDeveloper, Mongoose.Document { }

export const DeveloperSchema = new Mongoose.Schema({
    name: String,
    unit: Mongoose.Schema.Types.ObjectId,
    ref: Mongoose.Schema.Types.ObjectId,
    holidayRequests: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: "HolidayRequest"
    }],
    projects: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Project"
    }],
    createdOn: {
        type: Date,
        default: Date.now
    }
}, { collection: "Developers" });

export default Mongoose.model<IDeveloperModel>("Developer", DeveloperSchema);