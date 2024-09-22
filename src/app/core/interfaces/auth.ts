import { IUser } from "./user";

export interface IAuthResponse{
    access_token: string;
}

export interface ITokenData extends IUser{
    admin: boolean;
}