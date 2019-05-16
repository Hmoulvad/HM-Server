import * as Mongoose from "mongoose";
import { IProject } from "../../models/models";

export interface IProjectModel extends IProject, Mongoose.Document { }

export const ProjectSchema = new Mongoose.Schema({
    name: String,
    unit: Mongoose.Schema.Types.ObjectId,
    projectManager: Mongoose.Schema.Types.ObjectId,
    developers: [{
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Developer"
    }],
    createdOn: {
        type: Date,
        default: Date.now
    }
}, { collection: "Projects" });

export default Mongoose.model<IProjectModel>("Project", ProjectSchema);
