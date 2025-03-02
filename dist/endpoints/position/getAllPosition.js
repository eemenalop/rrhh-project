"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosition = void 0;
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const getAllPosition = (0, express_1.Router)();
const getPosition = () => {
    try {
        const data = fs_1.default.readFileSync('./data/position.json', 'utf-8');
        const parsedData = JSON.parse(data);
        const position = parsedData;
        return position;
    }
    catch (error) {
        console.log('Error reading file JSON:', error);
        return [];
    }
};
exports.getPosition = getPosition;
getAllPosition.get('/all', (req, res) => {
    const dataPosition = (0, exports.getPosition)();
    try {
        res.status(200).json(dataPosition);
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
});
exports.default = getAllPosition;
