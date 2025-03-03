"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genToken = exports.getTokens = exports.getDatafromJSON = void 0;
const fs_1 = __importDefault(require("fs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getDatafromJSON = (fileJSON) => {
    try {
        const data = fs_1.default.readFileSync(`./data/${fileJSON}`, 'utf-8');
        const parsedData = JSON.parse(data);
        return parsedData;
    }
    catch (error) {
        console.log('Error reading file JSON:', error);
        return null;
    }
};
exports.getDatafromJSON = getDatafromJSON;
const getTokens = () => {
    try {
        const data = fs_1.default.readFileSync('./data/listOfTokens.json', 'utf-8');
        const tokenData = JSON.parse(data);
        return tokenData.listOfTokens;
    }
    catch (error) {
        console.log('Error reading file JSON:', error);
        return [];
    }
};
exports.getTokens = getTokens;
const genToken = (userdata) => {
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        throw new Error("SECRET_KEY is not defined");
    }
    const tokenJWT = jsonwebtoken_1.default.sign({
        userid: userdata.id,
        username: userdata.username,
        password: userdata.password
    }, secretKey, { expiresIn: "3s" });
    const token = {
        userId: userdata.id,
        token: tokenJWT
    };
    return token;
};
exports.genToken = genToken;
