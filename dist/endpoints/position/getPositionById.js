"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getAllPosition_1 = require("./getAllPosition");
const getPositionByID = (0, express_1.Router)();
getPositionByID.get('/:id', (req, res) => {
    const dataPosition = (0, getAllPosition_1.getPosition)();
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
        const position = dataPosition.find((p) => p.id === id);
        if (!position) {
            res.status(404).json({ success: false, message: `Account with number ID ${id} not found` });
            return;
        }
        res.status(200).json(position);
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal server error', error });
    }
});
exports.default = getPositionByID;
