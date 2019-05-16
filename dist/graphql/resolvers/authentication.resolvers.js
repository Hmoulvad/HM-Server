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
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const database_1 = require("../helpers/database");
const Mongoose = require("mongoose");
const secret = "IMPACTERCHAMPS";
exports.default = {
    Query: {
        isLoggedIn: (parent, args, { req, models }) => __awaiter(this, void 0, void 0, function* () {
            const { MongooseModels } = models;
            const { request } = req;
            const decodedJWT = yield jwt.decode(request.headers.authorization);
            const ObjectID = Mongoose.Types.ObjectId;
            const toObjectID = decodedJWT.data.id.toString().toLowerCase();
            if (!ObjectID.isValid(toObjectID)) {
                throw new Error("String is not an ObjectID");
            }
            const User = yield MongooseModels.User.findOne({ _id: toObjectID });
            if (User) {
                return User;
            }
            else {
                throw new Error("You're not logged in");
            }
        }),
        isTokenValid: (parent, { token }) => __awaiter(this, void 0, void 0, function* () {
            console.log(token);
            if (jwt.verify(token, secret)) {
                return true;
            }
            else {
                throw new Error("Not a valid token");
            }
        }),
        decodeToken: (parent, { token }, { models }) => __awaiter(this, void 0, void 0, function* () {
            if (jwt.verify(token, secret)) {
                const { data } = jwt.decode(token);
                return data;
            }
            else {
                throw new Error("Not a valid token");
            }
        })
    },
    Mutation: {
        login: (parent, { username, password }, { models }) => __awaiter(this, void 0, void 0, function* () {
            const { MongooseModels } = models;
            const User = yield MongooseModels.User.findOne({ username: username.toLowerCase() });
            if (User) {
                if (yield Bcrypt.compareSync(password, User.password)) {
                    const token = jwt.sign({
                        data: {
                            id: User.id,
                            objectRefId: User.ref,
                            role: User.role
                        }
                    }, secret, {
                        expiresIn: '365days'
                    });
                    return token;
                }
                throw new Error("Password and username does not match.");
            }
            throw new Error("No such user exists.");
        }),
        setReference: (parent, { referenceId }, { req, models }) => __awaiter(this, void 0, void 0, function* () {
            const { MongooseModels } = models;
            const { request } = req;
            const decodedJWT = yield jwt.decode(request.headers.authorization);
            const ObjectID = Mongoose.Types.ObjectId;
            const toObjectID = decodedJWT.data.id.toString().toLowerCase();
            if (!ObjectID.isValid(toObjectID)) {
                throw new Error("String is not an ObjectID");
            }
            const User = yield MongooseModels.User.findOne({ _id: toObjectID });
            if (User) {
                User.ref = referenceId;
                yield database_1.saveObjectToDB(User);
            }
            else {
                throw new Error("You're not logged in");
            }
        }),
        signup: (parent, { username, password, role }, { models }) => __awaiter(this, void 0, void 0, function* () {
            const { MongooseModels } = models;
            const User = yield MongooseModels.User.findOne({ username: username.toLowerCase() });
            if (User) {
                throw new Error("Please provide another username.");
            }
            else {
                const bcryptPassword = yield Bcrypt.hashSync(password, 5);
                const newUser = new MongooseModels.User({
                    username,
                    password: bcryptPassword,
                    role
                });
                yield database_1.saveObjectToDB(newUser);
                const token = jwt.sign({
                    data: {
                        role: newUser.role
                    }
                }, secret, {
                    expiresIn: '365days'
                });
                return token;
            }
        })
    }
};
//# sourceMappingURL=authentication.resolvers.js.map