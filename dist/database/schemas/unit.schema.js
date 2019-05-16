"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
exports.UnitSchema = new Mongoose.Schema({
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
exports.default = Mongoose.model("Unit", exports.UnitSchema);
//# sourceMappingURL=unit.schema.js.map