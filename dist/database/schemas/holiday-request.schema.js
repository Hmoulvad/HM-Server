"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
exports.HolidayRequestSchema = new Mongoose.Schema({
    from: Date,
    to: Date,
    creatorRef: Mongoose.Schema.Types.ObjectId,
    creatorName: String || undefined,
    unitManagerName: String,
    unitManagerRef: Mongoose.Schema.Types.ObjectId || undefined,
    unitManagerApproval: Boolean || undefined,
    refName: String,
    ref: Mongoose.Schema.Types.ObjectId || undefined,
    refApproval: Boolean || undefined,
    createdOn: {
        type: Date,
        default: Date.now
    }
}, { collection: "HolidayRequests" });
exports.default = Mongoose.model("HolidayRequest", exports.HolidayRequestSchema);
//# sourceMappingURL=holiday-request.schema.js.map