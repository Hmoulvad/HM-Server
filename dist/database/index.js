"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mongoose = require("mongoose");
const unit_schema_1 = require("./schemas/unit.schema");
const project_schema_1 = require("./schemas/project.schema");
const developer_schema_1 = require("./schemas/developer.schema");
const project_manager_schema_1 = require("./schemas/project-manager.schema");
const holiday_request_schema_1 = require("./schemas/holiday-request.schema");
const unit_manager_schema_1 = require("./schemas/unit-manager.schema");
const user_schema_1 = require("./schemas/user.schema");
exports.startDB = ({ user, pwd }) => Mongoose.connect(`mongodb+srv://${user}:${pwd}@hm-impact-tvrfv.azure.mongodb.net/HM-Impact?retryWrites=true`, {
    useNewUrlParser: true
});
exports.models = {
    MongooseModels: {
        Unit: unit_schema_1.default,
        Project: project_schema_1.default,
        Developer: developer_schema_1.default,
        ProjectManager: project_manager_schema_1.default,
        HolidayRequest: holiday_request_schema_1.default,
        UnitManager: unit_manager_schema_1.default,
        User: user_schema_1.default,
    }
};
//# sourceMappingURL=index.js.map