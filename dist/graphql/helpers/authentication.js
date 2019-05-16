"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const secret = "IMPACTERCHAMPS";
const isAuthenticated = (resolve, parent, args, { req }) => __awaiter(this, void 0, void 0, function* () {
    const { request } = req;
    if (request.headers.authorization !== undefined) {
        jwt.verify(request.headers.authorization, secret, function (err, decoded) {
            if (err) {
                throw new Error(err);
            }
        });
        return resolve();
    }
    else {
        throw new Error("No token added");
    }
});
exports.permissions = {
    Query: {
        isLoggedIn: isAuthenticated,
        developer: isAuthenticated,
        projectManager: isAuthenticated,
        project: isAuthenticated,
        unitManager: isAuthenticated,
        unit: isAuthenticated,
        units: isAuthenticated,
    },
    Mutation: {
        createDeveloper: isAuthenticated,
        createProjectManager: isAuthenticated,
        createProject: isAuthenticated,
        setProjectManager: isAuthenticated,
        createUnitManager: isAuthenticated,
        createUnit: isAuthenticated,
        setReference: isAuthenticated,
    }
};
//# sourceMappingURL=authentication.js.map