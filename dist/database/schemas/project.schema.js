"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
exports.ProjectSchema = new Mongoose.Schema({
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
exports.default = Mongoose.model("Project", exports.ProjectSchema);
//# sourceMappingURL=project.schema.js.map