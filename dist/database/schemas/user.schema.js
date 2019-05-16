"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
exports.UserSchema = new Mongoose.Schema({
    username: String,
    password: String,
    ref: Mongoose.Schema.Types.ObjectId,
    role: String,
    createdOn: {
        type: Date,
        default: Date.now
    }
}, { collection: "Users" });
exports.default = Mongoose.model("User", exports.UserSchema);
//# sourceMappingURL=user.schema.js.map