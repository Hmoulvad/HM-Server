import { Role } from "./models";

export interface ITokenData {
    id: string;
    role: Role;
    objectRefId: string;
}

export interface IToken {
    data: ITokenData;
    exp: number;
    iat: number;
}
