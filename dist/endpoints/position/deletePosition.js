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
const deletePosition = (0, express_1.Router)();
deletePosition.use(express_1.default.json());
deletePosition.patch('/:id/delete', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            res.status(400).json({ success: false, message: `Number ID position is required` });
            return;
        }
        if (isNaN(id) || id <= 0) {
            res.status(400).json({ success: false, message: `Enter a valid number ID position` });
            return;
        }
        const dataPosition = (0, getData_1.getDatafromJSON)('accounts.json');
        if (!dataPosition) {
            res.status(500).json({ success: false, message: 'Error reading Position data' });
            return;
        }
        let existingID = dataPosition.find((e) => e.id === id);
        if (!existingID) {
            res.status(404).json({ success: false, message: `Account with number ID ${id} not found` });
            return;
        }
        existingID.active = false;
        const index = dataPosition.findIndex((acc) => acc.id === existingID.id);
        dataPosition[index] = existingID;
        fs_1.default.writeFileSync('./data/position.json', JSON.stringify(dataPosition, null, 2));
        res.status(200).json({ success: true, message: `Position ID:${id}, have been deleted successfully`, active: existingID });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal server Error', error });
        return;
    }
});
exports.default = deletePosition;
