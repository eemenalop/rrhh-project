"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import { getPosition } from '../../getData';
const getData_1 = require("../../getData");
const getAllPosition = (0, express_1.Router)();
getAllPosition.get('/all', (req, res) => {
    const dataPosition = (0, getData_1.getDatafromJSON)('position.json');
    try {
        res.status(200).json(dataPosition);
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error });
        return;
    }
});
exports.default = getAllPosition;
