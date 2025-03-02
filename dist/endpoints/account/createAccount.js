"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const fs_1 = __importDefault(require("fs"));
const createAccount = (0, express_1.Router)();
createAccount.use(express_1.default.json());
const getAccounts = () => {
    try {
        const data = fs_1.default.readFileSync('./data/accounts.json', 'utf-8');
        const parsedData = JSON.parse(data);
        const account = parsedData;
        return account;
    }
    catch (error) {
        console.log('Error reading file JSON:', error);
        return [];
    }
};
// Create Account
createAccount.post('/create', (req, res) => {
    try {
        const { personal_id, name, lastname, username, password, position } = req.body;
        if (!personal_id || !name || !lastname || !username || !password || !position) {
            res.status(400).json({ success: false, message: 'You must complete all options' });
            return;
        }
        const dataAccounts = getAccounts();
        const existingPersonal_id = dataAccounts.accounts.find((ID) => ID.personal_id === personal_id);
        if (existingPersonal_id) {
            res.status(400).json({ success: false, message: `This ${personal_id} is already in use` });
            return;
        }
        const ExistingNewUsername = dataAccounts.accounts.find((u) => u.username === username);
        if (ExistingNewUsername) {
            res.status(400).json({ success: false, message: `This ${username} is already in use` });
            return;
        }
        if (password.length <= 7) {
            res.status(400).json({ success: false, message: `Password must has at least 7 letters` });
            return;
        }
        const newId = dataAccounts.accounts.length + 1;
        const newAccount = {
            id: newId,
            personal_id: personal_id,
            name: name,
            lastname: lastname,
            username: username,
            password: password,
            position: position,
            active: true
        };
        dataAccounts.accounts.push(newAccount);
        fs_1.default.writeFileSync('./data/accounts.json', JSON.stringify(dataAccounts, null, 2));
        res.status(200).json({ success: true, message: `Account with Username: ${username} have been created sucessfully!` });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal server Error', error });
    }
});
exports.default = createAccount;
