"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createAccount_1 = __importDefault(require("./createAccount"));
const getAllAccounts_1 = __importDefault(require("./getAllAccounts"));
const getAccountById_1 = __importDefault(require("./getAccountById"));
const updateAccount_1 = __importDefault(require("./updateAccount"));
const accountRouter = (0, express_1.Router)();
accountRouter.post('/create', createAccount_1.default);
accountRouter.get('/all', getAllAccounts_1.default);
accountRouter.get('/:id', getAccountById_1.default);
accountRouter.put('/update/:id', updateAccount_1.default);
exports.default = accountRouter;
