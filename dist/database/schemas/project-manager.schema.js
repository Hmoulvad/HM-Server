"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
exports.ProjectManagerSchema = new Mongoose.Schema({
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
}, { collection: "ProjectManagers" });
exports.default = Mongoose.model("ProjectManager", exports.ProjectManagerSchema);
//# sourceMappingURL=project-manager.schema.js.map