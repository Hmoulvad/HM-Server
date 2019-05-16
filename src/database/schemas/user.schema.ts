import * as Mongoose from "mongoose";
import { IUser } from "../../models/models";

export interface IUserModel extends IUser, Mongoose.Document { }

export const UserSchema = new Mongoose.Schema({
    username: String,
    password: String,
    ref: Mongoose.Schema.Types.ObjectId,
    role: String,
    createdOn: {
        type: Date,
        default: Date.now
    }
}, { collection: "Users" });

export default Mongoose.model<IUserModel>("User", UserSchema);