"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getAllPosition_1 = __importDefault(require("./getAllPosition"));
const getPositionById_1 = __importDefault(require("./getPositionById"));
const positionsRouter = (0, express_1.Router)();
positionsRouter.get('/all', getAllPosition_1.default);
positionsRouter.get('/:id', getPositionById_1.default);
exports.default = positionsRouter;
