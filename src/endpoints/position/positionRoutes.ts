import { Router } from "express";
import getAllPosition from "./getAllPosition";
import getPositionByID from "./getPositionById";
import createPosition from "./createPosition";

const positionsRouter = Router();

positionsRouter.get('/all', getAllPosition);
positionsRouter.get('/:id', getPositionByID);
positionsRouter.post('/create', createPosition);

export default positionsRouter;