import fs from 'fs';
import { Account, Employee, Position, Token, TokenResponse, UserData } from "types";
import jwt from 'jsonwebtoken';

export const getDatafromJSON = <T>(fileJSON: string): T | null => {
    try {
        const data = fs.readFileSync(`./data/${fileJSON}`, 'utf-8');
        const parsedData = JSON.parse(data);
        return parsedData as T;
    } catch (error) {
        console.log('Error reading file JSON:', error);
        return null;
    }
}

export const getTokens = () =>{
    try {
        const data = fs.readFileSync('./data/listOfTokens.json', 'utf-8');
        const tokenData: TokenResponse = JSON.parse(data);
        return tokenData.listOfTokens;
    } catch (error) {
        console.log('Error reading file JSON:', error);
        return []
    }
}

export const genToken = (userdata: UserData): Token => {
    const secretKey = process.env.SECRET_KEY;
    
    if (!secretKey) {
        throw new Error("SECRET_KEY is not defined");
    }
    const tokenJWT: string = jwt.sign({
        userid: userdata.id,
        username: userdata.username,
        password: userdata.password
    },secretKey, {expiresIn: "3s"});

    const token: Token = {
        userId: userdata.id,
        token: tokenJWT
    };

    return token;
};

