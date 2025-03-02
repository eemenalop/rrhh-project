import { Router } from "express";
import getAllPosition from "./getAllPosition";
import getPositionByID from "./getPositionById";

const positionsRouter = Router();

positionsRouter.get('/all', getAllPosition);
positionsRouter.get('/:id', getPositionByID);

export default positionsRouter;