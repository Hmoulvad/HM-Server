
import * as jwt from "jsonwebtoken";

const isAuthenticated = async (resolve, parent, args, { req }) => {
    const { request }: any = req;
    if (request.headers.authorization !== undefined) { 
        jwt.verify(request.headers.authorization, process.env.Jwt_Secret, function(err, decoded) {
            if (err) {
                throw new Error(err)
            } 
        });
        return resolve();
    } else {
        throw new Error("No token added")
    }
};

export const permissions = {
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
}

