"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getData_1 = require("../../getData");
const getPositionByID = (0, express_1.Router)();
getPositionByID.get('/:id', (req, res) => {
    try {
        const id = parseInt(req.params.id);
        if (!id) {
            res.status(400).json({ success: false, message: `Number ID position is required` });
            return;
        }
        if (isNaN(id) || id <= 0) {
            res.status(400).json({ success: false, message: `Enter a  valid number ID position` });
            return;
        }
        const dataPosition = (0, getData_1.getDatafromJSON)('accounts.json');
        if (!dataPosition) {
            res.status(500).json({ success: false, message: 'Error reading Position data' });
            return;
        }
        const position = dataPosition.find((p) => p.id === id);
        if (!position) {
            res.status(404).json({ success: false, message: `Account with number ID ${id} not found` });
            return;
        }
        res.status(200).json(position);
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error });
        return;
    }
});
exports.default = getPositionByID;
