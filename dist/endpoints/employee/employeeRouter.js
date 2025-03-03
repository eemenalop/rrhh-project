"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getAllEmployee_1 = __importDefault(require("./getAllEmployee"));
//import createAccount from './createAccount';
//import getAccountByID from "./getAccountById";
//import updateAccount from "./updateAccount";
//import deleteAccount from "./deleteAccount";
const accountRouter = (0, express_1.Router)();
accountRouter.get('/all', getAllEmployee_1.default);
// accountRouter.get('/:id', getAccountByID);
// accountRouter.post('/create', createAccount);
// accountRouter.put('/:id/update', updateAccount);
// accountRouter.patch('/:id/delete', deleteAccount);
exports.default = accountRouter;
