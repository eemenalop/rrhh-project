"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getAllPosition_1 = __importDefault(require("./getAllPosition"));
const getPositionById_1 = __importDefault(require("./getPositionById"));
const createPosition_1 = __importDefault(require("./createPosition"));
const updatePosition_1 = __importDefault(require("./updatePosition"));
const deletePosition_1 = __importDefault(require("./deletePosition"));
const positionsRouter = (0, express_1.Router)();
positionsRouter.get('/all', getAllPosition_1.default);
positionsRouter.get('/:id', getPositionById_1.default);
positionsRouter.post('/create', createPosition_1.default);
positionsRouter.put('/:id/update', updatePosition_1.default);
positionsRouter.patch('/:id/delete', deletePosition_1.default);
exports.default = positionsRouter;
