import { IUnitManagerModel } from "../../database/schemas/unit-manager.schema";
import { IDataModels } from "../../database/index";
import { IUnitModel } from "../../database/schemas/unit.schema";
import { saveObjectToDB } from "../helpers/database";

export default {
    Query: {
        unitManager: async (parent, { _id }, { models } )  => {
            const { MongooseModels }: IDataModels = models;
            const UnitManager: IUnitManagerModel = await MongooseModels.UnitManager.findOne({ _id });
            if ( UnitManager ) {
                return UnitManager;
            }
            else throw new Error ("Couldn't find Unit manager");
        },
    },
    Mutation: {
        createUnitManager: async (parent, { name, unitId, referenceId }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const UnitManager: IUnitManagerModel = await MongooseModels.UnitManager.findOne({ name });
            // Checks if the UnitManager names exists.
            if ( UnitManager ) {
                throw new Error("Please provide a unique name.");
            }
            const Unit: IUnitModel = await MongooseModels.Unit.findOne({ _id: unitId });
            // Checks if the Unit exists.
            if ( Unit ) {
                const newUnitManager: IUnitManagerModel = new MongooseModels.UnitManager({
                    name,
                    unit: Unit.id,
                    role: "Unit Manager",
                    referenceId
                })
                await saveObjectToDB(newUnitManager);
                //Gets the newly added UnitManager and it's ID and maps it to the Units UnitManager and saves it.
                Unit.unitManager = newUnitManager.id;
                await saveObjectToDB(Unit);
                return true;
            } else {
                throw new Error("Unit doesn't exist");
            }
        }
    }
};