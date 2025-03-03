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
const getData_1 = require("../../getData");
const updateAccount = (0, express_1.Router)();
updateAccount.use(express_1.default.json());
updateAccount.put('/:id/update', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { personal_id, name, lastname, username, password, position } = req.body;
        if (!id) {
            res.status(400).json({ success: false, message: `Number ID account is required` });
            return;
        }
        if (isNaN(id) || id <= 0) {
            res.status(400).json({ success: false, message: `Enter a  valid number ID Account` });
            return;
        }
        if (!personal_id || !name || !lastname || !username || !password || !position) {
            res.status(400).json({ success: false, message: 'You must complete all options' });
            return;
        }
        const dataAccounts = (0, getData_1.getDatafromJSON)('accounts.json');
        if (!dataAccounts) {
            res.status(500).json({ success: false, message: 'Error reading accounts data' });
            return;
        }
        let existingID = dataAccounts.find((e) => e.id === id);
        if (!existingID) {
            res.status(404).json({ success: false, message: `Account with number ID ${id} not found` });
            return;
        }
        existingID = {
            id,
            personal_id,
            name,
            lastname,
            username,
            password,
            position,
            active: true
        };
        const index = dataAccounts.findIndex((acc) => acc.id === existingID.id);
        dataAccounts[index] = existingID;
        fs_1.default.writeFileSync('./data/accounts.json', JSON.stringify(dataAccounts, null, 2));
        res.status(200).json({ success: true, message: `Account ID:${id} Username:${username}, have updated successfully` });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal error server', error });
        return;
    }
});
exports.default = updateAccount;
