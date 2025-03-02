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
const getAllPosition_1 = require("./getAllPosition");
const createPosition = (0, express_1.Router)();
createPosition.use(express_1.default.json());
createPosition.post('/create', (req, res) => {
    try {
        const { name, salary } = req.body;
        if (!name || !salary) {
            res.status(400).json({ success: false, message: 'You must complete all options' });
            return;
        }
        const dataPosition = (0, getAllPosition_1.getPosition)();
        const positionName = dataPosition.find((p) => p.name === name);
        if (positionName) {
            res.status(400).json({ success: false, message: `This position name:${name} is already created` });
            return;
        }
        const positionID = dataPosition.length + 1;
        const newPosition = {
            id: positionID,
            name,
            salary,
            active: true,
            isByPass: false
        };
        dataPosition.push(newPosition);
        fs_1.default.writeFileSync('./data/position.json', JSON.stringify(dataPosition, null, 2));
        res.status(200).json({ success: true, message: `Position with name: ${name} have been created sucessfully! ID:${positionID}` });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Internal server Error', error });
    }
});
exports.default = createPosition;
