import { IUnitModel } from "../../database/schemas/unit.schema";
import { IDataModels } from "../../database/index";
import { saveObjectToDB } from "../helpers/database";

export default {
    Query: {
        unit: async (parent, { _id }, { models } )  => {
            const { MongooseModels }: IDataModels = models;
            const Unit: IUnitModel = await MongooseModels.Unit.findOne({ _id });
            if ( Unit ) {
                return Unit;
            }
            else throw new Error("Unit doesn't exist")
        },
        units: async (parent, {}, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const Units: IUnitModel[] = await MongooseModels.Unit.find({});
            return Units;
        },
    },
    Mutation: {
        createUnit: async (parent, { name }, { models }) => {
            const { MongooseModels }: IDataModels = models;
            const Unit: IUnitModel = await MongooseModels.Unit.findOne({ name });
            if ( Unit ) {
                throw new Error("Please provide a unique name.");
            }
            const newUnit: IUnitModel = new MongooseModels.Unit({
                name,
            })
            await saveObjectToDB(newUnit);
            return true;
        }
    }
};