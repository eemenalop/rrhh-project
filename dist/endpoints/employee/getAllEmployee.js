"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getData_1 = require("../../getData");
const getAllEmployee = (0, express_1.Router)();
try {
    getAllEmployee.get('/all', (req, res) => {
        const dataEmployes = (0, getData_1.getDatafromJSON)('employees.json');
        res.status(200).json(dataEmployes);
    });
}
catch (error) {
}
exports.default = getAllEmployee;
