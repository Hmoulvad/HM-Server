"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
exports.UnitManagerSchema = new Mongoose.Schema({
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
exports.default = Mongoose.model("UnitManager", exports.UnitManagerSchema);
//# sourceMappingURL=unit-manager.schema.js.map